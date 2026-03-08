/**
 * Lisn — localStorage data store
 * All user data lives here. No database needed.
 */
const Store = {
  // ── Helpers ──
  _get(key, fallback = null) {
    try {
      const v = localStorage.getItem(`lisn_${key}`);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },

  _set(key, value) {
    localStorage.setItem(`lisn_${key}`, JSON.stringify(value));
  },

  // ── User / Onboarding ──
  getUser() { return this._get('user', null); },
  setUser(user) { this._set('user', user); },
  clearUser() { localStorage.removeItem('lisn_user'); },
  isLoggedIn() { return !!this.getUser(); },

  // ── Consent ──
  getConsent() { return this._get('consent', {}); },
  setConsent(consent) { this._set('consent', consent); },

  // ── Health Profile ──
  getProfile() {
    return this._get('profile', {
      allergies: [], conditions: [], medications: [],
      birthdate: '', blood_type: ''
    });
  },
  setProfile(profile) { this._set('profile', profile); },

  getProfileContext() {
    const p = this.getProfile();
    const parts = [];
    if (p.allergies.length) parts.push(`Allergier: ${p.allergies.join(', ')}`);
    if (p.conditions.length) parts.push(`Tilstande: ${p.conditions.join(', ')}`);
    if (p.medications.length) parts.push(`Medicin: ${p.medications.join(', ')}`);
    return parts.length ? parts.join('\n') : null;
  },

  // ── Conversations ──
  getConversations() { return this._get('conversations', []); },

  getConversation(id) {
    const convs = this.getConversations();
    return convs.find(c => c.id === id) || null;
  },

  createConversation(title) {
    const convs = this.getConversations();
    const conv = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: title || 'Ny samtale',
      messages: [],
      created_at: new Date().toISOString()
    };
    convs.unshift(conv);
    this._set('conversations', convs);
    return conv;
  },

  addMessage(convId, role, content) {
    const convs = this.getConversations();
    const conv = convs.find(c => c.id === convId);
    if (!conv) return;
    conv.messages.push({ role, content, created_at: new Date().toISOString() });
    this._set('conversations', convs);
  },

  // ── Documents ──
  getDocuments() { return this._get('documents', []); },

  addDocument(doc) {
    const docs = this.getDocuments();
    doc.id = Date.now().toString(36);
    doc.uploaded_at = new Date().toISOString();
    docs.unshift(doc);
    this._set('documents', docs);
    // Auto-add timeline event
    this.addTimelineEvent({
      type: 'document', title: `Dokument: ${doc.filename}`,
      description: doc.summary || 'Dokument uploadet',
      date: new Date().toISOString().split('T')[0]
    });
    return doc;
  },

  // ── Doctor Questions ──
  getQuestions() { return this._get('questions', []); },

  addQuestion(text, category = null) {
    const qs = this.getQuestions();
    const q = {
      id: Date.now().toString(36),
      question: text, category,
      answered: false,
      created_at: new Date().toISOString()
    };
    qs.unshift(q);
    this._set('questions', qs);
    return q;
  },

  toggleQuestion(id) {
    const qs = this.getQuestions();
    const q = qs.find(q => q.id === id);
    if (q) q.answered = !q.answered;
    this._set('questions', qs);
  },

  deleteQuestion(id) {
    const qs = this.getQuestions().filter(q => q.id !== id);
    this._set('questions', qs);
  },

  // ── Recordings ──
  getRecordings() { return this._get('recordings', []); },

  addRecording(rec) {
    const recs = this.getRecordings();
    rec.id = Date.now().toString(36);
    rec.recorded_at = new Date().toISOString();
    recs.unshift(rec);
    this._set('recordings', recs);
    this.addTimelineEvent({
      type: 'recording', title: `Optagelse: ${rec.title || 'Konsultation'}`,
      description: rec.summary || `${Math.round((rec.duration || 0) / 60)} min optagelse`,
      date: new Date().toISOString().split('T')[0]
    });
    return rec;
  },

  // ── Timeline ──
  getTimeline() { return this._get('timeline', []); },

  addTimelineEvent(event) {
    const tl = this.getTimeline();
    event.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 4);
    event.created_at = new Date().toISOString();
    tl.unshift(event);
    this._set('timeline', tl);
    return event;
  },

  // ── Reset ──
  clearAll() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('lisn_'));
    keys.forEach(k => localStorage.removeItem(k));
  }
};
