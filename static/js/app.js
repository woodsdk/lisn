/**
 * Lisn — Main SPA application
 * Single-page app with hash-based routing
 */

// ── SVG Icon definitions ──
const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  docs: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  health: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  flask: `<svg viewBox="0 0 24 24" fill="none" stroke="url(#ig)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2v6.5l4 6.5a2 2 0 0 1-1.7 3H7.2a2 2 0 0 1-1.7-3l4-6.5V2"/><path d="M8.5 2h7"/><path d="M7 15h10" opacity=".5"/></svg>`,
  pill: `<svg viewBox="0 0 24 24" fill="none" stroke="url(#ig)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 1.5-8 8a5 5 0 0 0 7.07 7.07l8-8a5 5 0 0 0-7.07-7.07z"/><path d="m13.5 6.5-4 4" opacity=".5"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" fill="none" stroke="url(#ig)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="m9 14 2 2 4-4" opacity=".8"/></svg>`,
  hospital: `<svg viewBox="0 0 24 24" fill="none" stroke="url(#ig)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`,
  mic: `<svg viewBox="0 0 24 24" fill="none" stroke="url(#ig)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
  send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="url(#ig)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
};

// ── Router ──
const Router = {
  current: '',
  go(hash) {
    window.location.hash = hash;
  },
  init() {
    window.addEventListener('hashchange', () => this.route());
    this.route();
  },
  route() {
    const hash = window.location.hash.slice(1) || (Store.isLoggedIn() ? 'home' : 'welcome');
    this.current = hash;
    render(hash);
    updateNav(hash);
  }
};

// ── Render ──
function render(page) {
  const app = document.getElementById('app');
  const nav = document.getElementById('nav');

  // Pages without nav
  const noNav = ['welcome', 'signup', 'login', 'onboarding', 'consent'];
  nav.style.display = noNav.includes(page.split('/')[0]) ? 'none' : 'flex';

  const route = page.split('/')[0];
  switch (route) {
    case 'welcome':  app.innerHTML = pageWelcome(); break;
    case 'signup':   app.innerHTML = pageSignup(); break;
    case 'login':    app.innerHTML = pageLogin(); break;
    case 'consent':  app.innerHTML = pageConsent(); break;
    case 'onboarding': app.innerHTML = pageOnboarding(); break;
    case 'home':     app.innerHTML = pageHome(); break;
    case 'chat':     app.innerHTML = pageChat(); break;
    case 'docs':     app.innerHTML = pageDocs(); break;
    case 'health':   app.innerHTML = pageHealth(); break;
    case 'questions': app.innerHTML = pageQuestions(); break;
    case 'recorder': app.innerHTML = pageRecorder(); break;
    case 'timeline': app.innerHTML = pageTimeline(); break;
    case 'settings': app.innerHTML = pageSettings(); break;
    default:         app.innerHTML = pageHome(); break;
  }

  // Scroll to top
  app.scrollTo(0, 0);
}

function updateNav(page) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
}

// ═══════════════════════════════════════════════════════
//  PAGES
// ═══════════════════════════════════════════════════════

// ── Welcome ──
function pageWelcome() {
  return `
    <div class="page-center">
      <div class="welcome-glow"></div>
      <div class="app-logo-big">LISN</div>
      <div class="text-display text-center" style="margin: 24px 0 8px">Dit helbred.<br><strong>Forstået.</strong></div>
      <p class="text-small text-center mb-6" style="max-width:280px;margin:12px auto 40px">Din personlige sundhedsassistent der hjælper dig med at forstå blodprøver, medicin og symptomer.</p>
      <button class="btn btn-primary btn-block" onclick="Router.go('signup')">Kom i gang</button>
      <p class="text-center mt-4" style="font-size:13px"><span class="text-muted">Har du allerede en konto?</span> <a href="#login" class="text-teal">Log ind</a></p>
    </div>`;
}

// ── Signup ──
function pageSignup() {
  return `
    <div class="page-form">
      <button class="btn-back" onclick="Router.go('welcome')">${ICONS.back}</button>
      <h1 class="mb-2">Opret konto</h1>
      <p class="text-small mb-6">Få adgang til din personlige sundhedsassistent</p>
      <form id="signup-form" class="flex flex-col gap-4">
        <div class="input-group">
          <label class="input-label">Fulde navn</label>
          <input class="input" type="text" id="s-name" placeholder="Dit navn" required>
        </div>
        <div class="input-group">
          <label class="input-label">E-mail</label>
          <input class="input" type="email" id="s-email" placeholder="din@email.dk" required>
        </div>
        <div class="input-group">
          <label class="input-label">Password</label>
          <input class="input" type="password" id="s-pass" placeholder="Min. 6 tegn" required minlength="6">
        </div>
        <button type="submit" class="btn btn-primary btn-block mt-3">Opret bruger</button>
      </form>
      <p class="text-center mt-4" style="font-size:13px"><span class="text-muted">Har du en konto?</span> <a href="#login" class="text-teal">Log ind</a></p>
    </div>`;
}

// ── Login ──
function pageLogin() {
  return `
    <div class="page-form">
      <button class="btn-back" onclick="Router.go('welcome')">${ICONS.back}</button>
      <h1 class="mb-2">Log ind</h1>
      <p class="text-small mb-6">Velkommen tilbage</p>
      <form id="login-form" class="flex flex-col gap-4">
        <div class="input-group">
          <label class="input-label">E-mail</label>
          <input class="input" type="email" id="l-email" placeholder="din@email.dk" required>
        </div>
        <div class="input-group">
          <label class="input-label">Password</label>
          <input class="input" type="password" id="l-pass" placeholder="Dit password" required>
        </div>
        <button type="submit" class="btn btn-primary btn-block mt-3">Log ind</button>
      </form>
    </div>`;
}

// ── Consent ──
function pageConsent() {
  return `
    <div class="page-form">
      <div class="shield-icon">${ICONS.shield}</div>
      <h1 class="mb-2">Dit privatliv</h1>
      <p class="text-small mb-6">Lisn tager dit privatliv alvorligt. Vælg hvilke data du vil dele.</p>
      <div class="consent-list">
        <div class="consent-item">
          <div class="toggle active" id="c-privacy" onclick="this.classList.toggle('active')"></div>
          <div><strong>Privatlivspolitik</strong><br><span class="text-small">Påkrævet for at bruge Lisn</span></div>
        </div>
        <div class="consent-item">
          <div class="toggle active" id="c-terms" onclick="this.classList.toggle('active')"></div>
          <div><strong>Vilkår og betingelser</strong><br><span class="text-small">Påkrævet for at bruge Lisn</span></div>
        </div>
        <div class="consent-item">
          <div class="toggle active" id="c-health" onclick="this.classList.toggle('active')"></div>
          <div><strong>Sundhedsdata</strong><br><span class="text-small">Blodprøver, dokumenter, tidslinje</span></div>
        </div>
        <div class="consent-item">
          <div class="toggle" id="c-medication" onclick="this.classList.toggle('active')"></div>
          <div><strong>Medicindata</strong><br><span class="text-small">Aktuel og tidligere medicin</span></div>
        </div>
      </div>
      <button class="btn btn-primary btn-block mt-6" onclick="handleConsent()">Acceptér og fortsæt</button>
    </div>`;
}

// ── Onboarding (Health Profile) ──
function pageOnboarding() {
  const p = Store.getProfile();
  return `
    <div class="page-form">
      <h1 class="mb-2">Din sundhedsprofil</h1>
      <p class="text-small mb-6">Hjælper AI'en med at give dig bedre svar. Du kan altid ændre dette senere.</p>
      <form id="profile-form" class="flex flex-col gap-4">
        <div class="input-group">
          <label class="input-label">Allergier</label>
          <input class="input" id="p-allergies" placeholder="fx penicillin, pollen (kommasepareret)" value="${p.allergies.join(', ')}">
        </div>
        <div class="input-group">
          <label class="input-label">Kroniske tilstande</label>
          <input class="input" id="p-conditions" placeholder="fx diabetes, astma" value="${p.conditions.join(', ')}">
        </div>
        <div class="input-group">
          <label class="input-label">Aktuel medicin</label>
          <input class="input" id="p-meds" placeholder="fx metformin 500mg" value="${p.medications.join(', ')}">
        </div>
        <div class="input-group">
          <label class="input-label">Fødselsdato</label>
          <input class="input" type="date" id="p-birth" value="${p.birthdate || ''}">
        </div>
        <button type="submit" class="btn btn-primary btn-block mt-3">Gem og start</button>
        <button type="button" class="btn btn-ghost btn-block" onclick="Router.go('home')">Spring over</button>
      </form>
    </div>`;
}

// ── Home ──
function pageHome() {
  const user = Store.getUser();
  const timeline = Store.getTimeline().slice(0, 4);
  const questions = Store.getQuestions().filter(q => !q.answered).length;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Godmorgen' : hour < 18 ? 'God eftermiddag' : 'Godaften';

  return `
    <div class="page-padding">
      <h2 style="font-size:24px;font-weight:700">${greeting}, ${user?.name?.split(' ')[0] || 'der'}</h2>
      <p class="text-small mt-1">Her er dit overblik</p>

      <!-- CTA -->
      <div class="card card-cta mt-6" onclick="Router.go('chat')" style="cursor:pointer">
        <div class="card-icon">${ICONS.chat}</div>
        <h4 class="card-title" style="margin-bottom:4px">Stil et spørgsmål</h4>
        <p class="card-desc">"Hvad betyder mine seneste prøvesvar?"</p>
      </div>

      <!-- Quick actions -->
      <div class="grid grid-3 gap-3 mt-6">
        <div class="card card-interactive text-center" onclick="Router.go('docs')">
          <div class="card-icon" style="margin:0 auto 8px">${ICONS.upload}</div>
          <span class="text-small">Upload</span>
        </div>
        <div class="card card-interactive text-center" onclick="Router.go('questions')">
          <div class="card-icon" style="margin:0 auto 8px">${ICONS.clipboard}</div>
          <span class="text-small">Huskeliste${questions ? ` (${questions})` : ''}</span>
        </div>
        <div class="card card-interactive text-center" onclick="Router.go('recorder')">
          <div class="card-icon" style="margin:0 auto 8px">${ICONS.mic}</div>
          <span class="text-small">Optag</span>
        </div>
      </div>

      <!-- Timeline -->
      ${timeline.length ? `
        <div class="section-title mt-8">Seneste aktivitet</div>
        ${timeline.map(e => timelineItem(e)).join('')}
        <button class="btn btn-ghost btn-block mt-3" onclick="Router.go('timeline')">Se fuld tidslinje</button>
      ` : `
        <div class="empty-state mt-8">
          <p class="text-muted text-center">Din tidslinje er tom.<br>Upload et dokument eller start en chat for at komme i gang.</p>
        </div>
      `}
    </div>`;
}

// ── Chat ──
function pageChat() {
  const convs = Store.getConversations();
  const activeId = Router.current.split('/')[1];

  if (activeId) {
    const conv = Store.getConversation(activeId);
    if (!conv) return '<div class="page-padding"><p>Samtale ikke fundet</p></div>';
    return renderChatView(conv);
  }

  return `
    <div class="page-padding">
      <div class="flex flex-between items-center mb-6">
        <h2>Chat</h2>
        <button class="btn-icon" onclick="startNewChat()">${ICONS.plus}</button>
      </div>
      ${convs.length ? convs.map(c => `
        <div class="card card-interactive mb-3" onclick="Router.go('chat/${c.id}')">
          <h4 class="card-title truncate">${esc(c.title)}</h4>
          <p class="card-desc">${c.messages.length} beskeder · ${timeAgo(c.created_at)}</p>
        </div>
      `).join('') : `
        <div class="empty-state">
          <div style="font-size:48px;margin-bottom:16px;opacity:0.3">${ICONS.chat}</div>
          <p class="text-muted text-center">Ingen samtaler endnu.<br>Start en ny chat med din sundhedsassistent.</p>
          <button class="btn btn-primary mt-4" onclick="startNewChat()">Start ny chat</button>
        </div>
      `}
    </div>`;
}

function renderChatView(conv) {
  const msgs = conv.messages.map(m => `
    <div class="${m.role === 'user' ? 'chat-user' : 'chat-ai'}">${formatMessage(m.content)}</div>
  `).join('');

  return `
    <div class="chat-page">
      <div class="chat-header">
        <button class="btn-back" onclick="Router.go('chat')">${ICONS.back}</button>
        <span class="truncate" style="flex:1">${esc(conv.title)}</span>
      </div>
      <div class="chat-messages" id="chat-messages">
        ${msgs || '<div class="text-muted text-center mt-8" style="font-size:13px">Stil et spørgsmål om din sundhed</div>'}
      </div>
      <div class="chat-input-bar">
        <input class="input" id="chat-input" placeholder="Skriv et spørgsmål..." autocomplete="off">
        <button class="btn-icon" id="chat-send" onclick="sendMessage('${conv.id}')">${ICONS.send}</button>
      </div>
    </div>`;
}

// ── Documents ──
function pageDocs() {
  const docs = Store.getDocuments();
  return `
    <div class="page-padding">
      <div class="flex flex-between items-center mb-6">
        <h2>Dokumenter</h2>
        <label class="btn-icon" style="cursor:pointer">
          ${ICONS.plus}
          <input type="file" id="doc-upload" style="display:none" accept="image/*,.pdf,.txt,.md,.csv" onchange="handleDocUpload(this)">
        </label>
      </div>

      <!-- Upload area -->
      <div class="upload-zone mb-6" id="upload-zone" onclick="document.getElementById('doc-upload').click()">
        <div style="opacity:0.4;width:32px;height:32px;margin:0 auto 8px">${ICONS.upload}</div>
        <p class="text-small text-muted">Tryk for at uploade eller tag et foto</p>
        <p class="text-muted" style="font-size:11px;margin-top:4px">PDF, billeder, tekstfiler</p>
      </div>

      <!-- Camera button -->
      <button class="btn btn-secondary btn-block mb-6" onclick="openCamera()">
        <span style="width:18px;height:18px;display:inline-flex">${ICONS.camera}</span>
        Scan dokument med kamera
      </button>
      <input type="file" id="camera-input" style="display:none" accept="image/*" capture="environment" onchange="handleDocUpload(this)">

      ${docs.length ? docs.map(d => `
        <div class="card mb-3">
          <div class="flex gap-3 items-start">
            <div class="card-icon" style="flex-shrink:0">${ICONS.docs}</div>
            <div style="flex:1;min-width:0">
              <h4 class="card-title truncate">${esc(d.filename)}</h4>
              <p class="card-desc">${d.summary ? esc(d.summary) : 'Ingen AI-opsummering'}</p>
              <span class="text-muted" style="font-size:11px">${timeAgo(d.uploaded_at)}</span>
            </div>
          </div>
        </div>
      `).join('') : ''}
    </div>`;
}

// ── Health Profile ──
function pageHealth() {
  const p = Store.getProfile();
  return `
    <div class="page-padding">
      <h2 class="mb-6">Sundhedsprofil</h2>
      <form id="health-form" class="flex flex-col gap-4">
        <div class="input-group">
          <label class="input-label">Allergier</label>
          <input class="input" id="h-allergies" placeholder="fx penicillin, pollen" value="${p.allergies.join(', ')}">
        </div>
        <div class="input-group">
          <label class="input-label">Kroniske tilstande</label>
          <input class="input" id="h-conditions" placeholder="fx diabetes, astma" value="${p.conditions.join(', ')}">
        </div>
        <div class="input-group">
          <label class="input-label">Aktuel medicin</label>
          <input class="input" id="h-meds" placeholder="fx metformin 500mg" value="${p.medications.join(', ')}">
        </div>
        <div class="input-group">
          <label class="input-label">Fødselsdato</label>
          <input class="input" type="date" id="h-birth" value="${p.birthdate || ''}">
        </div>
        <div class="input-group">
          <label class="input-label">Blodtype</label>
          <input class="input" id="h-blood" placeholder="fx A+" value="${p.blood_type || ''}">
        </div>
        <button type="submit" class="btn btn-primary btn-block mt-3">Gem profil</button>
      </form>
    </div>`;
}

// ── Doctor Questions (Huskeliste) ──
function pageQuestions() {
  const qs = Store.getQuestions();
  return `
    <div class="page-padding">
      <div class="flex flex-between items-center mb-6">
        <h2>Huskeliste til lægen</h2>
      </div>
      <form id="q-form" class="flex gap-2 mb-6">
        <input class="input" id="q-input" placeholder="Tilføj et spørgsmål..." style="flex:1" required>
        <button type="submit" class="btn-icon">${ICONS.plus}</button>
      </form>
      <div id="q-list">
        ${qs.map(q => `
          <div class="question-item ${q.answered ? 'answered' : ''}" data-id="${q.id}">
            <button class="q-check" onclick="toggleQ('${q.id}')">${q.answered ? ICONS.check : ''}</button>
            <span class="q-text">${esc(q.question)}</span>
            <button class="q-delete" onclick="deleteQ('${q.id}')">${ICONS.trash}</button>
          </div>
        `).join('')}
        ${!qs.length ? '<p class="text-muted text-center mt-4" style="font-size:13px">Ingen spørgsmål endnu. Tilføj spørgsmål du vil huske at stille din læge.</p>' : ''}
      </div>
    </div>`;
}

// ── Recorder ──
function pageRecorder() {
  const recs = Store.getRecordings();
  return `
    <div class="page-padding">
      <h2 class="mb-6">Konsultationsoptager</h2>
      <div class="card card-cta text-center mb-6">
        <div id="rec-icon" style="width:64px;height:64px;margin:0 auto 16px;border-radius:50%;background:var(--grad-cta);display:flex;align-items:center;justify-content:center">
          <span style="width:28px;height:28px;color:white;display:flex">${ICONS.mic}</span>
        </div>
        <div id="rec-timer" class="text-display" style="font-size:32px;margin-bottom:8px;display:none">00:00</div>
        <p class="text-small text-muted mb-4" id="rec-status">Tryk for at starte optagelse</p>
        <button class="btn btn-primary" id="rec-btn" onclick="toggleRecording()">Start optagelse</button>
      </div>
      ${recs.length ? `
        <div class="section-title">Tidligere optagelser</div>
        ${recs.map(r => `
          <div class="card mb-3">
            <div class="flex gap-3 items-start">
              <div class="card-icon" style="flex-shrink:0">${ICONS.mic}</div>
              <div>
                <h4 class="card-title">${esc(r.title || 'Konsultation')}</h4>
                <p class="card-desc">${r.summary ? esc(r.summary) : 'Ingen opsummering'}</p>
                <span class="text-muted" style="font-size:11px">${r.duration ? Math.round(r.duration / 60) + ' min · ' : ''}${timeAgo(r.recorded_at)}</span>
              </div>
            </div>
          </div>
        `).join('')}
      ` : ''}
    </div>`;
}

// ── Timeline ──
function pageTimeline() {
  const events = Store.getTimeline();
  return `
    <div class="page-padding">
      <h2 class="mb-6">Sundhedstidslinje</h2>
      ${events.length ? events.map(e => timelineItem(e)).join('') : `
        <div class="empty-state">
          <p class="text-muted text-center">Din tidslinje er tom.<br>Aktiviteter vises her automatisk.</p>
        </div>
      `}
    </div>`;
}

// ── Settings ──
function pageSettings() {
  const user = Store.getUser();
  return `
    <div class="page-padding">
      <h2 class="mb-6">Indstillinger</h2>
      <div class="card mb-3">
        <h4 class="card-title">${esc(user?.name || 'Bruger')}</h4>
        <p class="card-desc">${esc(user?.email || '')}</p>
      </div>
      <button class="btn btn-secondary btn-block mb-3" onclick="Router.go('health')">Rediger sundhedsprofil</button>
      <button class="btn btn-secondary btn-block mb-3" onclick="Router.go('consent')">Administrer samtykke</button>
      <button class="btn btn-ghost btn-block mt-6" onclick="handleLogout()" style="color:var(--error)">Log ud</button>
      <button class="btn btn-ghost btn-block mt-2" onclick="handleReset()" style="color:var(--error);opacity:0.5;font-size:11px">Slet alle data</button>
    </div>`;
}


// ═══════════════════════════════════════════════════════
//  COMPONENTS
// ═══════════════════════════════════════════════════════

function timelineItem(e) {
  const iconMap = { document: ICONS.docs, recording: ICONS.mic, chat: ICONS.chat, account: ICONS.shield, blood_test: ICONS.flask, medication: ICONS.pill, visit: ICONS.hospital };
  const icon = iconMap[e.type] || ICONS.health;
  return `
    <div class="timeline-item">
      <div class="timeline-icon timeline-icon-sm">${icon}</div>
      <div style="flex:1;min-width:0">
        <div class="timeline-date">${formatDate(e.date || e.created_at)}</div>
        <div class="timeline-title">${esc(e.title)}</div>
        ${e.description ? `<div class="timeline-desc">${esc(e.description)}</div>` : ''}
      </div>
    </div>`;
}


// ═══════════════════════════════════════════════════════
//  EVENT HANDLERS
// ═══════════════════════════════════════════════════════

// Signup
document.addEventListener('submit', async e => {
  if (e.target.id === 'signup-form') {
    e.preventDefault();
    const name = document.getElementById('s-name').value.trim();
    const email = document.getElementById('s-email').value.trim();
    const pass = document.getElementById('s-pass').value;
    if (!name || !email || pass.length < 6) return;
    Store.setUser({ name, email });
    Store.addTimelineEvent({ type: 'account', title: 'Konto oprettet', description: 'Velkommen til Lisn!', date: new Date().toISOString().split('T')[0] });
    Router.go('consent');
  }
});

// Login
document.addEventListener('submit', async e => {
  if (e.target.id === 'login-form') {
    e.preventDefault();
    const email = document.getElementById('l-email').value.trim();
    const pass = document.getElementById('l-pass').value;
    if (!email || !pass) return;
    // For prototype: just log in with whatever
    const existing = Store.getUser();
    Store.setUser(existing || { name: email.split('@')[0], email });
    Router.go('home');
  }
});

// Profile save (onboarding + health page)
document.addEventListener('submit', async e => {
  if (e.target.id === 'profile-form' || e.target.id === 'health-form') {
    e.preventDefault();
    const prefix = e.target.id === 'profile-form' ? 'p' : 'h';
    const parse = v => v.split(',').map(s => s.trim()).filter(Boolean);
    Store.setProfile({
      allergies: parse(document.getElementById(`${prefix}-allergies`).value),
      conditions: parse(document.getElementById(`${prefix}-conditions`).value),
      medications: parse(document.getElementById(`${prefix}-meds`).value),
      birthdate: document.getElementById(`${prefix}-birth`).value,
      blood_type: document.getElementById(`${prefix}-blood`)?.value || ''
    });
    if (prefix === 'p') {
      Router.go('home');
    } else {
      showToast('Profil gemt');
    }
  }
});

// Consent
function handleConsent() {
  const privacy = document.getElementById('c-privacy').classList.contains('active');
  const terms = document.getElementById('c-terms').classList.contains('active');
  if (!privacy || !terms) {
    showToast('Du skal acceptere privatlivspolitik og vilkår', 'error');
    return;
  }
  Store.setConsent({
    privacy_policy: privacy,
    terms: terms,
    health_data: document.getElementById('c-health').classList.contains('active'),
    medication: document.getElementById('c-medication').classList.contains('active'),
  });
  Router.go('onboarding');
}

// Chat
function startNewChat() {
  const conv = Store.createConversation('Ny samtale');
  Router.go(`chat/${conv.id}`);
}

async function sendMessage(convId) {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  Store.addMessage(convId, 'user', text);

  // Update title if first message
  const conv = Store.getConversation(convId);
  if (conv.messages.length === 1) {
    conv.title = text.slice(0, 50);
    const convs = Store.getConversations();
    const idx = convs.findIndex(c => c.id === convId);
    if (idx >= 0) convs[idx] = conv;
    Store._set('conversations', convs);
  }

  // Re-render to show user message + loading
  render(Router.current);
  const messagesEl = document.getElementById('chat-messages');
  messagesEl.innerHTML += '<div class="chat-ai loading-dots">Tænker<span>...</span></div>';
  messagesEl.scrollTop = messagesEl.scrollHeight;

  // Send to API
  const apiMessages = conv.messages.map(m => ({ role: m.role, content: m.content }));
  try {
    const res = await API.chat(apiMessages, Store.getProfileContext());
    Store.addMessage(convId, 'assistant', res.message);
  } catch (err) {
    Store.addMessage(convId, 'assistant', '⚠️ Kunne ikke få svar. Tjek din forbindelse.');
  }

  render(Router.current);
  setTimeout(() => {
    const el = document.getElementById('chat-messages');
    if (el) el.scrollTop = el.scrollHeight;
    document.getElementById('chat-input')?.focus();
  }, 50);
}

// Enter to send in chat
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.id === 'chat-input' && !e.shiftKey) {
    e.preventDefault();
    const convId = Router.current.split('/')[1];
    if (convId) sendMessage(convId);
  }
});

// Document upload
async function handleDocUpload(input) {
  const file = input.files[0];
  if (!file) return;
  showToast('Uploader...');

  try {
    const res = await API.upload(file);
    Store.addDocument({
      filename: res.filename,
      url: res.url,
      summary: res.summary,
      type: file.type
    });
    showToast('Dokument uploadet!');
    render(Router.current);
  } catch {
    showToast('Upload fejlede', 'error');
  }
  input.value = '';
}

function openCamera() {
  document.getElementById('camera-input').click();
}

// Questions
document.addEventListener('submit', e => {
  if (e.target.id === 'q-form') {
    e.preventDefault();
    const input = document.getElementById('q-input');
    if (!input.value.trim()) return;
    Store.addQuestion(input.value.trim());
    render(Router.current);
  }
});

function toggleQ(id) { Store.toggleQuestion(id); render(Router.current); }
function deleteQ(id) { Store.deleteQuestion(id); render(Router.current); }

// Recording
let mediaRecorder = null;
let recordingStart = null;
let timerInterval = null;

async function toggleRecording() {
  const btn = document.getElementById('rec-btn');
  const timer = document.getElementById('rec-timer');
  const status = document.getElementById('rec-status');

  if (mediaRecorder && mediaRecorder.state === 'recording') {
    // Stop
    mediaRecorder.stop();
    clearInterval(timerInterval);
    btn.textContent = 'Start optagelse';
    status.textContent = 'Optagelse gemt';
    timer.style.display = 'none';
    return;
  }

  // Start recording
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks = [];
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach(t => t.stop());
      const duration = Math.round((Date.now() - recordingStart) / 1000);

      // For prototype: fake transcript (real would use Whisper API)
      const rec = {
        title: 'Konsultation',
        duration,
        summary: null,
        transcript: null
      };

      Store.addRecording(rec);
      showToast(`Optagelse gemt (${Math.round(duration / 60)} min)`);
      render(Router.current);
    };

    mediaRecorder.start();
    recordingStart = Date.now();
    btn.textContent = 'Stop optagelse';
    btn.classList.add('recording');
    status.textContent = 'Optager...';
    timer.style.display = 'block';

    timerInterval = setInterval(() => {
      const secs = Math.round((Date.now() - recordingStart) / 1000);
      const m = String(Math.floor(secs / 60)).padStart(2, '0');
      const s = String(secs % 60).padStart(2, '0');
      timer.textContent = `${m}:${s}`;
    }, 1000);

  } catch {
    showToast('Mikrofon-adgang nægtet', 'error');
  }
}

// Logout / Reset
function handleLogout() {
  Store.clearUser();
  Router.go('welcome');
}

function handleReset() {
  if (confirm('Er du sikker? Alle data slettes permanent.')) {
    Store.clearAll();
    Router.go('welcome');
  }
}


// ═══════════════════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════════════════

function esc(s) {
  if (!s) return '';
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function formatMessage(text) {
  return esc(text).replace(/\n/g, '<br>');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' });
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Lige nu';
  if (mins < 60) return `${mins} min siden`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} timer siden`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} dage siden`;
  return formatDate(dateStr);
}

function showToast(msg, type = 'default') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
  requestAnimationFrame(() => {
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2500);
  });
}


// ═══════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// Start router
Router.init();
