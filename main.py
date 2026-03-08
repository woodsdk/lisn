"""
Lisn — Slim backend
Only handles: OpenAI proxy, file upload + AI analysis
All user data lives in frontend localStorage.
"""
import os
import uuid
from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI, UploadFile, File, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
openai_client = None
if OPENAI_API_KEY:
    from openai import OpenAI
    openai_client = OpenAI(api_key=OPENAI_API_KEY)

UPLOAD_DIR = Path("uploads")

SYSTEM_PROMPT = """Du er Lisn, en venlig dansk sundhedsassistent. Du hjælper brugere med at forstå deres sundhedsdata, blodprøver, medicin og symptomer.

VIGTIGE REGLER:
- Du må ALDRIG stille diagnoser. Du er ikke en læge.
- Du må gerne forklare hvad sundhedsdata betyder i generelle termer.
- Henvis ALTID til brugerens egen læge for medicinsk rådgivning.
- Svar på dansk med et venligt, professionelt sprog.
- Hold svarene korte og forståelige.
- Hvis brugeren deler blodprøveresultater, forklar hvad tallene generelt betyder og hvad normalområdet er.

Afslut ALTID dit svar med denne disclaimer på en ny linje:
"⚕ Dette er generel sundhedsinformation — ikke medicinsk rådgivning. Kontakt din læge for diagnose og behandling."
"""


@asynccontextmanager
async def lifespan(app: FastAPI):
    UPLOAD_DIR.mkdir(exist_ok=True)
    yield

app = FastAPI(title="Lisn", version="0.1.0", lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


# ── Models ──

class ChatRequest(BaseModel):
    messages: list[dict]  # [{role, content}, ...]
    profile_context: str | None = None

class SummarizeRequest(BaseModel):
    text: str
    type: str = "document"  # "document" or "recording"


# ── API: OpenAI proxy ──

@app.post("/api/chat")
async def chat(req: ChatRequest):
    if not openai_client:
        return {"message": "⚠️ OpenAI API-nøgle er ikke konfigureret. Sæt OPENAI_API_KEY som environment variable.\n\nDit spørgsmål: " + (req.messages[-1]["content"] if req.messages else "")}

    system = SYSTEM_PROMPT
    if req.profile_context:
        system += f"\n\nBrugerens sundhedsprofil:\n{req.profile_context}"

    messages = [{"role": "system", "content": system}] + req.messages

    try:
        response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=800,
            temperature=0.7,
        )
        return {"message": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(500, f"OpenAI fejl: {str(e)}")


@app.post("/api/summarize")
async def summarize(req: SummarizeRequest):
    if not openai_client:
        return {"summary": "⚠️ OpenAI ikke konfigureret. Kan ikke opsummere."}

    if req.type == "recording":
        prompt = "Opsummer denne lægekonsultation kort og struktureret på dansk. Fremhæv: 1) Hovedemner 2) Beslutninger 3) Næste skridt. Max 5 sætninger."
    else:
        prompt = "Opsummer dette sundhedsdokument kort på dansk. Fremhæv de vigtigste fund og værdier. Max 4 sætninger."

    try:
        response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": req.text[:4000]}
            ],
            max_tokens=300,
        )
        return {"summary": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(500, f"OpenAI fejl: {str(e)}")


# ── API: File upload ──

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    ext = Path(file.filename).suffix.lower()
    safe_name = f"{uuid.uuid4().hex}{ext}"
    file_path = UPLOAD_DIR / safe_name

    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)

    # Try AI summary for text files
    summary = None
    if openai_client and ext in (".txt", ".md", ".csv"):
        text = content.decode("utf-8", errors="ignore")[:3000]
        try:
            resp = openai_client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "Opsummer dette sundhedsdokument kort på dansk. Fremhæv vigtige fund og værdier. Max 4 sætninger."},
                    {"role": "user", "content": text}
                ],
                max_tokens=200,
            )
            summary = resp.choices[0].message.content
        except Exception:
            pass

    return {
        "filename": file.filename,
        "stored_as": safe_name,
        "url": f"/uploads/{safe_name}",
        "summary": summary
    }


# ── API: Health check ──

@app.get("/api/health")
async def health():
    return {"status": "ok", "openai": bool(OPENAI_API_KEY)}


# ── Serve frontend ──

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/manifest.json")
async def manifest():
    return FileResponse("static/manifest.json")

@app.get("/sw.js")
async def service_worker():
    return FileResponse("static/sw.js", media_type="application/javascript")

# SPA catch-all: serve index.html for all non-API routes
@app.get("/{path:path}")
async def spa(path: str):
    return FileResponse("static/index.html")
