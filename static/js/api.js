/**
 * Lisn — API client
 * Talks to the slim FastAPI backend (OpenAI proxy + uploads)
 */
const API = {
  async chat(messages, profileContext = null) {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, profile_context: profileContext })
    });
    if (!res.ok) throw new Error(`Chat fejl: ${res.status}`);
    return res.json();
  },

  async summarize(text, type = 'document') {
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, type })
    });
    if (!res.ok) throw new Error(`Summarize fejl: ${res.status}`);
    return res.json();
  },

  async upload(file) {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: form });
    if (!res.ok) throw new Error(`Upload fejl: ${res.status}`);
    return res.json();
  },

  async health() {
    const res = await fetch('/api/health');
    return res.json();
  }
};
