/* Mist Launcher — Local Server Hub
 * Create, host, manage and join Minecraft servers from the launcher.
 * Backed by window.mist.localServers (main-process LocalServerManager). */
(() => {
  'use strict';

  const bridge = window.mist;
  const api = bridge && bridge.localServers;
  if (!api) return;

  // ---------------------------------------------------------------- icons
  const P = {
    server: '<rect x="3" y="4" width="18" height="6.5" rx="1.6"/><rect x="3" y="13.5" width="18" height="6.5" rx="1.6"/><path d="M6.5 7.2h.01M6.5 16.8h.01M10 7.2h4M10 16.8h4"/>',
    serverPlus: '<rect x="3" y="4" width="13" height="6" rx="1.6"/><rect x="3" y="14" width="13" height="6" rx="1.6"/><path d="M6 7h.01M6 17h.01M8.5 7h3.5M8.5 17h3.5M19 8.5v7M15.5 12h7"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.1 0l2.4-2.4a5 5 0 0 0-7.1-7.1L11 4.9"/><path d="M14 11a5 5 0 0 0-7.1 0L4.5 13.4a5 5 0 0 0 7.1 7.1L13 19.1"/>',
    play: '<path d="m8 5 12 7-12 7z" fill="currentColor" stroke="none"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    puzzle: '<path d="M9 4a2 2 0 1 0-2 2H4v4h2a2 2 0 1 1 0 4H4v4h4v-2a2 2 0 1 1 4 0v2h4v-4h2a2 2 0 1 0 0-4h-2V6h-4a2 2 0 1 0-2-2z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.6-1.4-2.4 1.4-1.1a8 8 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 1.7Z"/>',
    terminal: '<path d="m5 7 5 5-5 5M13 17h6"/>',
    refresh: '<path d="M20 11a8 8 0 1 0 .5 4"/><path d="M20 4v7h-7"/>',
    back: '<path d="M15 18l-6-6 6-6"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    users: '<circle cx="9" cy="8" r="3.4"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 5.2a3.4 3.4 0 0 1 0 6.6M18.5 20a6.5 6.5 0 0 0-3.4-5.7"/>',
    check: '<path d="m4 12.5 5 5L20 6.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    alert: '<path d="M12 3 2 20h20z"/><path d="M12 9v5M12 17h.01"/>',
    save: '<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v6h7V3M8 14h8v7H8z"/>',
    world: '<path d="m3 7 6-3 6 3 6-3v13l-6 3-6-3-6 3z"/><path d="M9 4v13m6-10v13"/>',
    file: '<path d="M6 3h7l5 5v13H6z"/><path d="M13 3v5h5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4.3-4.3"/>',
    edit: '<path d="M4 20h4L20 8l-4-4L4 16z"/><path d="m14 6 4 4"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    uploadFile: '<path d="M12 21V9M7 14l5-5 5 5M4 4h16"/>',
    folderPlus: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M12 11v6M9 14h6"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.4 8.2-8 9-4.6-.8-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    rust: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6h.01"/>',
    gamepad: '<rect x="2.5" y="7" width="19" height="10" rx="4"/><path d="M7 10v4M5 12h4M16 11h.01M18.5 13h.01"/>',
    heart: '<path d="M12 20s-7-4.6-7-9.7A3.9 3.9 0 0 1 12 7a3.9 3.9 0 0 1 7 3.3C19 15.4 12 20 12 20z"/>'
  };
  const svg = (name, size = 18) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || P.server}</svg>`;

  // ---------------------------------------------------------------- dom helpers
  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (v == null || v === false) continue;
        if (k === 'class') el.className = v;
        else if (k === 'text') el.textContent = String(v);
        else if (k === 'html') el.innerHTML = v;
        else if (k === 'dataset') Object.assign(el.dataset, v);
        else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
        else if (k === 'value') el.value = v;
        else if (k === 'checked') el.checked = Boolean(v);
        else if (k === 'disabled') el.disabled = Boolean(v);
        else if (k === 'hidden') el.hidden = Boolean(v);
        else if (k in el) el[k] = v;
        else el.setAttribute(k, v);
      }
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return el;
  }
  const icon = (name, size) => h('span', { class: 'mist-srv-ico', html: svg(name, size), 'aria-hidden': 'true' });

  function fmtBytes(n) {
    const v = Number(n);
    if (!Number.isFinite(v) || v <= 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.min(Math.floor(Math.log(v) / Math.log(1024)), units.length - 1);
    return `${(v / 1024 ** i).toFixed(i ? 1 : 0)} ${units[i]}`;
  }
  function errText(error) {
    if (!error) return 'Something went wrong.';
    const base = error.message || String(error);
    return error.hint ? `${base} ${error.hint}` : base;
  }
  function uptime(startedAt) {
    if (!startedAt) return '—';
    const ms = Date.now() - new Date(startedAt).getTime();
    if (!Number.isFinite(ms) || ms < 0) return '—';
    const mins = Math.floor(ms / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins} min`;
    const hours = Math.floor(mins / 60);
    return `${hours}h ${mins % 60}m`;
  }

  // ---------------------------------------------------------------- toast
  function toast(message, tone = 'info') {
    document.querySelectorAll('.mist-srv-toast').forEach((node) => node.remove());
    const node = h('div', { class: `mist-srv-toast is-${tone}`, role: 'status' },
      h('span', { html: svg(tone === 'error' ? 'alert' : tone === 'success' ? 'check' : 'server', 17) }),
      h('span', { text: message }));
    document.body.append(node);
    setTimeout(() => {
      node.style.opacity = '0';
      node.style.transform = 'translateY(6px)';
      setTimeout(() => node.remove(), 220);
    }, 4200);
  }

  async function copyText(value, label = 'Copied to clipboard') {
    try {
      if (bridge.app && bridge.app.copyToClipboard) await bridge.app.copyToClipboard(value);
      else await navigator.clipboard.writeText(value);
      toast(label, 'success');
    } catch {
      toast('Could not copy. Select the text and copy it manually.', 'error');
    }
  }

  // ---------------------------------------------------------------- confirm dialog
  function confirmDialog({ title, message, confirmLabel = 'Confirm', danger = false }) {
    return new Promise((resolve) => {
      const overlay = h('div', { class: 'mist-srv-overlay is-dialog', style: 'z-index:2147483600' });
      const shell = h('div', { class: 'mist-srv-shell', style: 'width:min(460px,92vw);height:auto;min-height:0' });
      const body = h('div', { class: 'mist-srv-body' });
      const card = h('div', { class: 'mist-srv-confirm' },
        h('div', { class: 'mist-srv-eyebrow', text: 'Please confirm' }),
        h('h2', { style: 'margin:0;font-size:18px;font-weight:800', text: title }),
        h('p', { text: message }),
        h('div', { class: 'row' },
          h('button', { class: 'mist-srv-btn', type: 'button', text: 'Cancel', onclick: () => { overlay.remove(); resolve(false); } }),
          h('button', { class: `mist-srv-btn ${danger ? 'is-bad' : 'is-primary'}`, type: 'button', text: confirmLabel, onclick: () => { overlay.remove(); resolve(true); } })));
      body.append(card);
      shell.append(body);
      overlay.append(shell);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) { overlay.remove(); resolve(false); } });
      document.body.append(overlay);
      shell.querySelector('.is-primary, .is-bad')?.focus();
    });
  }

  // ---------------------------------------------------------------- prompt dialog
  function promptDialog({ title, message, label = 'Name', value = '', confirmLabel = 'Save', placeholder = '' }) {
    return new Promise((resolve) => {
      const overlay2 = h('div', { class: 'mist-srv-overlay is-dialog', style: 'z-index:2147483600' });
      const box = h('div', { class: 'mist-srv-shell', style: 'width:min(430px,92vw);height:auto;min-height:0' });
      const body = h('div', { class: 'mist-srv-body' });
      const inp = h('input', { class: 'mist-srv-input', type: 'text', value: value || '', placeholder, maxlength: 120 });
      const submit = () => {
        const text = inp.value.trim();
        if (!text) { inp.focus(); return; }
        overlay2.remove();
        resolve(text);
      };
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); submit(); }
        if (e.key === 'Escape') { overlay2.remove(); resolve(null); }
      });
      const card = h('div', { class: 'mist-srv-confirm', style: 'max-width:none' },
        h('div', { class: 'mist-srv-eyebrow', text: 'Mist Launcher' }),
        h('h2', { style: 'margin:0;font-size:18px;font-weight:800', text: title }),
        message ? h('p', { text: message }) : null,
        h('label', { class: 'mist-srv-field' }, h('span', { text: label }), inp),
        h('div', { class: 'row' },
          h('button', { class: 'mist-srv-btn', type: 'button', text: 'Cancel', onclick: () => { overlay2.remove(); resolve(null); } }),
          h('button', { class: 'mist-srv-btn is-primary', type: 'button', text: confirmLabel, onclick: submit })));
      body.append(card);
      box.append(body);
      overlay2.append(box);
      overlay2.addEventListener('click', (e) => { if (e.target === overlay2) { overlay2.remove(); resolve(null); } });
      document.body.append(overlay2);
      setTimeout(() => { inp.focus(); inp.select(); }, 30);
    });
  }

  // ---------------------------------------------------------------- privacy gate
  const PRIVACY_KEY = 'mist.localServer.privacyAccepted.v1';
  function privacyAccepted() {
    try { return localStorage.getItem(PRIVACY_KEY) === '1'; } catch { return false; }
  }
  function setPrivacyAccepted() {
    try { localStorage.setItem(PRIVACY_KEY, '1'); } catch { /* ignore */ }
  }
  function privacyGate() {
    if (privacyAccepted()) return Promise.resolve(true);
    return new Promise((resolve) => {
      const overlay2 = h('div', { class: 'mist-srv-overlay is-dialog', style: 'z-index:2147483600' });
      const box = h('div', { class: 'mist-srv-shell', style: 'width:min(620px,94vw);height:auto;min-height:0;max-height:92vh' });
      const body = h('div', { class: 'mist-srv-body' });
      const agree = h('input', { type: 'checkbox' });
      const confirmBtn = h('button', { class: 'mist-srv-btn is-primary', type: 'button', html: `${svg('shield', 16)}<span>I understand — create server</span>` });
      confirmBtn.disabled = true;
      agree.addEventListener('change', () => { confirmBtn.disabled = !agree.checked; });
      confirmBtn.addEventListener('click', () => {
        if (!agree.checked) return;
        setPrivacyAccepted();
        overlay2.remove();
        resolve(true);
      });
      const close = () => { overlay2.remove(); resolve(false); };
      const card = h('div', { class: 'mist-srv-confirm', style: 'max-width:none' },
        h('div', { class: 'mist-srv-eyebrow', text: 'BEFORE YOU HOST' }),
        h('h2', { style: 'margin:0;font-size:20px;font-weight:800', text: 'This server runs on your PC' }),
        h('p', { class: 'mist-srv-hint', text: 'Mist Launcher does not host servers for you. Everything below happens on this computer and your own internet connection.' }),
        h('ul', { class: 'mist-srv-disclaimer-list' },
          h('li', {}, h('strong', { text: 'Your PC is the server. ' }), 'The world, plugins and settings live in a folder on this PC. The server uses your CPU, RAM and bandwidth, and it stops when you close the PC.'),
          h('li', {}, h('strong', { text: 'Your IP address. ' }), 'Invite codes carry the connection details in scrambled, tamper-protected form — Mist never shows your IP, local address or port anywhere. Anyone holding the code can still connect, so share it only with people you trust.'),
          h('li', {}, h('strong', { text: 'Keep it private. ' }), 'Only share invite codes with people you trust. Never post them publicly. Keep “Online mode” on so only verified Microsoft accounts can join.'),
          h('li', {}, h('strong', { text: 'No data leaves your PC. ' }), 'Mist only downloads server software from official sources and does not upload your world or player data anywhere.'),
          h('li', {}, h('strong', { text: 'Minecraft EULA. ' }), 'By running a server you agree to the Minecraft End User License Agreement (aka.ms/MinecraftEULA).')),
        h('label', { class: 'mist-srv-consent' }, agree, h('span', { text: 'I understand this server is hosted on my own computer.' })),
        h('div', { class: 'row' },
          h('button', { class: 'mist-srv-btn', type: 'button', text: 'Cancel', onclick: close }),
          confirmBtn));
      body.append(card);
      box.append(body);
      overlay2.append(box);
      overlay2.addEventListener('click', (e) => { if (e.target === overlay2) close(); });
      document.body.append(overlay2);
    });
  }

  // ---------------------------------------------------------------- state
  const S = {
    open: false,
    view: 'list',           // list | create | join | browse | dashboard
    group: 'host',          // host | join
    tab: 'overview',        // overview | console | files | plugins | worlds | settings
    servers: [],
    serverId: null,
    logs: new Map(),
    logsLoaded: new Set(),
    cache: new Map(),       // key -> data
    pending: new Set(),
    filePath: '',
    software: null,         // [{id,label,...}]
    softwareState: 'idle',
    versionCache: new Map(),// software -> [version]
    versionState: new Map(),// software -> idle|loading|ready
    versionRefresh: null,   // repaints the active version select after versions load
    formSoftware: 'paper',
    formVersion: '',
    pluginQuery: '',
    pluginCategory: 'all',
    pluginSort: 'downloads',
    pluginOffset: 0,
    pluginResults: null,
    pluginState: 'idle',
    pluginFor: null,
    editor: null,
    join: { code: '', host: '', port: 25565, name: '', valid: false, manual: false },
    browse: { items: [], state: 'idle', error: '', at: 0 },
    installs: [],
    installId: '',
    advanced: false,
    busy: false
  };

  let overlay = null;
  let shell = null;
  let bodyEl = null;

  const activeServer = () => S.servers.find((s) => s.id === S.serverId) || null;
  const activeInstallId = () => {
    try { return window.__mistApp?.getState?.()?.activeInstallationId || null; } catch { return null; }
  };

  async function refreshServers() {
    try { S.servers = await api.list(); } catch (e) { toast(errText(e), 'error'); }
    paintNavState();
  }

  function paintNavState() {
    const live = S.servers.some((s) => s.state && s.state.running);
    document.querySelectorAll('[data-mist-server-nav]').forEach((b) => b.dataset.live = live ? 'true' : 'false');
  }

  // ---------------------------------------------------------------- shell
  function ensureShell() {
    if (overlay) return;
    overlay = h('div', { class: 'mist-srv-overlay', hidden: true });
    shell = h('div', { class: 'mist-srv-shell', role: 'region', 'aria-label': 'Local servers' });
    overlay.append(shell);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && S.open) {
        if (S.view === 'dashboard') { S.view = 'list'; S.group = 'host'; paint(); }
        else closeHub();
      }
    });
    document.body.append(overlay);
  }

  function closeHub() {
    S.open = false;
    if (overlay) overlay.hidden = true;
    document.documentElement.classList.remove('mist-srv-lock');
  }

  async function openHub(view) {
    ensureShell();
    S.open = true;
    document.documentElement.classList.add('mist-srv-lock');
    S.view = view || 'list';
    S.group = S.view === 'join' || S.view === 'browse' ? 'join' : 'host';
    if (view === 'create') { S.formSoftware = 'paper'; S.formVersion = ''; }
    S.tab = 'overview';
    S.advanced = false;
    overlay.hidden = false;
    ensureSoftware();
    if (S.group === 'join' && !S.installs.length) await loadInstalls();
    if (S.servers.length === 0) await refreshServers();
    paint();
    if (S.view === 'browse' && S.browse.state !== 'loading') loadBrowse();
  }

  async function openDashboard(id, tab = 'overview') {
    ensureShell();
    S.open = true;
    S.view = 'dashboard';
    S.group = 'host';
    S.serverId = id;
    S.tab = tab;
    ensureSoftware();
    await refreshServers();
    await enterTab(tab);
    overlay.hidden = false;
    paint();
  }

  async function enterTab(tab) {
    const s = activeServer();
    if (!s) return;
    S.tab = tab;
    if (tab === 'console') await loadLogs(s.id);
    if (tab === 'files') await loadFiles('');
    if (tab === 'plugins') await loadPlugins();
    if (tab === 'worlds') await loadWorlds();
  }

  async function loadInstalls() {
    try {
      S.installs = (await bridge.installations.list()) || [];
      S.installId = S.installId || activeInstallId() || S.installs[0]?.id || '';
    } catch { S.installs = []; }
  }

  async function loadBrowse(repaint = true) {
    if (S.browse.state === 'loading') return;
    S.browse.state = 'loading';
    S.browse.error = '';
    let items = [];
    try {
      items = await api.browse();
    } catch (e) {
      S.browse.error = errText(e);
    }
    S.browse.items = Array.isArray(items) ? items : [];
    S.browse.at = Date.now();
    S.browse.state = S.browse.error ? 'error' : 'ready';
    if (repaint && S.open && S.view === 'browse') paint();
  }

  // ---------------------------------------------------------------- paint
  async function paint() {
    ensureShell();
    shell.replaceChildren();
    const server = activeServer();

    // header
    const head = h('header', { class: 'mist-srv-head' });
    if (S.view === 'dashboard' && server) {
      head.append(
        h('button', { class: 'mist-srv-back', type: 'button', title: 'Back to servers', 'aria-label': 'Back to servers', html: svg('back', 16), onclick: () => { S.view = 'list'; S.group = 'host'; S.serverId = null; paint(); } }),
        h('span', { class: 'mist-srv-mark', html: svg('server', 22) }),
        h('div', { class: 'mist-srv-titles' },
          h('strong', { text: server.name }),
          h('small', {}, statusPill(server.state), h('span', { text: ` · ${softwareLabel(server.software)} ${server.version}` }))),
        h('span', { class: 'mist-srv-head-spacer' }),
        h('button', { class: 'mist-srv-x', type: 'button', title: 'Close', 'aria-label': 'Close', html: svg('x', 17), onclick: closeHub }));
    } else {
      const joinGroup = S.group === 'join';
      head.append(
        h('span', { class: 'mist-srv-mark', html: svg(joinGroup ? 'link' : 'server', 22) }),
        h('div', { class: 'mist-srv-titles' },
          h('strong', { text: joinGroup ? 'Join a world' : 'Local servers' }),
          h('small', { text: joinGroup ? 'Find a public server on your network, or paste an invite code' : 'Create and manage worlds hosted on this PC' })),
        h('span', { class: 'mist-srv-head-spacer' }),
        h('button', { class: 'mist-srv-x', type: 'button', title: 'Close', 'aria-label': 'Close', html: svg('x', 17), onclick: closeHub }));
    }
    shell.append(head);

    if (S.view !== 'dashboard') {
      const tabs = S.group === 'join'
        ? [tabButton('browse', 'Browse servers', 'globe'), tabButton('join', 'Join with code', 'link')]
        : [tabButton('list', 'My servers', 'server'), tabButton('create', 'Create server', 'serverPlus')];
      shell.append(h('nav', { class: 'mist-srv-tabs', 'aria-label': S.group === 'join' ? 'Join a server' : 'Local server sections' }, ...tabs));
    }

    bodyEl = h('div', { class: 'mist-srv-body' });
    shell.append(bodyEl);

    if (S.view === 'list') renderList();
    else if (S.view === 'create') renderCreate();
    else if (S.view === 'join') renderJoin();
    else if (S.view === 'browse') renderBrowse();
    else if (S.view === 'dashboard' && server) renderDashboard(server);
    else renderList();
  }

  function tabButton(view, label, iconName) {
    return h('button', {
      class: `mist-srv-tab${S.view === view ? ' is-active' : ''}`, type: 'button',
      html: `${svg(iconName, 15)}<span>${label}</span>`,
      onclick: () => {
        S.view = view;
        S.advanced = false;
        if (view === 'join' || view === 'browse') {
          loadInstalls().then(() => {
            paint();
            if (view === 'browse' && Date.now() - S.browse.at > 4000) loadBrowse();
          });
        } else paint();
      }
    });
  }

  function statusPill(state) {
    const running = Boolean(state?.running);
    const ready = Boolean(state?.ready);
    const cls = running ? (ready ? 'is-live' : 'is-starting') : '';
    const label = running ? (ready ? 'Online' : 'Starting') : 'Stopped';
    return h('span', { class: `mist-srv-pill ${cls}`, text: label });
  }

  // ---------------------------------------------------------------- list view
  function renderList() {
    const wrap = h('div', { class: 'mist-srv-hub' });
    const side = h('aside', { class: 'mist-srv-sidecard' },
      h('strong', { text: 'YOUR SERVERS' }),
      h('div', { class: 'mist-srv-list' }));

    if (!S.servers.length) {
      side.querySelector('.mist-srv-list').append(h('div', { class: 'mist-srv-empty', text: 'No servers yet. Create one and invite friends with a code.' }));
    } else {
      for (const server of S.servers) {
        side.querySelector('.mist-srv-list').append(
          h('button', {
            class: `mist-srv-row${S.serverId === server.id ? ' is-active' : ''}`, type: 'button',
            onclick: () => openDashboard(server.id)
          },
            h('span', { class: 'mist-srv-row-ico', html: svg('server', 18) }),
            h('span', { class: 'mist-srv-row-copy' },
              h('strong', { text: server.name }),
              h('small', { text: `${softwareLabel(server.software)} ${server.version}${server.visibility === 'public' ? ' · Public' : ''}` })),
            h('span', { class: `mist-srv-row-state${server.state?.running ? ' is-live' : ''}` })));
      }
    }

    const main = h('section', { class: 'mist-srv-maincard' });
    if (!S.servers.length) {
      main.append(
        h('div', { class: 'mist-srv-eyebrow', text: 'HOST YOUR OWN WORLD' }),
        h('div', { class: 'mist-srv-hero' },
          h('div', {}, h('h2', { text: 'Your world. Your rules.' }), h('p', { text: 'Turn this PC into a Minecraft server in a few clicks. Mist downloads the server, configures it, and gives you an invite code to share.' })),
          h('div', { class: 'mist-srv-actions' },
            h('button', { class: 'mist-srv-btn is-primary', type: 'button', html: `${svg('serverPlus', 16)}<span>Create server</span>`, onclick: () => { S.view = 'create'; paint(); } }),
            h('button', { class: 'mist-srv-btn', type: 'button', html: `${svg('link', 16)}<span>Join a server</span>`, onclick: () => { S.view = 'join'; loadInstalls().then(paint); } }))),
        h('div', { class: 'mist-srv-note', html: `${svg('alert', 15)}<span>Hosting needs Java (Mist can install it automatically). Friends join with an invite code — no addresses to type. For internet play, forward the port on your router or use a tunnel.</span>` }),
        h('div', { class: 'mist-srv-facts' },
          fact('Server versions', 'Latest releases from Mojang'),
          fact('Automatic setup', 'EULA + server.properties'),
          fact('Invite codes', 'One code, everything included'),
          fact('Management', 'Console, files, plugins, worlds')));
    } else {
      const server = S.servers.find((s) => s.id === S.serverId) || S.servers[0];
      S.serverId = server.id;
      main.append(
        h('div', { class: 'mist-srv-eyebrow', text: 'SERVER READY' }),
        h('div', { class: 'mist-srv-hero' },
          h('div', {}, h('h2', { text: server.name }), h('p', {}, statusPill(server.state), h('span', { text: `  Minecraft ${server.version} · ${server.players ?? 0}/${server.maxPlayers ?? 20} players` }))),
          h('div', { class: 'mist-srv-actions' },
            h('button', { class: 'mist-srv-btn is-primary', type: 'button', html: `${svg('terminal', 16)}<span>Open dashboard</span>`, onclick: () => openDashboard(server.id) }),
            h('button', { class: 'mist-srv-btn', type: 'button', html: `${svg('link', 16)}<span>Join a server</span>`, onclick: () => { S.view = 'join'; loadInstalls().then(paint); } }))),
        h('div', { class: 'mist-srv-address mist-srv-invite' },
          h('span', { class: 'copy' }, h('small', { text: 'Invite code' }), h('code', { text: server.join.code })),
          h('button', { class: 'mist-srv-btn is-small', type: 'button', html: `${svg('copy', 14)}<span>Copy</span>`, onclick: () => copyText(server.join.code, 'Invite code copied') })),
        h('div', { class: 'mist-srv-note', html: `${svg('shield', 15)}<span>Addresses are hidden for privacy. Friends join only with this invite code — send it privately, never post it publicly.</span>` }));
    }
    wrap.append(side, main);
    bodyEl.append(wrap);
  }

  function fact(label, value) {
    return h('div', { class: 'mist-srv-fact' }, h('small', { text: label }), h('strong', { text: value }));
  }

  // ---------------------------------------------------------------- software + versions
  const SOFTWARE_FALLBACK = [
    { id: 'vanilla', label: 'Vanilla', tagline: 'Official Mojang server', description: 'The official Minecraft server. No plugins or mods.', plugins: false, mods: false, rust: false, recommended: false },
    { id: 'paper', label: 'Paper', tagline: 'Fast, plugin ready', description: 'High performance Spigot fork. Best choice for plugins.', plugins: true, mods: false, rust: false, recommended: true },
    { id: 'purpur', label: 'Purpur', tagline: 'Paper with extras', description: 'Paper fork with hundreds of extra options. Plugin compatible.', plugins: true, mods: false, rust: false, recommended: false },
    { id: 'fabric', label: 'Fabric', tagline: 'Lightweight mod loader', description: 'Modern, fast mod loader for Fabric mods.', plugins: false, mods: true, rust: false, recommended: false },
    { id: 'forge', label: 'Forge', tagline: 'Classic mod loader', description: 'Classic modding platform for large modpacks.', plugins: false, mods: true, rust: false, recommended: false },
    { id: 'neoforge', label: 'NeoForge', tagline: 'Modern Forge fork', description: 'Community fork of Forge for recent versions.', plugins: false, mods: true, rust: false, recommended: false },
    { id: 'pumpkin', label: 'Pumpkin (Rust)', tagline: 'Experimental Rust server', description: 'A Minecraft server written in Rust. Fast and light, but experimental.', plugins: false, mods: false, rust: true, recommended: false }
  ];
  const SOFTWARE_ICONS = { vanilla: 'server', paper: 'file', purpur: 'server', fabric: 'puzzle', forge: 'puzzle', neoforge: 'puzzle', pumpkin: 'rust' };

  function softwareList() {
    return Array.isArray(S.software) && S.software.length ? S.software : SOFTWARE_FALLBACK;
  }
  function softwareInfo(id) {
    return softwareList().find((entry) => entry.id === id) || SOFTWARE_FALLBACK[0];
  }
  function softwareLabel(id) {
    return softwareInfo(id).label;
  }
  function isRust(server) {
    return Boolean(softwareInfo(server?.software).rust);
  }

  async function ensureSoftware() {
    if (S.softwareState === 'loading' || S.softwareState === 'ready') return;
    S.softwareState = 'loading';
    try {
      const list = await api.software();
      S.software = Array.isArray(list) && list.length ? list : SOFTWARE_FALLBACK;
    } catch {
      S.software = SOFTWARE_FALLBACK;
    }
    S.softwareState = 'ready';
    if (S.open && (S.view === 'create' || S.view === 'dashboard')) paint();
  }

  function fallbackVersions(software) {
    const generic = ['1.21.4', '1.21.1', '1.20.6', '1.20.4', '1.20.1', '1.19.4', '1.18.2', '1.16.5', '1.12.2', '1.8.9'];
    if (software === 'pumpkin') return ['1.21.4'];
    return generic;
  }

  async function ensureSoftwareVersions(software) {
    const state = S.versionState.get(software);
    if (state === 'loading' || state === 'ready') return;
    S.versionState.set(software, 'loading');
    try {
      let list = await api.softwareVersions(software);
      if (!Array.isArray(list) || !list.length) {
        list = software === 'vanilla' ? (await api.versions()).map((entry) => entry.id) : [];
      }
      list = (list || []).filter((x) => typeof x === 'string' && /^\d+\.\d+/.test(x));
      S.versionCache.set(software, list.length ? list : fallbackVersions(software));
    } catch {
      S.versionCache.set(software, fallbackVersions(software));
    }
    S.versionState.set(software, 'ready');
    if (S.versionRefresh) S.versionRefresh();
    else if (S.open && S.view === 'create') paint();
  }

  function versionsFor(software) {
    return S.versionCache.get(software) || [];
  }
  function defaultVersionFor(software) {
    return versionsFor(software)[0] || fallbackVersions(software)[0];
  }

  // ---------------------------------------------------------------- create / edit form
  function renderCreate() {
    if (S.softwareState === 'idle') ensureSoftware();
    if (S.softwareState === 'ready') ensureSoftwareVersions(S.formSoftware);
    bodyEl.append(serverForm(null));
  }

  function serverForm(server) {
    const editing = Boolean(server);
    const chosen = server ? (server.software || 'vanilla') : (S.formSoftware || 'paper');
    S.formSoftware = chosen;
    const v = server || {
      name: '', version: '', port: 25565, memoryMb: 2048, maxPlayers: 20,
      gamemode: 'survival', difficulty: 'normal', motd: 'A Mist Launcher server', levelName: 'world',
      levelSeed: '', viewDistance: 10, spawnProtection: 16, onlineMode: true, pvp: true,
      allowFlight: false, whiteList: false, enableCommandBlock: false, hardcore: false,
      customHost: '', javaPath: '', software: chosen
    };
    let pickedVersion = editing ? v.version : (S.formVersion || defaultVersionFor(chosen));
    if (!pickedVersion) pickedVersion = defaultVersionFor(chosen);
    S.formVersion = pickedVersion;
    const form = h('div', { class: 'mist-srv-form' });
    form.append(
      h('div', { class: 'mist-srv-page-hero' },
        h('div', { class: 'mist-srv-page-hero-ico', html: svg(editing ? 'gear' : 'serverPlus', 26) }),
        h('div', { class: 'mist-srv-page-hero-copy' },
          h('div', { class: 'mist-srv-eyebrow', text: editing ? 'SERVER SETTINGS' : 'NEW SERVER' }),
          h('h2', { style: 'margin:6px 0 4px;font-size:22px', text: editing ? `Edit ${server.name}` : 'Create a local server' }),
          h('p', { class: 'mist-srv-hint', text: editing ? 'Changes apply the next time the server starts. server.properties is rewritten on every start.' : 'Pick server software, and Mist downloads and configures it for you. Everything runs on this PC.' }))));

    // software picker
    const hiddenSoftware = h('input', { type: 'hidden', name: 'software', value: chosen });
    const picker = h('div', { class: 'mist-srv-software' });
    const cards = new Map();
    const desc = h('p', { class: 'mist-srv-hint', text: softwareInfo(chosen).description });
    const versionBox = h('label', { class: 'mist-srv-field' });
    const paintVersion = () => {
      const state = S.versionState.get(S.formSoftware);
      const list = versionsFor(S.formSoftware);
      let select;
      if (state !== 'ready' || !list.length) {
        const fallback = pickedVersion || defaultVersionFor(S.formSoftware);
        select = selectOf([[String(fallback), `Loading versions… (${fallback})`]], String(fallback), 'version');
      } else {
        const cur = list.includes(pickedVersion) ? pickedVersion : list[0];
        pickedVersion = cur;
        S.formVersion = cur;
        select = selectOf(list.map((id) => [id, id]), String(cur), 'version');
      }
      select.addEventListener('change', () => { pickedVersion = select.value; S.formVersion = select.value; });
      versionBox.replaceChildren(h('span', { text: 'Minecraft version' }), select, h('small', { text: 'Only versions this software publishes are listed.' }));
    };
    for (const item of softwareList()) {
      const card = h('button', {
        class: `mist-srv-software-card${item.id === chosen ? ' is-active' : ''}`, type: 'button',
        onclick: () => {
          if (S.formSoftware === item.id) return;
          S.formSoftware = item.id;
          hiddenSoftware.value = item.id;
          pickedVersion = '';
          S.formVersion = '';
          for (const [id, el] of cards) el.classList.toggle('is-active', id === item.id);
          desc.textContent = softwareInfo(item.id).description;
          ensureSoftwareVersions(item.id);
          paintVersion();
        }
      },
        h('span', { class: `mist-srv-software-ico${item.rust ? ' is-rust' : ''}`, html: svg(SOFTWARE_ICONS[item.id] || 'server', 18) }),
        h('span', { class: 'mist-srv-software-copy' },
          h('strong', { text: item.label }),
          h('small', { text: item.tagline })),
        item.recommended ? h('span', { class: 'mist-srv-pill is-live', text: 'Recommended' }) : null);
      cards.set(item.id, card);
      picker.append(card);
    }
    paintVersion();
    S.versionRefresh = () => { paintVersion(); };
    if (S.softwareState === 'ready') ensureSoftwareVersions(chosen);
    form.append(hiddenSoftware,
      h('div', { class: 'mist-srv-section' },
        h('div', { class: 'mist-srv-eyebrow', text: 'SERVER SOFTWARE' }),
        picker, desc));

    const basics = h('div', { class: 'mist-srv-grid' });
    basics.append(
      field('Server name', input('text', v.name, { name: 'name', placeholder: 'My Minecraft world', maxlength: 60, required: true }), 'Shown in your server list.'),
      versionBox,
      field('Memory (MB)', selectOf([1024, 2048, 3072, 4096, 6144, 8192, 12288, 16384].map((n) => [String(n), `${n} MB`]), String(v.memoryMb), 'memoryMb'), 'RAM reserved for the server.'),
      field('Max players', input('number', v.maxPlayers, { name: 'maxPlayers', min: 1, max: 1000 })),
      field('Game mode', selectOf([['survival', 'Survival'], ['creative', 'Creative'], ['adventure', 'Adventure'], ['spectator', 'Spectator']], v.gamemode, 'gamemode')),
      field('Difficulty', selectOf([['peaceful', 'Peaceful'], ['easy', 'Easy'], ['normal', 'Normal'], ['hard', 'Hard']], v.difficulty, 'difficulty'), null, 'is-wide'),
      field('MOTD', input('text', v.motd, { name: 'motd', maxlength: 100, placeholder: 'A Mist Launcher server' }), 'Message shown in the multiplayer list.', 'is-wide'),
      field('World folder', input('text', v.levelName, { name: 'levelName', maxlength: 40, placeholder: 'world' }), 'Folder name for this world.'),
      field('World seed', input('text', v.levelSeed || '', { name: 'levelSeed', placeholder: 'Leave empty for a random seed' }), null)
    );
    form.append(basics);

    form.append(h('div', { class: 'mist-srv-note', html: `${svg('shield', 15)}<span><strong>Port handled for you.</strong> Mist picks a free port automatically and never displays it to anyone. For internet play, forward that port on your router.</span>` }));

    form.append(h('div', { class: 'mist-srv-section' },
      h('div', { class: 'mist-srv-eyebrow', text: 'WHO CAN FIND THIS SERVER' }),
      visibilityPicker(v.visibility || 'private')));

    const toggles = h('div', { class: 'mist-srv-toggle-row' });
    toggles.append(
      toggle('onlineMode', 'Online mode', 'Only verified Microsoft accounts can join. Turn off for offline friends.', v.onlineMode),
      toggle('pvp', 'PvP', 'Allow players to damage each other.', v.pvp),
      toggle('allowFlight', 'Allow flight', 'Permit flying outside creative mode.', v.allowFlight),
      toggle('whiteList', 'Whitelist', 'Only listed players may join (edit whitelist.json in Files).', v.whiteList),
      toggle('enableCommandBlock', 'Command blocks', 'Enable command blocks in the world.', v.enableCommandBlock),
      toggle('hardcore', 'Hardcore', 'One life; players become spectators on death.', v.hardcore)
    );
    form.append(toggles);

    form.append(h('button', { class: 'mist-srv-btn is-ghost', type: 'button', html: `${svg('gear', 15)}<span>${S.advanced ? 'Hide advanced options' : 'Advanced options'}</span>`, onclick: () => { S.advanced = !S.advanced; paint(); } }));

    if (S.advanced) {
      const adv = h('div', { class: 'mist-srv-grid three' });
      adv.append(
        field('View distance', input('number', v.viewDistance, { name: 'viewDistance', min: 2, max: 32 })),
        field('Spawn protection', input('number', v.spawnProtection, { name: 'spawnProtection', min: 0, max: 64 })),
        field('World type', input('text', v.levelType || 'minecraft:normal', { name: 'levelType', placeholder: 'minecraft:normal' })),
        field('Public address (optional)', input('text', v.customHost || '', { name: 'customHost', placeholder: 'play.example.com', maxlength: 253 }), 'Used in invite codes when you use a tunnel.', 'is-wide'),
        field('Java executable (optional)', javaField(v.javaPath || ''), 'Leave empty to let Mist pick a compatible Java runtime.', 'is-wide')
      );
      form.append(adv);
    }

    const info = softwareInfo(S.formSoftware);
    if (info.rust) {
      form.append(h('div', { class: 'mist-srv-note is-warn', html: `${svg('alert', 15)}<span><strong>Pumpkin is experimental.</strong> It is a real Minecraft server written in Rust, but some vanilla features and most plugins/mods are missing. It also only supports the newest Minecraft release. Not recommended for public survival servers.</span>` }));
    } else if (S.formSoftware === 'forge' || S.formSoftware === 'neoforge') {
      form.append(h('div', { class: 'mist-srv-note', html: `${svg('alert', 15)}<span><strong>First start takes longer.</strong> ${info.label} runs an installer to download libraries before the server can start. Watch the console for progress.</span>` }));
    }
    if (!editing) {
      form.append(h('div', { class: 'mist-srv-note mist-srv-privacy', html: `${svg('shield', 15)}<span><strong>Your PC is the server.</strong> The world runs on this computer using your CPU, RAM and internet. Nothing is uploaded to Mist. Invite codes carry the connection details in scrambled, tamper-protected form so the address is never shown.</span>` }));
      form.append(h('button', { class: 'mist-srv-linkish', type: 'button', text: 'Read the hosting disclaimer', onclick: () => privacyGate() }));
    }

    form.append(h('div', { class: 'mist-srv-note', html: `${svg('alert', 15)}<span>${editing ? 'The server must be stopped before some changes fully apply.' : 'Ports below 1024 may need administrator rights. For internet play, forward this port on your router or use a tunnel service.'}</span>` }));

    const foot = h('div', { class: 'mist-srv-form-foot' });
    foot.append(
      h('button', { class: `mist-srv-btn ${editing ? 'is-primary' : 'is-primary'}`, type: 'button', html: `${svg(editing ? 'save' : 'serverPlus', 16)}<span>${editing ? 'Save changes' : 'Create server'}</span>`, onclick: (e) => submitForm(e.currentTarget, server) }));
    foot.append(h('span', { class: 'mist-srv-spacer' }));
    foot.append(h('button', { class: 'mist-srv-btn', type: 'button', text: editing ? 'Back' : 'Cancel', onclick: () => { if (editing) { S.view = 'dashboard'; S.tab = 'settings'; paint(); } else { S.view = S.servers.length ? 'list' : 'list'; paint(); } } }));
    form.append(foot);
    return form;
  }

  function field(label, control, help, extra) {
    return h('label', { class: `mist-srv-field${extra ? ` ${extra}` : ''}` },
      h('span', { text: label }), control, help ? h('small', { text: help }) : null);
  }
  function input(type, value, attrs) {
    const el = h('input', { class: 'mist-srv-input', type, value: value ?? '' });
    if (attrs) for (const [k, val] of Object.entries(attrs)) {
      if (k === 'name') el.name = val;
      else if (k === 'placeholder') el.placeholder = val;
      else if (k === 'maxlength') el.maxLength = val;
      else if (k === 'min') el.min = val;
      else if (k === 'max') el.max = val;
      else if (k === 'required') el.required = Boolean(val);
    }
    return el;
  }
  function selectOf(options, value, name) {
    const el = h('select', { class: 'mist-srv-select' });
    if (name) el.name = name;
    for (const [val, label] of options) {
      const o = h('option', { value: val, text: label });
      if (String(val) === String(value)) o.selected = true;
      el.append(o);
    }
    return el;
  }
  function toggle(name, label, help, checked) {
    return h('label', { class: 'mist-srv-toggle' },
      h('input', { type: 'checkbox', name, checked: Boolean(checked) }),
      h('span', { class: 'mist-srv-toggle-copy' }, h('strong', { text: label }), h('small', { text: help })));
  }
  function visibilityPicker(value) {
    const current = value === 'public' ? 'public' : 'private';
    const hidden = h('input', { type: 'hidden', name: 'visibility', value: current });
    const wrap = h('div', { class: 'mist-srv-choice' });
    const cards = new Map();
    for (const [id, label, desc, iconName] of [
      ['private', 'Private', 'Joinable only with the invite code. Nobody can browse it.', 'shield'],
      ['public', 'Public', 'Listed in Browse servers for players on your network while it runs.', 'globe']
    ]) {
      const card = h('button', {
        class: `mist-srv-choice-card${current === id ? ' is-active' : ''}`, type: 'button',
        onclick: () => {
          hidden.value = id;
          for (const [key, el] of cards) el.classList.toggle('is-active', key === id);
        }
      },
        h('span', { class: 'mist-srv-choice-ico', html: svg(iconName, 16) }),
        h('span', { class: 'mist-srv-choice-copy' }, h('strong', { text: label }), h('small', { text: desc })));
      cards.set(id, card);
      wrap.append(card);
    }
    return h('div', {}, hidden, wrap);
  }
  function javaField(value) {
    const inp = input('text', value, { placeholder: 'Auto-detect (recommended)' });
    inp.dataset.javaPath = 'true';
    const wrap = h('div', { style: 'display:flex;gap:6px' }, inp,
      h('button', {
        class: 'mist-srv-btn is-small', type: 'button', text: 'Browse…', onclick: async () => {
          try {
            const picked = await bridge.java.pick();
            if (picked && typeof picked === 'string') inp.value = picked;
          } catch (e) { toast(errText(e), 'error'); }
        }
      }));
    return wrap;
  }

  function readForm() {
    const q = (name) => bodyEl.querySelector(`[name="${name}"]`);
    const val = (name) => q(name)?.value?.trim() ?? '';
    const num = (name) => Number(q(name)?.value);
    const chk = (name) => Boolean(q(name)?.checked);
    return {
      name: val('name'),
      software: val('software') || S.formSoftware || 'vanilla',
      version: val('version'),
      memoryMb: num('memoryMb'),
      maxPlayers: num('maxPlayers'),
      gamemode: val('gamemode'),
      difficulty: val('difficulty'),
      motd: val('motd'),
      levelName: val('levelName') || 'world',
      levelSeed: val('levelSeed'),
      levelType: 'minecraft:normal',
      viewDistance: num('viewDistance') || 10,
      spawnProtection: Number.isFinite(num('spawnProtection')) ? num('spawnProtection') : 16,
      onlineMode: chk('onlineMode'),
      visibility: val('visibility') || 'private',
      pvp: chk('pvp'),
      allowFlight: chk('allowFlight'),
      whiteList: chk('whiteList'),
      enableCommandBlock: chk('enableCommandBlock'),
      hardcore: chk('hardcore'),
      customHost: val('customHost'),
      javaPath: bodyEl.querySelector('[data-java-path]')?.value?.trim() || null
    };
  }

  async function submitForm(button, server) {
    if (S.busy) return;
    const payload = readForm();
    if (!payload.name) { toast('Enter a server name.', 'error'); return; }
    if (!payload.version) { toast('Choose a Minecraft version.', 'error'); return; }
    if (!server && !privacyAccepted()) {
      const accepted = await privacyGate();
      if (!accepted) return;
    }
    S.busy = true; button.disabled = true;
    const old = button.innerHTML;
    button.innerHTML = `${svg('refresh', 15)}<span>Saving…</span>`;
    try {
      let result;
      if (server) {
        result = await api.update(server.id, payload);
        toast('Server settings saved.', 'success');
      } else {
        result = await api.create(payload);
        toast('Server created. Press Start to launch it.', 'success');
      }
      await refreshServers();
      S.busy = false;
      if (result && result.id) await openDashboard(result.id, server ? 'settings' : 'overview');
      else paint();
    } catch (e) {
      toast(errText(e), 'error');
      S.busy = false; button.disabled = false; button.innerHTML = old;
    }
  }

  // ---------------------------------------------------------------- dashboard
  function renderDashboard(server) {
    const dash = h('div', { class: 'mist-srv-dash' });
    const run = server.state?.running;
    const head = h('div', { class: 'mist-srv-dash-hero' });
    head.append(
      h('div', { class: 'mist-srv-dash-hero-ico', html: svg(softwareInfo(server.software).rust ? 'rust' : 'server', 26) }),
      h('div', { class: 'mist-srv-dash-hero-copy' },
        h('div', { class: 'mist-srv-eyebrow', text: 'SERVER' }),
        h('h2', { text: server.name }),
        h('div', { class: 'mist-srv-dash-hero-meta' },
          statusPill(server.state),
          h('span', { class: 'mist-srv-pill', text: softwareLabel(server.software) }),
          h('span', { class: 'mist-srv-pill', text: server.version }),
          h('span', { class: `mist-srv-pill ${server.visibility === 'public' ? 'is-live' : ''}`, text: server.visibility === 'public' ? 'Public' : 'Private' }))),
      h('div', { class: 'mist-srv-dash-hero-actions' },
        h('button', {
          class: `mist-srv-btn ${run ? 'is-bad' : 'is-good'}`, type: 'button',
          html: run ? `${svg('stop', 16)}<span>Stop server</span>` : `${svg('play', 16)}<span>Start server</span>`,
          onclick: (e) => toggleServer(e.currentTarget, server)
        }),
        h('button', { class: 'mist-srv-btn', type: 'button', html: `${svg('folder', 16)}<span>Open folder</span>`, onclick: () => api.openFolder(server.id).catch((e) => toast(errText(e), 'error')) }),
        h('button', { class: 'mist-srv-btn', type: 'button', html: `${svg('refresh', 16)}<span>Refresh</span>`, onclick: async () => { await refreshServers(); paint(); } })));
    const tabbar = h('nav', { class: 'mist-srv-tabbar', 'aria-label': 'Server sections' });
    for (const [key, label] of [['overview', 'Overview'], ['console', 'Console'], ['files', 'Files'], ['plugins', 'Plugins'], ['worlds', 'Worlds'], ['settings', 'Settings']]) {
      tabbar.append(h('button', { class: S.tab === key ? 'is-active' : '', type: 'button', text: label, onclick: async () => enterTab(key).then(paint) }));
    }

    dash.append(head, tabbar);
    if (S.tab === 'overview') dash.append(renderOverview(server));
    else if (S.tab === 'console') dash.append(renderConsole(server));
    else if (S.tab === 'files') dash.append(renderFiles(server));
    else if (S.tab === 'plugins') dash.append(renderPlugins(server));
    else if (S.tab === 'worlds') dash.append(renderWorlds(server));
    else dash.append(h('div', { class: 'mist-srv-form' }, serverForm(server), dangerZone(server)));
    bodyEl.append(dash);
  }

  function dangerZone(server) {
    return h('section', { class: 'mist-srv-danger' },
      h('div', {},
        h('strong', { text: 'Delete this server' }),
        h('p', { class: 'mist-srv-hint', text: 'Stops the server, removes it from Mist and moves its folder (worlds, plugins, configs) to the recycle bin.' })),
      h('button', {
        class: 'mist-srv-btn is-bad', type: 'button', html: `${svg('trash', 15)}<span>Delete server</span>`,
        onclick: async () => {
          const ok = await confirmDialog({
            title: `Delete "${server.name}"?`,
            message: 'The server will be stopped and its folder moved to the recycle bin. You can restore it from there if needed.',
            confirmLabel: 'Delete server', danger: true
          });
          if (!ok) return;
          try {
            await api.remove(server.id);
            toast('Server deleted.', 'success');
            S.serverId = null; S.view = 'list'; S.cache.clear(); S.logs.delete(server.id);
            await refreshServers();
            paint();
          } catch (e) { toast(errText(e), 'error'); }
        }
      }));
  }

  async function setVisibility(button, server, value) {
    button.disabled = true;
    try {
      await api.update(server.id, { visibility: value });
      await refreshServers();
      toast(value === 'public' ? 'Server is public. Players on your network can find it while it runs.' : 'Server is private. Only the invite code works.', 'success');
      paint();
    } catch (e) {
      toast(errText(e), 'error');
      button.disabled = false;
    }
  }

  async function toggleServer(button, server) {    if (S.busy) return;    S.busy = true;
    const wasRunning = Boolean(server.state?.running);
    button.disabled = true;
    button.innerHTML = `${svg('refresh', 16)}<span>${wasRunning ? 'Stopping…' : 'Starting…'}</span>`;
    if (!wasRunning) {
      document.querySelectorAll('.mist-srv-head .mist-srv-pill, .mist-srv-dash-title .mist-srv-pill').forEach((p) => {
        p.textContent = 'Starting';
        p.className = 'mist-srv-pill is-starting';
      });
    }
    try {
      if (wasRunning) await api.stop(server.id);
      else await api.start(server.id);
      await refreshServers();
      toast(wasRunning ? 'Server stopped.' : 'Server started. Watch the console for progress.', 'success');
      if (S.open && S.serverId === server.id) paint();
    } catch (e) {
      toast(errText(e), 'error');
    } finally {
      S.busy = false;
      button.disabled = false;
    }
  }

  function renderOverview(server) {
    const grid = h('div', { class: 'mist-srv-overview' });
    const connect = h('section', { class: 'mist-srv-panel mist-srv-connect' },
      h('div', { class: 'mist-srv-eyebrow', text: 'CONNECTION' }),
      h('h3', { text: 'Invite a friend' }),
      h('p', { class: 'muted', text: 'Share the invite code. It contains everything needed to join, so the address is never shown or typed.' }));

    const addresses = [
      ['Invite code', server.join.code, 'invite']
    ];
    for (const [label, value, kind] of addresses) {
      connect.append(h('div', { class: `mist-srv-address${kind === 'invite' ? ' mist-srv-invite' : ''}` },
        h('span', { class: 'copy' }, h('small', { text: label }), h('code', { text: value })),
        h('button', { class: 'mist-srv-btn is-small', type: 'button', html: `${svg('copy', 14)}<span>Copy</span>`, onclick: () => copyText(value, `${label} copied`) })));
    }
    connect.append(h('div', { class: 'mist-srv-note', html: `${svg('shield', 15)}<span><strong>Privacy:</strong> ${server.visibility === 'public' ? 'Public servers can be found by players on your network while they run. Your IP address and port are never displayed.' : 'IP addresses, local addresses and ports are never shown in the launcher. Friends can only join with this code.'}</span>` }));

    const isPublic = server.visibility === 'public';
    connect.append(h('div', { class: 'mist-srv-visibility' },
      h('span', { class: `mist-srv-pill ${isPublic ? 'is-live' : ''}`, text: isPublic ? 'Public' : 'Private' }),
      h('div', { class: 'mist-srv-visibility-copy' },
        h('strong', { text: isPublic ? 'Listed in Browse servers' : 'Invite code only' }),
        h('small', { text: isPublic ? 'Players on your network can find it while it runs. The invite code still works.' : 'Nobody can browse it. Share the invite code to let friends join.' })),
      h('button', {
        class: 'mist-srv-btn is-small', type: 'button',
        text: isPublic ? 'Make private' : 'Make public',
        onclick: (e) => setVisibility(e.currentTarget, server, isPublic ? 'private' : 'public')
      })));

    connect.append(h('div', { class: 'mist-srv-note', html: `${svg('users', 15)}<span><strong>${server.state?.running ? `${server.state.players ?? 0} / ${server.state.maxPlayers ?? server.maxPlayers} players online` : 'Server is stopped'}</strong>${server.state?.running ? '' : ' — press Start server before friends can join.'}</span>` }));

    const facts = h('section', { class: 'mist-srv-panel' },
      h('h3', { text: 'Server details' }),
      h('div', { class: 'mist-srv-facts' },
        fact('Software', softwareLabel(server.software)),
        fact('Version', server.version),
        fact('Memory', `${server.memoryMb} MB`),
        fact('Difficulty', server.difficulty),
        fact('Game mode', server.gamemode),
        fact('Uptime', uptime(server.state?.startedAt)),
        fact('World', server.levelName),
        fact('Visibility', server.visibility === 'public' ? 'Public' : 'Private'),
        fact('Online mode', server.onlineMode ? 'Required' : 'Offline')));
    facts.append(h('p', { class: 'mist-srv-hint', style: 'margin-top:10px', text: `MOTD: ${server.motd}` }));
    facts.append(h('div', { style: 'display:flex;gap:8px;margin-top:12px;flex-wrap:wrap' },
      h('button', { class: 'mist-srv-btn is-small', type: 'button', html: `${svg('terminal', 14)}<span>Console</span>`, onclick: () => enterTab('console').then(paint) }),
      h('button', { class: 'mist-srv-btn is-small', type: 'button', html: `${svg('gear', 14)}<span>Settings</span>`, onclick: () => enterTab('settings').then(paint) })));

    const steps = h('section', { class: 'mist-srv-panel' },
      h('h3', { text: 'How friends join' }),
      h('ol', { class: 'mist-srv-steps' },
        h('li', { text: 'Start the server and wait for “Done” in the console.' }),
        h('li', { text: 'Copy the invite code above and send it privately to your friend.' }),
        h('li', { text: 'They open Mist → Join, paste the code, choose an installation and press Launch & Join.' }),
        h('li', { text: 'For internet play, forward this port on your router or use a tunnel. Keep the code private.' })));

    grid.append(connect, facts, steps);
    return grid;
  }

  function renderConsole(server) {
    const wrap = h('div', { class: 'mist-srv-console-wrap' });
    const lines = S.logs.get(server.id) || [];
    const log = h('div', { class: 'mist-srv-console', id: 'mist-srv-console-lines', role: 'log', 'aria-live': 'polite' });
    if (!lines.length) log.append(h('span', { class: 'placeholder', text: server.state?.running ? 'Waiting for output…' : 'Start the server to see live output. Older logs load from logs/latest.log.' }));
    else for (const line of lines) log.append(logLine(line));
    wrap.append(
      h('div', { style: 'display:flex;align-items:center;gap:8px;flex-wrap:wrap' },
        h('div', { class: 'mist-srv-eyebrow', text: 'LIVE CONSOLE' }),
        h('span', { class: 'mist-srv-head-spacer' }),
        h('button', { class: 'mist-srv-btn is-small', type: 'button', html: `${svg('refresh', 14)}<span>Reload logs</span>`, onclick: async () => { S.logsLoaded.delete(server.id); await loadLogs(server.id, true); paint(); } }),
        h('button', { class: 'mist-srv-btn is-small', type: 'button', html: `${svg('trash', 14)}<span>Clear view</span>`, onclick: () => { S.logs.set(server.id, []); paint(); } })),
      log);
    const cmd = input('text', '', { placeholder: 'Enter a command (say hello, op name, whitelist add name…)', maxlength: 500 });
    cmd.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendCommand(cmd, server); });
    wrap.append(h('div', { class: 'mist-srv-console-form' }, cmd,
      h('button', {
        class: 'mist-srv-btn is-primary', type: 'button', html: `${svg('terminal', 15)}<span>Send</span>`, onclick: (e) => sendCommand(cmd, server)
      })));
    wrap.append(h('p', { class: 'mist-srv-hint', text: 'Commands match the server console exactly. Some commands require operator permissions.' }));
    return wrap;
  }

  function logLine(line) {
    let cls = 'ln';
    if (/WARN/i.test(line)) cls += ' warn';
    if (/ERROR|SEVERE|Exception|Caused by/i.test(line)) cls += ' err';
    else if (/Done \(\d+(?:\.\d+)?s\)!|joined the game/i.test(line)) cls += ' ok';
    return h('span', { class: cls, text: line });
  }

  async function sendCommand(inputEl, server) {
    const command = inputEl.value.trim();
    if (!command) return;
    if (!server.state?.running) { toast('Start the server before sending commands.', 'error'); return; }
    try { await api.send(server.id, command); inputEl.value = ''; } catch (e) { toast(errText(e), 'error'); }
  }

  function appendLogLine(id, line) {
    if (!S.open || S.serverId !== id || S.tab !== 'console') return;
    const log = document.getElementById('mist-srv-console-lines');
    if (!log) return;
    const placeholder = log.querySelector('.placeholder');
    if (placeholder) placeholder.remove();
    const stick = log.scrollTop + log.clientHeight >= log.scrollHeight - 40;
    log.append(logLine(line));
    while (log.childElementCount > 2000) log.firstElementChild.remove();
    if (stick) log.scrollTop = log.scrollHeight;
  }

  async function loadLogs(id, force = false) {
    if (!force && S.logsLoaded.has(id)) return;
    S.logsLoaded.add(id);
    try {
      const lines = await api.logs(id, 500);
      S.logs.set(id, (Array.isArray(lines) ? lines : []).slice(-2000));
    } catch { /* logs are optional */ }
  }

  // ---------------------------------------------------------------- files
  const filesKey = (server, path) => `${server.id}:files:${path ?? S.filePath}`;
  function invalidateFiles(server, path) {
    S.cache.delete(filesKey(server, path ?? S.filePath));
  }

  function renderFiles(server) {
    const wrap = h('div', { style: 'display:flex;flex-direction:column;gap:10px' });
    const key = filesKey(server, S.filePath);
    if (!S.cache.has(key) && !S.pending.has(key)) {
      S.pending.add(key);
      api.files(server.id, S.filePath)
        .then((data) => S.cache.set(key, data))
        .catch((e) => S.cache.set(key, { error: errText(e) }))
        .finally(() => { S.pending.delete(key); if (S.open && S.view === 'dashboard' && S.tab === 'files') paint(); });
    }
    const data = S.cache.get(key);
    const parts = S.filePath ? S.filePath.split('/').filter(Boolean) : [];
    const go = (path) => { S.filePath = path; paint(); };

    const bc = h('div', { class: 'mist-srv-breadcrumb' },
      h('button', { type: 'button', text: 'Server folder', onclick: () => go('') }));
    let acc = '';
    for (const p of parts) {
      acc = acc ? `${acc}/${p}` : p;
      const path = acc;
      bc.append(h('span', { text: '/' }), h('button', { type: 'button', text: p, onclick: () => go(path) }));
    }

    wrap.append(h('div', { class: 'mist-srv-files-head' },
      h('div', { class: 'mist-srv-eyebrow', text: 'SERVER FILES' }),
      h('span', { class: 'mist-srv-head-spacer' }),
      bc));

    wrap.append(h('div', { class: 'mist-srv-toolbar' },
      h('button', {
        class: 'mist-srv-btn is-small', type: 'button', html: `${svg('folderPlus', 14)}<span>New folder</span>`,
        onclick: async () => {
          const name = await promptDialog({ title: 'New folder', label: 'Folder name', confirmLabel: 'Create folder' });
          if (!name) return;
          try {
            await api.createFolder(server.id, S.filePath, name);
            invalidateFiles(server);
            paint();
            toast('Folder created.', 'success');
          } catch (e) { toast(errText(e), 'error'); }
        }
      }),
      h('button', {
        class: 'mist-srv-btn is-small', type: 'button', html: `${svg('uploadFile', 14)}<span>Upload files</span>`,
        onclick: async () => {
          try {
            const result = await api.upload(server.id, S.filePath);
            const saved = Array.isArray(result?.saved) ? result.saved.length : 0;
            if (saved) {
              invalidateFiles(server);
              paint();
              toast(`Uploaded ${saved} file${saved === 1 ? '' : 's'}.`, 'success');
            }
          } catch (e) { toast(errText(e), 'error'); }
        }
      }),
      h('button', {
        class: 'mist-srv-btn is-small', type: 'button', html: `${svg('refresh', 14)}<span>Refresh</span>`,
        onclick: () => { S.cache.delete(key); paint(); }
      }),
      h('span', { class: 'mist-srv-head-spacer' }),
      h('button', { class: 'mist-srv-btn is-small', type: 'button', html: `${svg('folder', 14)}<span>Open folder</span>`, onclick: () => api.openFolder(server.id).catch((e) => toast(errText(e), 'error')) })));

    if (!data) {
      wrap.append(h('div', { class: 'mist-srv-loading' }, h('span', { class: 'mist-srv-spin' }), h('span', { text: 'Reading folder…' })));
    } else if (data.error) {
      wrap.append(h('div', { class: 'mist-srv-note', html: `${svg('alert', 15)}<span>${data.error}</span>` }));
    } else {
      const table = h('div', { class: 'mist-srv-table' },
        h('div', { class: 'mist-srv-tr is-head' }, h('span', { text: 'Name' }), h('span', { class: 'size', text: 'Size' }), h('span', { class: 'when', text: 'Actions' })));
      if (!data.items.length) table.append(h('div', { class: 'mist-srv-tr' }, h('span', { class: 'name', text: 'This folder is empty. Upload a file or create a folder.' })));
      for (const item of data.items) {
        const childPath = S.filePath ? `${S.filePath}/${item.name}` : item.name;
        const isDir = item.type === 'dir';
        const nameCell = h('span', { class: 'name' });
        if (isDir) {
          nameCell.append(h('span', { html: svg('folder', 16) }),
            h('button', { type: 'button', text: item.name, title: 'Open folder', onclick: () => go(childPath) }));
        } else {
          nameCell.append(h('span', { html: svg('file', 16) }),
            h('button', { type: 'button', text: item.name, title: 'Edit file', onclick: () => openFileEditor(server, childPath) }));
        }
        table.append(h('div', { class: 'mist-srv-tr' },
          nameCell,
          h('span', { class: 'size', text: isDir ? '—' : fmtBytes(item.size) }),
          h('span', { class: 'ops' },
            !isDir ? h('button', {
              class: 'mist-srv-btn is-small is-ghost', type: 'button', html: svg('edit', 14), title: `Edit ${item.name}`,
              onclick: () => openFileEditor(server, childPath)
            }) : null,
            h('button', {
              class: 'mist-srv-btn is-small is-ghost', type: 'button', html: svg('save', 14), title: `Rename ${item.name}`,
              onclick: async () => {
                const name = await promptDialog({ title: `Rename "${item.name}"`, label: 'New name', value: item.name, confirmLabel: 'Rename' });
                if (!name || name === item.name) return;
                try {
                  await api.renameEntry(server.id, childPath, name);
                  invalidateFiles(server);
                  paint();
                  toast('Renamed.', 'success');
                } catch (e) { toast(errText(e), 'error'); }
              }
            }),
            h('button', {
              class: 'mist-srv-btn is-small is-bad is-ghost', type: 'button', html: svg('trash', 14), title: `Delete ${item.name}`,
              onclick: async () => {
                const ok = await confirmDialog({ title: `Delete "${item.name}"?`, message: 'This moves the item to the recycle bin. Stop the server first if it is running.', confirmLabel: 'Delete', danger: true });
                if (!ok) return;
                try {
                  await api.deleteEntry(server.id, childPath);
                  invalidateFiles(server);
                  paint();
                  toast('Deleted.', 'success');
                } catch (e) { toast(errText(e), 'error'); }
              }
            }))));
      }
      wrap.append(table);
    }
    wrap.append(h('p', { class: 'mist-srv-hint', text: 'Click a file to edit it in the launcher. server.properties and other configs are rewritten on start, so stop the server before changing them.' }));
    return wrap;
  }

  // ---------------------------------------------------------------- file editor
  async function openFileEditor(server, path) {
    let data;
    try { data = await api.readFile(server.id, path); }
    catch (e) { toast(errText(e), 'error'); return; }
    if (data.binary) { toast('That file is binary (jar, image, archive…) and cannot be edited as text.', 'error'); return; }
    if (data.truncated) { toast('That file is too large to edit in the launcher. Use an external editor.', 'error'); return; }

    const editorOverlay = h('div', { class: 'mist-srv-overlay is-dialog', style: 'z-index:2147483550' });
    const head = h('header', { class: 'mist-srv-head' },
      h('span', { class: 'mist-srv-mark', html: svg('file', 20) }),
      h('div', { class: 'mist-srv-titles' },
        h('strong', { text: path.split('/').pop() }),
        h('small', { text: path })),
      h('span', { class: 'mist-srv-head-spacer' }),
      h('span', { class: 'mist-srv-pill', text: fmtBytes(data.size) }),
      h('button', { class: 'mist-srv-x', type: 'button', title: 'Close', 'aria-label': 'Close', html: svg('x', 17), onclick: () => requestClose() }));

    const area = h('textarea', { class: 'mist-srv-editor', spellcheck: false, wrap: 'off' });
    area.value = data.content || '';
    let dirty = false;
    const status = h('span', { class: 'mist-srv-hint', text: `${(data.content || '').split('\n').length} lines · UTF-8` });
    const saveBtn = h('button', { class: 'mist-srv-btn is-primary', type: 'button', html: `${svg('save', 15)}<span>Save</span>`, onclick: () => save() });

    area.addEventListener('input', () => {
      if (dirty) return;
      dirty = true;
      status.textContent = 'Unsaved changes';
      status.classList.add('is-dirty');
    });
    area.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); save(); }
    });

    function save() {
      if (saveBtn.dataset.busy === '1') return;
      saveBtn.dataset.busy = '1';
      const old = saveBtn.innerHTML;
      saveBtn.disabled = true;
      saveBtn.innerHTML = `${svg('refresh', 15)}<span>Saving…</span>`;
      api.writeFile(server.id, path, area.value).then(() => {
        dirty = false;
        status.classList.remove('is-dirty');
        const bytes = new TextEncoder().encode(area.value).length;
        status.textContent = `Saved · ${fmtBytes(bytes)} · ${area.value.split('\n').length} lines`;
        invalidateFiles(server);
        toast('File saved.', 'success');
      }).catch((e) => {
        toast(errText(e), 'error');
      }).finally(() => {
        saveBtn.dataset.busy = '0';
        saveBtn.disabled = false;
        saveBtn.innerHTML = old;
      });
    }

    function requestClose() {
      if (!dirty) { editorOverlay.remove(); return; }
      confirmDialog({ title: 'Discard changes?', message: 'You have unsaved changes in this file.', confirmLabel: 'Discard', danger: true })
        .then((ok) => { if (ok) editorOverlay.remove(); });
    }

    const foot = h('div', { class: 'mist-srv-editor-foot' },
      status,
      h('span', { class: 'mist-srv-head-spacer' }),
      h('span', { class: 'mist-srv-hint', text: 'Ctrl+S to save' }),
      h('button', { class: 'mist-srv-btn', type: 'button', text: 'Close', onclick: () => requestClose() }),
      saveBtn);

    const box = h('div', { class: 'mist-srv-shell mist-srv-editor-shell' },
      head,
      h('div', { class: 'mist-srv-editor-body' }, area),
      foot);
    editorOverlay.append(box);
    document.body.append(editorOverlay);
    area.focus();
    area.setSelectionRange(0, 0);
  }

  // ---------------------------------------------------------------- plugins
  function renderPatchBukkitCard(server) {
    const key = `${server.id}:patchbukkit`;
    const status = S.cache.get(key);
    const panel = h('section', { class: 'mist-srv-panel mist-srv-pb' });
    panel.append(h('div', { class: 'mist-srv-files-head' },
      h('div', { class: 'mist-srv-eyebrow', text: 'PATCHBUKKIT BRIDGE' }),
      h('span', { class: 'mist-srv-head-spacer' }),
      h('button', {
        class: 'mist-srv-btn is-small is-ghost', type: 'button', html: `${svg('refresh', 14)}<span>Re-check</span>`,
        onclick: () => { S.cache.delete(key); loadPatchBukkit(server); paint(); }
      })));
    panel.append(h('p', { class: 'muted', text: 'PatchBukkit runs Bukkit, Spigot and Paper .jar plugins on Pumpkin (Rust) through an embedded Java runtime. It is experimental — only a few plugins work today.' }));

    if (!status) {
      panel.append(h('div', { class: 'mist-srv-loading' }, h('span', { class: 'mist-srv-spin' }), h('span', { text: 'Checking PatchBukkit…' })));
      return panel;
    }
    if (status.error) {
      panel.append(h('div', { class: 'mist-srv-note', html: `${svg('alert', 15)}<span>${status.error}</span>` }));
      return panel;
    }

    const row = (label, ok, detail) => h('div', { class: 'mist-srv-pb-row' },
      h('span', { class: `mist-srv-pb-dot${ok ? ' is-ok' : ' is-bad'}` }),
      h('span', { class: 'mist-srv-pb-label', text: label }),
      h('span', { class: 'mist-srv-pb-detail', text: detail || '' }));
    panel.append(h('div', { class: 'mist-srv-pb-rows' },
      row('Native library', status.nativeInstalled, status.nativeInstalled ? status.nativeName : 'not installed in plugins/'),
      row('Java 25+ runtime', status.javaOk, status.javaVersion || 'java not found on PATH')));

    const actions = h('div', { class: 'mist-srv-pb-actions' });
    if (!status.nativeInstalled) {
      actions.append(h('button', {
        class: 'mist-srv-btn is-primary is-small', type: 'button', html: `${svg('download', 14)}<span>Install PatchBukkit</span>`,
        onclick: async (e) => {
          const btn = e.currentTarget;
          if (btn.dataset.busy === '1') return;
          btn.dataset.busy = '1'; btn.disabled = true;
          const old = btn.innerHTML; btn.innerHTML = `${svg('refresh', 14)}<span>Installing…</span>`;
          try {
            const r = await api.patchbukkitInstall(server.id);
            S.cache.delete(key); await loadPatchBukkit(server);
            toast(`Installed ${r?.name || 'PatchBukkit'}. Restart the server, then add .jar plugins.`, 'success');
          } catch (err) {
            toast(errText(err), 'error');
            btn.dataset.busy = '0'; btn.disabled = false; btn.innerHTML = old;
          }
        }
      }));
    }
    actions.append(h('button', {
      class: 'mist-srv-btn is-small', type: 'button', html: `${svg('folder', 14)}<span>Open server folder</span>`,
      onclick: () => api.openFolder(server.id).catch((e) => toast(errText(e), 'error'))
    }));
    panel.append(actions);

    if (!status.javaOk) {
      panel.append(h('div', { class: 'mist-srv-note is-warn', html: `${svg('alert', 15)}<span>PatchBukkit needs <strong>Java 25+</strong>. Install it from <strong>adoptium.net</strong> and restart the launcher so it appears on PATH.</span>` }));
    }
    return panel;
  }

  async function loadPatchBukkit(server) {
    const key = `${server.id}:patchbukkit`;
    if (S.pending.has(key)) return;
    S.pending.add(key);
    try { S.cache.set(key, await api.patchbukkitStatus(server.id)); }
    catch (e) { S.cache.set(key, { error: errText(e) }); }
    finally { S.pending.delete(key); if (S.open && S.tab === 'plugins') paint(); }
  }

  function renderPlugins(server) {
    const wrap = h('div', { class: 'mist-srv-plugins' });
    const key = `${server.id}:plugins`;
    const installed = S.cache.get(key);
    const info = softwareInfo(server.software);
    const isMod = Boolean(info.mods);
    const isBukkit = Boolean(info.patchbukkit);
    const canContent = Boolean(info.plugins || isMod || isBukkit);
    const noun = isMod ? 'mods' : 'plugins';

    wrap.append(h('div', { class: 'mist-srv-files-head' },
      h('div', { class: 'mist-srv-eyebrow', text: isMod ? 'MODS' : 'PLUGINS' }),
      h('span', { class: 'mist-srv-head-spacer' }),
      h('button', { class: 'mist-srv-btn is-small', type: 'button', html: `${svg('refresh', 14)}<span>Refresh</span>`, onclick: async () => { S.cache.delete(key); await loadPlugins(); } }),
      h('button', { class: 'mist-srv-btn is-small', type: 'button', html: `${svg('folder', 14)}<span>Open folder</span>`, onclick: () => api.openFolder(server.id).catch((e) => toast(errText(e), 'error')) }),
      h('button', {
        class: 'mist-srv-btn is-small', type: 'button', html: `${svg('uploadFile', 14)}<span>Install from file…</span>`,
        onclick: async () => {
          try { await api.addPlugin(server.id); S.cache.delete(key); paint(); toast(`${isMod ? 'Mod' : 'Plugin'} added.`, 'success'); }
          catch (e) { toast(errText(e), 'error'); }
        }
      })));

    if (isBukkit) {
      wrap.append(renderPatchBukkitCard(server));
    } else if (!canContent) {
      wrap.append(h('div', { class: 'mist-srv-note is-warn', html: `${svg('alert', 15)}<span><strong>${info.label} cannot run plugins.</strong> It loads native <code>.wasm</code> plugins only — use <strong>Install from file…</strong>.</span>` }));
    }

    const installedPanel = h('section', { class: 'mist-srv-panel mist-srv-plugin-installed' },
      h('h3', { text: isMod ? 'Installed mods' : 'Installed plugins' }));
    if (!installed) {
      installedPanel.append(h('div', { class: 'mist-srv-loading' }, h('span', { class: 'mist-srv-spin' }), h('span', { text: 'Reading plugins…' })));
    } else if (installed.error) {
      installedPanel.append(h('div', { class: 'mist-srv-note', html: `${svg('alert', 15)}<span>${installed.error}</span>` }));
    } else if (!installed.length) {
      installedPanel.append(h('p', { class: 'muted', text: canContent ? `No ${noun} installed yet. Pick one from the library below, or install a file from your PC.` : 'No native plugins yet. Pumpkin loads WebAssembly (.wasm) plugins — add one with “Install from file…”.' }));
    } else {
      const table = h('div', { class: 'mist-srv-table' },
        h('div', { class: 'mist-srv-tr is-head' }, h('span', { text: isMod ? 'Mod' : 'Plugin' }), h('span', { class: 'size', text: 'Type' }), h('span', { class: 'when', text: 'Actions' })));
      for (const plugin of installed) {
        table.append(h('div', { class: 'mist-srv-tr' },
          h('span', { class: 'name' }, h('span', { html: svg('puzzle', 16) }), h('span', { text: plugin.name })),
          h('span', { class: 'size', text: String(plugin.type || 'jar').toUpperCase() }),
          h('span', { class: 'ops' }, h('button', {
            class: 'mist-srv-btn is-small is-bad is-ghost', type: 'button', html: svg('trash', 14), title: `Remove ${plugin.name}`,
            onclick: async () => {
              const ok = await confirmDialog({ title: `Remove ${plugin.name}?`, message: 'The plugin file is moved to the recycle bin. Restart the server to unload it.', confirmLabel: 'Remove', danger: true });
              if (!ok) return;
              try { await api.removePlugin(server.id, plugin.name); S.cache.delete(key); paint(); toast('Plugin removed.', 'success'); }
              catch (e) { toast(errText(e), 'error'); }
            }
          }))));
      }
      installedPanel.append(table);
    }
    wrap.append(installedPanel);

    // overview hero (modpack-style)
    wrap.append(h('div', { class: 'mist-srv-lib-hero' },
      h('div', { class: 'mist-srv-lib-hero-copy' },
        h('span', { class: 'mist-srv-eyebrow', text: info.mods ? 'MOD LIBRARY' : 'PLUGIN LIBRARY' }),
        h('h2', { text: info.mods ? 'Mods that change the game' : 'Extend your server' }),
        h('p', { text: info.mods
          ? `One-click installs from Modrinth for ${info.label} on Minecraft ${server.version}. Files land in the server’s mods folder.`
          : `One-click installs from Modrinth for ${info.label} on Minecraft ${server.version}. Files land in the server’s plugins folder.` })),
      h('div', { class: 'mist-srv-lib-hero-art', html: svg(info.mods ? 'puzzle' : 'puzzle', 46) })));

    // library
    const lib = h('section', { class: 'mist-srv-panel mist-srv-plugin-lib' },
      h('p', { class: 'muted', text: `Searches Modrinth for ${noun} that support ${info.label} on Minecraft ${server.version}. Files land in the server’s ${noun} folder.` }));

    const searchInput = input('text', S.pluginQuery, { placeholder: isMod ? 'Search mods — Sodium, Lithium, Create…' : 'Search plugins — EssentialsX, LuckPerms, WorldEdit…', maxlength: 80 });
    searchInput.addEventListener('input', () => { S.pluginQuery = searchInput.value; });
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); S.pluginQuery = searchInput.value; runPluginSearch(server); } });
    const searchBtn = h('button', {
      class: 'mist-srv-btn is-primary is-small', type: 'button', html: `${svg('search', 14)}<span>Search</span>`,
      onclick: () => { S.pluginQuery = searchInput.value; runPluginSearch(server); }
    });
    lib.append(h('div', { class: 'mist-srv-plugin-search' }, searchInput, searchBtn));

    const categories = [['all', 'All'], ['administration', 'Admin'], ['economy', 'Economy'], ['chat', 'Chat'], ['world', 'World'], ['gameplay', 'Gameplay'], ['utility', 'Utility'], ['library', 'Library'], ['optimization', 'Optimization']];
    const chips = h('div', { class: 'mist-srv-chips' });
    for (const [id, label] of categories) {
      chips.append(h('button', {
        class: `mist-srv-chip${S.pluginCategory === id ? ' is-active' : ''}`, type: 'button', text: label,
        onclick: () => { S.pluginCategory = id; runPluginSearch(server); }
      }));
    }
    const sortSelect = selectOf([['downloads', 'Most downloaded'], ['newest', 'Newest'], ['updated', 'Recently updated'], ['relevance', 'Relevance']], S.pluginSort, 'pluginSort');
    sortSelect.addEventListener('change', () => { S.pluginSort = sortSelect.value; runPluginSearch(server); });
    lib.append(h('div', { class: 'mist-srv-plugin-filters' }, chips, h('div', { class: 'mist-srv-plugin-sort' }, h('span', { text: 'Sort' }), sortSelect)));

    if (!canContent) {
      lib.append(h('p', { class: 'mist-srv-hint', text: isBukkit ? 'Enable PatchBukkit above to browse Bukkit plugins.' : 'This software does not load plugins or mods. Pumpkin runs native .wasm plugins instead.' }));
    } else if (S.pluginState === 'loading') {
      lib.append(h('div', { class: 'mist-srv-loading' }, h('span', { class: 'mist-srv-spin' }), h('span', { text: 'Searching Modrinth…' })));
    } else if (S.pluginResults?.error) {
      lib.append(h('div', { class: 'mist-srv-note', html: `${svg('alert', 15)}<span>${S.pluginResults.error}</span>` }));
    } else if (!S.pluginResults) {
      lib.append(h('p', { class: 'mist-srv-hint', text: 'Search for a plugin by name, or press Search with an empty box to list popular plugins.' }));
    } else if (!S.pluginResults.hits?.length) {
      lib.append(h('p', { class: 'mist-srv-hint', text: 'No compatible plugins found. Try a different name, or check that the plugin supports this Minecraft version.' }));
    } else {
      const grid = h('div', { class: 'mist-srv-plugin-grid' });
      for (const hit of S.pluginResults.hits) {
        const installBtn = h('button', {
          class: 'mist-srv-btn is-primary is-small', type: 'button', html: `${svg('download', 14)}<span>Install</span>`,
          onclick: (e) => installProject(server, hit, e.currentTarget)
        });
        const iconEl = hit.iconUrl
          ? h('img', { class: 'mist-srv-plugin-icon', src: hit.iconUrl, alt: '', onerror: (e) => { e.currentTarget.replaceWith(h('span', { class: 'mist-srv-plugin-icon is-empty', html: svg('puzzle', 20) })); } })
          : h('span', { class: 'mist-srv-plugin-icon is-empty', html: svg('puzzle', 20) });
        grid.append(h('article', { class: 'mist-srv-plugin-card', onclick: () => openPluginDetails(server, hit) },
          iconEl,
          h('div', { class: 'mist-srv-plugin-copy' },
            h('strong', { text: hit.title }),
            h('small', { class: 'mist-srv-plugin-author', text: hit.author || 'unknown' }),
            h('small', { class: 'mist-srv-plugin-desc', text: hit.description || '' }),
            h('div', { class: 'mist-srv-plugin-meta' },
              h('span', { class: 'mist-srv-plugin-dl', html: `${svg('download', 12)}<span>${compactNum(hit.downloads)}</span>` }),
              ...(hit.categories || []).slice(0, 2).map((c) => h('span', { class: 'mist-srv-plugin-tag', text: c })))),
          h('button', {
            class: 'mist-srv-btn is-primary is-small', type: 'button', html: `${svg('download', 14)}<span>Install</span>`,
            onclick: (e) => { e.stopPropagation(); installProject(server, hit, e.currentTarget); }
          })));
      }
      lib.append(grid);
      if ((S.pluginResults.hits.length || 0) < (S.pluginResults.total || 0)) {
        lib.append(h('div', { class: 'mist-srv-plugin-more' },
          h('button', {
            class: 'mist-srv-btn', type: 'button', html: `${svg('download', 14)}<span>Load more</span>`,
            onclick: () => runPluginSearch(server, true)
          }),
          h('span', { class: 'mist-srv-hint', text: `Showing ${S.pluginResults.hits.length} of ${S.pluginResults.total.toLocaleString()}` })));
      }
    }
    wrap.append(lib);
    wrap.append(h('p', { class: 'mist-srv-hint', text: 'Restart the server after installing or removing plugins. Some plugins need extra configuration files in the plugins folder.' }));
    return wrap;
  }

  async function runPluginSearch(server, append = false) {
    if (S.pluginState === 'loading') return;
    S.pluginState = 'loading';
    if (!append) { S.pluginResults = null; S.pluginOffset = 0; }
    paint();
    try {
      const offset = append ? (S.pluginOffset || 0) : 0;
      const info = softwareInfo(server.software);
      const result = await api.pluginSearch({
        query: S.pluginQuery,
        version: server.version,
        limit: 24,
        offset,
        index: S.pluginSort,
        kind: info.mods ? 'mod' : 'plugin',
        loader: info.mods ? server.software : '',
        categories: S.pluginCategory === 'all' ? [] : [S.pluginCategory]
      });
      if (append && S.pluginResults?.hits) {
        S.pluginResults.hits = S.pluginResults.hits.concat(result.hits || []);
        S.pluginResults.total = result.total;
        S.pluginResults.offset = result.offset;
      } else {
        S.pluginResults = result;
      }
      S.pluginOffset = (S.pluginResults.offset || 0) + (S.pluginResults.hits?.length || 0);
    } catch (e) {
      S.pluginResults = { error: errText(e), hits: [] };
    }
    S.pluginState = 'ready';
    if (S.open && S.tab === 'plugins') paint();
  }

  async function openPluginDetails(server, hit) {
    const info = softwareInfo(server.software);
    const noun = info.mods ? 'mod' : 'plugin';
    const overlay = h('div', { class: 'mist-srv-overlay', style: 'z-index:2147483550' });
    const page = h('div', { class: 'mist-srv-detail', role: 'dialog', 'aria-label': hit.title });
    const close = () => { document.removeEventListener('keydown', onKey, true); overlay.remove(); };
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
    const bar = h('div', { class: 'mist-srv-detail-bar' },
      h('button', { class: 'mist-srv-icon-btn', type: 'button', title: 'Back', 'aria-label': 'Back', html: svg('back', 18), onclick: close }),
      h('span', { class: 'mist-srv-crumb', text: info.mods ? 'Mods' : 'Plugins' }),
      h('span', { class: 'mist-srv-crumb-sep', text: '›' }),
      h('span', { class: 'mist-srv-crumb is-current', text: hit.title }),
      h('span', { class: 'mist-srv-head-spacer' }),
      h('button', { class: 'mist-srv-icon-btn', type: 'button', title: 'Close', 'aria-label': 'Close', html: svg('x', 18), onclick: close }));
    const scroll = h('div', { class: 'mist-srv-detail-scroll' });
    const loading = h('div', { class: 'mist-srv-loading', style: 'padding:80px 0' }, h('span', { class: 'mist-srv-spin' }), h('span', { text: `Loading ${noun} details…` }));
    scroll.append(loading);
    page.append(bar, scroll);
    overlay.append(page);
    document.body.append(overlay);
    document.documentElement.classList.add('mist-srv-lock');
    document.addEventListener('keydown', onKey, true);

    let details;
    try { details = await api.pluginDetails(server.id, hit.id); }
    catch (e) {
      loading.remove();
      scroll.append(h('div', { class: 'mist-srv-note', style: 'margin:26px', html: `${svg('alert', 15)}<span>${errText(e)}</span>` }));
      return;
    }
    loading.remove();

    // ---- version picker
    const allVersions = details.versionList || [];
    const wantedLoaders = info.mods
      ? [String(server.software), "fabric", "forge", "neoforge", "quilt"]
      : ["paper", "purpur", "spigot", "bukkit"];
    const loaderOk = (v) => !v.loaders?.length || v.loaders.some((l) => wantedLoaders.includes(String(l).toLowerCase()));
    const compatible = allVersions.filter((v) => loaderOk(v) && (!v.gameVersions.length || v.gameVersions.includes(server.version)));
    const pickable = (compatible.length ? compatible : allVersions).slice(0, 60);
    const versionSelect = h('select', { class: 'mist-srv-select', 'aria-label': 'Version' });
    if (pickable.length) {
      for (const v of pickable) {
        const mc = v.gameVersions.length ? ` · MC ${v.gameVersions[v.gameVersions.length - 1]}` : '';
        versionSelect.append(h('option', { value: v.id, text: `${v.name || v.number}${mc}` }));
      }
    } else {
      versionSelect.append(h('option', { value: '', text: 'Latest compatible' }));
    }
    const compatibilityNote = compatible.length || !allVersions.length ? null : `No build lists Minecraft ${server.version}; installing the newest build anyway.`;

    const installBtn = h('button', {
      class: 'mist-srv-btn is-primary', type: 'button', html: `${svg('download', 15)}<span>Install</span>`
    });
    installBtn.addEventListener('click', async () => {
      if (installBtn.dataset.busy === '1') return;
      installBtn.dataset.busy = '1'; installBtn.disabled = true;
      installBtn.innerHTML = `${svg('refresh', 15)}<span>Installing…</span>`;
      try {
        const result = await api.pluginInstall(server.id, details.id || hit.id, versionSelect.value || undefined);
        S.cache.delete(`${server.id}:plugins`);
        installBtn.innerHTML = `${svg('check', 15)}<span>Installed</span>`;
        toast(`Installed ${result?.name || details.title}. Restart the server to load it.`, 'success');
        if (S.open && S.tab === 'plugins') paint();
      } catch (e) {
        toast(errText(e), 'error');
        installBtn.disabled = false; installBtn.dataset.busy = '0';
        installBtn.innerHTML = `${svg('download', 15)}<span>Install</span>`;
      }
    });

    const iconEl = details.iconUrl
      ? h('img', { class: 'mist-srv-detail-art', src: details.iconUrl, alt: '', loading: 'lazy', onerror: (e) => e.currentTarget.replaceWith(h('span', { class: 'mist-srv-detail-art is-empty', html: svg('puzzle', 48) })) })
      : h('span', { class: 'mist-srv-detail-art is-empty', html: svg('puzzle', 48) });

    const tags = h('div', { class: 'mist-srv-detail-tags' },
      h('span', { class: 'mist-srv-dtag is-solid', text: details.projectType === 'mod' || info.mods ? 'Mod' : 'Plugin' }),
      h('span', { class: 'mist-srv-dtag', text: 'Modrinth' }),
      ...(details.loaders || []).slice(0, 3).map((l) => h('span', { class: 'mist-srv-dtag', text: l[0].toUpperCase() + l.slice(1) })));

    const stat = (icon, text) => h('span', { class: 'mist-srv-dstat', html: `${svg(icon, 14)}<span>${text}</span>` });
    const statRow = h('div', { class: 'mist-srv-dstats' },
      stat('download', `${compactNum(details.downloads)} installs`),
      stat('users', `${compactNum(details.followers)} followers`),
      stat('clock', `${agoLabel(details.updated)}`),
      stat('world', `${details.versions || 0} versions`),
      details.gameVersions?.length ? stat('gamepad', `${details.gameVersions[details.gameVersions.length - 1]} – ${details.gameVersions[0]}`) : null);

    const hero = h('section', { class: 'mist-srv-detail-hero' },
      iconEl,
      h('div', { class: 'mist-srv-detail-herocopy' },
        tags,
        h('h1', { text: details.title }),
        h('div', { class: 'mist-srv-detail-byline', html: `by <b>${escapeHtml(details.author || hit.author || 'unknown')}</b>` }),
        statRow,
        h('p', { class: 'mist-srv-detail-desc', text: details.description || '' }),
        h('div', { class: 'mist-srv-detail-actions' },
          h('label', { class: 'mist-srv-detail-version' },
            h('span', { class: 'mist-srv-detail-version-label', text: 'VERSION' }),
            versionSelect),
          installBtn,
          details.slug ? h('a', { class: 'mist-srv-btn is-ghost', href: `https://modrinth.com/${details.projectType || noun}/${details.slug}`, target: '_blank', rel: 'noopener', html: `${svg('link', 15)}<span>Project page</span>` }) : null),
        compatibilityNote ? h('p', { class: 'mist-srv-hint', text: compatibilityNote }) : null));

    // ---- tabs
    const tabNames = [['overview', 'Overview'], ['gallery', 'Gallery'], ['versions', 'Versions']];
    const tabRow = h('nav', { class: 'mist-srv-detail-tabs' });
    const panes = {};
    const setTab = (name) => {
      for (const [key, el] of Object.entries(panes)) el.hidden = key !== name;
      tabRow.querySelectorAll('button').forEach((b) => b.classList.toggle('is-active', b.dataset.tab === name));
    };
    for (const [id, label] of tabNames) {
      const b = h('button', { class: `mist-srv-detail-tab${id === 'overview' ? ' is-active' : ''}`, type: 'button', text: label, dataset: { tab: id }, onclick: () => setTab(id) });
      tabRow.append(b);
    }

    const about = h('section', { class: 'mist-srv-detail-about' }, h('h2', { text: 'About' }));
    const bodyHtml = renderBodyHtml(String(details.body || details.description || '').trim());
    about.append(h('div', { class: 'mist-srv-detail-body', html: bodyHtml || '<p>No description provided.</p>' }));

    const galleryGrid = h('div', { class: 'mist-srv-detail-gallery' });
    for (const g of (details.gallery || []).slice(0, 12)) {
      galleryGrid.append(h('a', { href: g.url, target: '_blank', rel: 'noopener', class: 'mist-srv-detail-shot' },
        h('img', { src: g.url, alt: g.title || details.title, loading: 'lazy' }),
        g.title ? h('span', { text: g.title }) : null));
    }

    const versionRows = h('div', { class: 'mist-srv-detail-versions' });
    if (!allVersions.length) versionRows.append(h('p', { class: 'muted', text: 'No versions published for this project.' }));
    for (const v of allVersions.slice(0, 40)) {
      const canUse = loaderOk(v) && (!v.gameVersions.length || v.gameVersions.includes(server.version));
      versionRows.append(h('div', { class: 'mist-srv-detail-vrow' },
        h('div', { class: 'mist-srv-detail-vmain' },
          h('strong', { text: v.name || v.number }),
          h('small', { text: `${(v.gameVersions || []).slice(-3).join(', ')}${v.loaders?.length ? ` · ${v.loaders.join(', ')}` : ''}` })),
        h('span', { class: `mist-srv-vtag${canUse ? ' is-ok' : ''}`, text: fmtDate(v.date) }),
        h('button', {
          class: 'mist-srv-btn is-small', type: 'button', html: `${svg('download', 13)}<span>Install</span>`, disabled: !canUse,
          onclick: async (e) => {
            const b = e.currentTarget;
            b.disabled = true; b.innerHTML = `${svg('refresh', 13)}<span>Installing…</span>`;
            try {
              const r = await api.pluginInstall(server.id, details.id || hit.id, v.id);
              S.cache.delete(`${server.id}:plugins`);
              b.innerHTML = `${svg('check', 13)}<span>Done</span>`;
              toast(`Installed ${r?.name || details.title}. Restart the server to load it.`, 'success');
              if (S.open && S.tab === 'plugins') paint();
            } catch (err) { toast(errText(err), 'error'); b.disabled = false; b.innerHTML = `${svg('download', 13)}<span>Install</span>`; }
          }
        })));
    }

    panes.overview = h('div', { class: 'mist-srv-detail-pane' }, about, galleryGrid.children.length ? h('section', { class: 'mist-srv-detail-about' }, h('h2', { text: 'Gallery' }), galleryGrid) : null);
    panes.gallery = h('div', { class: 'mist-srv-detail-pane' }, galleryGrid.children.length ? galleryGrid : h('p', { class: 'muted', text: 'No gallery images.' }));
    panes.versions = h('div', { class: 'mist-srv-detail-pane' }, versionRows);

    // ---- sidebar
    const chipRow = h('div', { class: 'mist-srv-detail-chips' });
    for (const c of [...(details.categories || []), ...(details.additionalCategories || [])].slice(0, 8)) chipRow.append(h('span', { class: 'mist-srv-dtag', text: c }));

    const envLabel = (c, s) => {
      if (c === 'required' || s === 'required') return 'Client & server';
      if (s === 'unsupported' && c !== 'unsupported') return 'Client only';
      if (c === 'unsupported' && s !== 'unsupported') return 'Server only';
      return 'Client & server';
    };
    const dl = h('dl', { class: 'mist-srv-detail-dl' });
    const dlRow = (k, v) => { if (v == null || v === '') return; dl.append(h('dt', { text: k }), h('dd', { text: String(v) })); };
    dlRow('Downloads', compactNum(details.downloads));
    dlRow('Followers', compactNum(details.followers));
    dlRow('Published', fmtDate(details.published));
    dlRow('Updated', fmtDate(details.updated));
    dlRow('Versions', details.versions || 0);
    dlRow('Minecraft', (details.gameVersions || []).slice(-4).join(', '));
    dlRow('Loaders', (details.loaders || []).map((l) => l[0].toUpperCase() + l.slice(1)).join(', '));
    dlRow('License', details.licenseName || details.license);
    dlRow('Environment', envLabel(details.clientSide, details.serverSide));
    dlRow('Source', 'Modrinth');

    const sideLinks = h('div', { class: 'mist-srv-detail-links' });
    if (details.slug) sideLinks.append(h('a', { class: 'mist-srv-btn is-small', href: `https://modrinth.com/${details.projectType || noun}/${details.slug}`, target: '_blank', rel: 'noopener', html: `${svg('link', 13)}<span>Project page</span>` }));
    if (details.issuesUrl) sideLinks.append(h('a', { class: 'mist-srv-btn is-small', href: details.issuesUrl, target: '_blank', rel: 'noopener', html: `${svg('alert', 13)}<span>Report issues</span>` }));
    if (details.sourceUrl) sideLinks.append(h('a', { class: 'mist-srv-btn is-small', href: details.sourceUrl, target: '_blank', rel: 'noopener', html: `${svg('file', 13)}<span>Source</span>` }));

    const side = h('aside', { class: 'mist-srv-detail-side' },
      h('div', { class: 'mist-srv-panel mist-srv-detail-sidecard' },
        h('h3', { class: 'mist-srv-detail-sidehead', html: `${svg('info', 15)}<span>Information</span>` }),
        h('div', { class: 'mist-srv-detail-author' },
          details.iconUrl ? h('img', { class: 'mist-srv-detail-author-art', src: details.iconUrl, alt: '' }) : h('span', { class: 'mist-srv-detail-author-art is-empty', html: svg('puzzle', 18) }),
          h('div', {}, h('small', { text: 'Created by' }), h('strong', { text: details.author || hit.author || 'unknown' }))),
        chipRow.children.length ? chipRow : null,
        dl,
        sideLinks.children.length ? sideLinks : null));

    scroll.append(hero, tabRow, h('div', { class: 'mist-srv-detail-cols' },
      h('main', { class: 'mist-srv-detail-main' }, panes.overview, panes.gallery, panes.versions),
      side));
    panes.gallery.hidden = true;
    panes.versions.hidden = true;
  }

  function renderBodyHtml(raw) {
    const text = normalizeBody(raw || '');
    const html = markdownToHtml(text);
    return html || '';
  }
  function normalizeBody(raw) {
    let s = String(raw);
    s = s.replace(/<br\s*\/?>/gi, '\n');
    s = s.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n');
    s = s.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n');
    s = s.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n');
    s = s.replace(/<h[4-6][^>]*>([\s\S]*?)<\/h[4-6]>/gi, '\n#### $1\n');
    s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1');
    s = s.replace(/<\/(ul|ol)>/gi, '\n');
    s = s.replace(/<(p|div|section)[^>]*>/gi, '\n\n');
    s = s.replace(/<\/(p|div|section)>/gi, '\n\n');
    s = s.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
    s = s.replace(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, '\n![$2]($1)\n');
    s = s.replace(/<img[^>]*src=["']([^"']*)["'][^>]*>/gi, '\n![]($1)\n');
    s = s.replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, '**$2**');
    s = s.replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, '*$2*');
    s = s.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');
    s = s.replace(/<hr[^>]*>/gi, '\n---\n');
    s = s.replace(/<[^>]+>/g, '');
    return s
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;/g, "'")
      .replace(/&amp;/g, '&');
  }
  function mdInline(escaped) {
    return escaped
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" loading="lazy">')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>')
      .replace(/(^|[\s(])_([^_\n]+)_/g, '$1<em>$2</em>');
  }
  function markdownToHtml(src) {
    const lines = String(src).replace(/\r\n?/g, '\n').split('\n');
    const out = [];
    let list = null;
    let para = [];
    let code = null;
    const flushPara = () => {
      if (para.length) { out.push(`<p>${mdInline(escapeHtml(para.join(' ')))}</p>`); para = []; }
    };
    const flushList = () => {
      if (list) { out.push(`<${list.tag}>${list.items.map((i) => `<li>${mdInline(escapeHtml(i))}</li>`).join('')}</${list.tag}>`); list = null; }
    };
    for (const rawLine of lines) {
      const line = rawLine.replace(/\s+$/, '');
      const fence = line.match(/^```[\w-]*\s*$/);
      if (code !== null) {
        if (fence) { out.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`); code = null; }
        else code.push(rawLine);
        continue;
      }
      if (fence) { flushPara(); flushList(); code = []; continue; }
      if (!line.trim()) { flushPara(); flushList(); continue; }
      const h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) { flushPara(); flushList(); const lvl = Math.min(6, h[1].length + 1); out.push(`<h${lvl}>${mdInline(escapeHtml(h[2]))}</h${lvl}>`); continue; }
      if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) { flushPara(); flushList(); out.push('<hr>'); continue; }
      const q = line.match(/^\s*>\s?(.*)$/);
      if (q) { flushPara(); flushList(); out.push(`<blockquote>${mdInline(escapeHtml(q[1]))}</blockquote>`); continue; }
      const ul = line.match(/^\s*[-*+]\s+(.*)$/);
      const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
      if (ul || ol) {
        flushPara();
        const tag = ul ? 'ul' : 'ol';
        if (!list || list.tag !== tag) { flushList(); list = { tag, items: [] }; }
        list.items.push((ul || ol)[1]);
        continue;
      }
      flushList();
      para.push(line);
    }
    if (code !== null) out.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
    flushPara();
    flushList();
    return out.join('\n');
  }
  function compactNum(n) {
    const v = Number(n) || 0;
    if (v >= 1e9) return `${(v / 1e9).toFixed(1).replace(/\.0$/, '')}B`;
    if (v >= 1e6) return `${(v / 1e6).toFixed(1).replace(/\.0$/, '')}M`;
    if (v >= 1e3) return `${(v / 1e3).toFixed(1).replace(/\.0$/, '')}K`;
    return String(v);
  }
  function fmtDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }
  function agoLabel(iso) {
    if (!iso) return 'unknown';
    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return 'unknown';
    const diff = Date.now() - then;
    const day = 864e5;
    if (diff < 36e5) return 'just now';
    if (diff < day) return `${Math.round(diff / 36e5)}h ago`;
    if (diff < day * 30) return `${Math.round(diff / day)} days ago`;
    if (diff < day * 365) return `${Math.round(diff / (day * 30))} months ago`;
    return `${Math.round(diff / (day * 365))} years ago`;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function simpleMarkdown(text) {
    const escaped = String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    return escaped
      .replace(/^### (.*)$/gm, '<h4>$1</h4>')
      .replace(/^## (.*)$/gm, '<h3>$1</h3>')
      .replace(/^# (.*)$/gm, '<h2>$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\n{2,}/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  }

  async function installProject(server, hit, button) {
    if (button.dataset.busy === '1') return;
    button.dataset.busy = '1';
    button.disabled = true;
    const old = button.innerHTML;
    button.innerHTML = `${svg('refresh', 14)}<span>Installing…</span>`;
    try {
      const result = await api.pluginInstall(server.id, hit.id);
      S.cache.delete(`${server.id}:plugins`);
      toast(`Installed ${result?.name || hit.title}. Restart the server to load it.`, 'success');
      if (S.open && S.tab === 'plugins') paint();
    } catch (e) {
      toast(errText(e), 'error');
      button.dataset.busy = '0';
      button.disabled = false;
      button.innerHTML = old;
    }
  }

  // ---------------------------------------------------------------- worlds
  function renderWorlds(server) {
    const wrap = h('div', { style: 'display:flex;flex-direction:column;gap:10px' });
    const key = `${server.id}:worlds`;
    const data = S.cache.get(key);
    wrap.append(h('div', { class: 'mist-srv-files-head' },
      h('div', { class: 'mist-srv-eyebrow', text: 'WORLDS' }),
      h('span', { class: 'mist-srv-head-spacer' }),
      h('button', { class: 'mist-srv-btn is-small', type: 'button', html: `${svg('refresh', 14)}<span>Refresh</span>`, onclick: async () => { S.cache.delete(key); await loadWorlds(); paint(); } })));
    if (!data) wrap.append(h('div', { class: 'mist-srv-loading' }, h('span', { class: 'mist-srv-spin' }), h('span', { text: 'Reading worlds…' })));
    else if (data.error) wrap.append(h('div', { class: 'mist-srv-note', html: `${svg('alert', 15)}<span>${data.error}</span>` }));
    else if (!data.length) wrap.append(h('div', { class: 'mist-srv-panel' }, h('h3', { text: 'No worlds yet' }), h('p', { class: 'muted', text: 'Start the server to generate the default world. You can also copy a world folder into the server directory.' })));
    else {
      for (const world of data) {
        const isDefault = world.name === server.levelName;
        wrap.append(h('div', { class: 'mist-srv-panel', style: 'display:flex;align-items:center;gap:12px;flex-wrap:wrap' },
          h('span', { class: 'mist-srv-row-ico', html: svg('world', 18) }),
          h('div', { style: 'display:flex;flex-direction:column;gap:3px;min-width:0' },
            h('strong', { text: world.name, style: 'font-size:13px' }),
            h('small', { class: 'mist-srv-hint', text: `${fmtBytes(world.size)} · modified ${new Date(world.mtime).toLocaleDateString()}` })),
          isDefault ? h('span', { class: 'mist-srv-pill is-live', text: 'Default' }) : null,
          h('span', { class: 'mist-srv-head-spacer' }),
          !isDefault ? h('button', { class: 'mist-srv-btn is-small', type: 'button', text: 'Set as default', onclick: async () => { try { await api.setDefaultWorld(server.id, world.name); await refreshServers(); S.cache.delete(key); paint(); toast('Default world updated.', 'success'); } catch (e) { toast(errText(e), 'error'); } } }) : null,
          h('button', {
            class: 'mist-srv-btn is-small is-bad is-ghost', type: 'button', html: svg('trash', 14), title: `Delete ${world.name}`,
            onclick: async () => {
              const ok = await confirmDialog({ title: `Delete world "${world.name}"?`, message: 'The world folder is moved to the recycle bin. This cannot be undone from Mist.', confirmLabel: 'Delete world', danger: true });
              if (!ok) return;
              try { await api.deleteWorld(server.id, world.name); S.cache.delete(key); paint(); toast('World deleted.', 'success'); }
              catch (e) { toast(errText(e), 'error'); }
            }
          })));
      }
    }
    wrap.append(h('p', { class: 'mist-srv-hint', text: 'The default world is the folder named in “level-name” (Settings). Other worlds stay on disk but are not loaded by the server.' }));
    return wrap;
  }

  async function loadPlugins() {
    const s = activeServer(); if (!s) return;
    if (S.pluginFor !== s.id) {
      S.pluginFor = s.id;
      S.pluginResults = null;
      S.pluginState = 'idle';
    }
    const key = `${s.id}:plugins`;
    if (S.pending.has(key)) return;
    S.pending.add(key);
    try { S.cache.set(key, await api.plugins(s.id)); } catch (e) { S.cache.set(key, { error: errText(e) }); }
    finally { S.pending.delete(key); paint(); }
    const info = softwareInfo(s.software);
    if (info.patchbukkit) loadPatchBukkit(s);
    if (S.pluginState === 'idle' && (info.plugins || info.mods || info.patchbukkit)) runPluginSearch(s);
  }
  async function loadWorlds() {
    const s = activeServer(); if (!s) return;
    const key = `${s.id}:worlds`;
    if (S.pending.has(key)) return;
    S.pending.add(key);
    try { S.cache.set(key, await api.worlds(s.id)); } catch (e) { S.cache.set(key, { error: errText(e) }); }
    finally { S.pending.delete(key); paint(); }
  }
  async function loadFiles(path) {
    const s = activeServer(); if (!s) return;
    S.filePath = path;
    const key = `${s.id}:files:${path}`;
    if (S.pending.has(key) || S.cache.has(key)) return;
    S.pending.add(key);
    try { S.cache.set(key, await api.files(s.id, path)); } catch (e) { S.cache.set(key, { error: errText(e) }); }
    finally { S.pending.delete(key); if (S.open && S.tab === 'files') paint(); }
  }

  // ---------------------------------------------------------------- join
  // ---------------------------------------------------------------- browse
  function installPicker() {
    const select = h('select', { class: 'mist-srv-select' });
    if (!S.installs.length) select.append(h('option', { value: '', text: 'No installations — create one first' }));
    for (const inst of S.installs) {
      const label = `${inst.name} · ${inst.gameVersion}${inst.loader?.type && inst.loader.type !== 'vanilla' ? ` · ${inst.loader.type}` : ''}`;
      const option = h('option', { value: inst.id, text: label });
      if (inst.id === S.installId) option.selected = true;
      select.append(option);
    }
    select.addEventListener('change', () => { S.installId = select.value; });
    return select;
  }

  function renderBrowse() {
    const wrap = h('div', { class: 'mist-srv-browse' });
    const card = h('section', { class: 'mist-srv-maincard mist-srv-browse-card' },
      h('div', { class: 'mist-srv-eyebrow', text: 'BROWSE LOCAL SERVERS' }),
      h('div', { class: 'mist-srv-hero' },
        h('div', {},
          h('h2', { text: 'Public servers on your network' }),
          h('p', { text: 'Only servers that are running and set to Public appear here. Private servers can only be joined with an invite code.' }))),
      h('div', { class: 'mist-srv-browse-bar' },
        h('span', { class: 'mist-srv-hint', text: S.browse.at ? `Last scan ${new Date(S.browse.at).toLocaleTimeString()}` : 'Scanning your network…' }),
        h('button', {
          class: 'mist-srv-btn is-small', type: 'button',
          html: `${svg('refresh', 14)}<span>${S.browse.state === 'loading' ? 'Scanning…' : 'Refresh'}</span>`,
          disabled: S.browse.state === 'loading',
          onclick: () => loadBrowse(true)
        })));

    const list = h('div', { class: 'mist-srv-browse-list' });
    if (S.browse.state !== 'ready' && !S.browse.items.length) {
      list.append(h('div', { class: 'mist-srv-loading' }, h('span', { class: 'mist-srv-spin' }), h('span', { text: 'Looking for public servers…' })));
    } else if (S.browse.error) {
      list.append(h('div', { class: 'mist-srv-note', html: `${svg('alert', 15)}<span>${S.browse.error}</span>` }));
    } else if (!S.browse.items.length) {
      list.append(h('div', { class: 'mist-srv-empty is-large' },
        h('strong', { text: 'No public servers found' }),
        h('p', { class: 'mist-srv-hint', text: 'Start a server on this PC or another PC on your network and set its visibility to Public. It will show up here while it runs.' })));
    } else {
      for (const item of S.browse.items) {
        const live = item.ready;
        const icon = item.icon
          ? h('img', { class: 'mist-srv-browse-icon', src: item.icon, alt: '', loading: 'lazy' })
          : h('span', { class: `mist-srv-software-ico${softwareInfo(item.software).rust ? ' is-rust' : ''}`, html: svg(SOFTWARE_ICONS[item.software] || 'server', 18) });
        const motd = (item.motd || '').trim();
        list.append(h('div', { class: 'mist-srv-row mist-srv-browse-row' },
          icon,
          h('span', { class: 'mist-srv-row-copy' },
            h('strong', { text: item.name }),
            h('small', { text: `${softwareLabel(item.software)} ${item.versionName || item.version}${motd ? ' · ' + motd.slice(0, 60) : ''}` }),
            h('small', { class: 'mist-srv-browse-motd', text: `${item.players}/${item.maxPlayers} players${live ? '' : ' · starting'}` })),
          h('span', { class: `mist-srv-pill ${live ? 'is-live' : 'is-starting'}`, text: live ? 'Online' : 'Starting' }),
          h('button', {
            class: `mist-srv-btn is-small${live ? ' is-primary' : ''}`, type: 'button', text: 'Join',
            disabled: !live,
            onclick: async (e) => {
              try {
                S.join = { code: '', host: item.host, port: item.port, name: item.name, valid: true, manual: true };
                await joinServer(e.currentTarget);
              } catch (err) { toast(errText(err), 'error'); }
            }
          })));
      }
    }
    card.append(list);
    card.append(h('div', { class: 'mist-srv-field' }, h('span', { text: 'Launch with installation' }), installPicker()));
    wrap.append(card);
    bodyEl.append(wrap);
  }

  function renderJoin() {
    const grid = h('div', { class: 'mist-srv-join' });
    const card = h('section', { class: 'mist-srv-maincard mist-srv-join-card' },
      h('div', { class: 'mist-srv-eyebrow', text: 'JOIN A WORLD' }),
      h('div', { class: 'mist-srv-hero' },
        h('div', {}, h('h2', { text: 'Paste an invite code' }), h('p', { text: 'Addresses and IPs are never shown or typed. Every server is joined with an invite code from its host.' }))));

    const codeInput = input('text', S.join.code, { placeholder: 'MIST1.…', maxlength: 400 });
    codeInput.id = 'mist-srv-join-code';
    codeInput.addEventListener('input', () => { S.join.code = codeInput.value; });
    card.append(h('div', { class: 'mist-srv-field' }, h('span', { text: 'Invite code' }), codeInput));

    const preview = h('div', { class: 'mist-srv-join-preview', hidden: !S.join.valid });
    if (S.join.valid) {
      preview.append(
        h('strong', { text: S.join.name || 'Server' }),
        h('small', { text: 'Invite code verified. Make sure the host has started the server.' }));
    }
    card.append(preview);

    card.append(h('div', { class: 'mist-srv-field' }, h('span', { text: 'Launch with installation' }), installPicker()));

    const actions = h('div', { class: 'mist-srv-form-foot' },
      h('button', { class: 'mist-srv-btn', type: 'button', html: `${svg('search', 15)}<span>Check code</span>`, onclick: (e) => checkJoin(e.currentTarget) }),
      h('button', { class: 'mist-srv-btn is-primary', type: 'button', html: `${svg('play', 16)}<span>Launch &amp; Join</span>`, onclick: (e) => joinServer(e.currentTarget) }));
    card.append(actions);

    grid.append(card);
    bodyEl.append(grid);
  }

  async function checkJoin(button) {
    const text = (S.join.code || '').trim();
    if (!text) { toast('Paste the invite code your friend shared.', 'error'); return; }
    button.disabled = true;
    try {
      if (!/^MIST1\./i.test(text)) {
        toast('Only Mist invite codes work. Ask the host to copy the code from their server dashboard.', 'error');
        return;
      }
      const parsed = await api.parseInvite(text);
      if (!parsed) { toast('That invite code is not valid.', 'error'); return; }
      S.join = { ...S.join, host: parsed.host, port: parsed.port, name: parsed.name || 'Server', valid: true };
      paint();
      toast(`Invite code verified: ${parsed.name || 'Server'}`, 'success');
    } catch (e) { toast(errText(e), 'error'); }
    finally { button.disabled = false; }
  }

  async function joinServer(button) {
    if (!S.join.valid) { await checkJoin(button); if (!S.join.valid) return; }
    if (!S.installs.length) { toast('Create an installation first, then try again.', 'error'); return; }
    if (!S.installId) S.installId = S.installs[0].id;
    const install = S.installs.find((i) => i.id === S.installId);
    if (!install) { toast('Choose an installation.', 'error'); return; }
    button.disabled = true;
    const old = button.innerHTML;
    button.innerHTML = `${svg('refresh', 15)}<span>Launching…</span>`;
    window.dispatchEvent(new CustomEvent('mist:game-starting', { detail: { name: install.name } }));
    let launched = false;
    try {
      const result = await bridge.launch.play(install.id, { name: S.join.name || 'Invite server', address: S.join.host, port: S.join.port });
      launched = Boolean(result && result.ok);
      if (!result || !result.ok) toast(result?.error || 'Minecraft did not start.', 'error');
      else toast(`Joining ${S.join.name || 'the server'} with ${install.name}`, 'success');
    } catch (e) {
      toast(errText(e), 'error');
    } finally {
      window.dispatchEvent(new CustomEvent('mist:game-start-finished', { detail: { ok: launched } }));
      button.disabled = false;
      button.innerHTML = old;
    }
  }

  // ---------------------------------------------------------------- sidebar + bundle cleanup
  function installNav() {
    const footer = document.querySelector('.titlebar > .top-route-nav .mist-route-footer');
    const account = footer && footer.querySelector('.mist-dock-account');
    if (!footer || !account) return;
    footer.querySelectorAll('.mist-r9-bundles-nav').forEach((n) => n.remove());
    if (footer.querySelector('[data-mist-server-nav="create"]')) return;

    const create = navButton('create', 'Create local server', 'serverPlus', () => openHub('create'));
    const join = navButton('join', 'Join local server', 'link', () => openHub('browse'));
    footer.insertBefore(join, account);
    footer.insertBefore(create, join);
    paintNavState();
  }

  function navButton(kind, label, iconName, onClick) {
    const button = h('button', {
      class: 'mist-dock-settings mist-server-nav', type: 'button', title: label,
      'aria-label': label, dataset: { mistServerNav: kind },
      html: `<span class="mist-srv-nav-ico">${svg(iconName, 25)}</span><span class="mist-dock-tooltip">${label}</span><span class="mist-srv-dot"></span>`
    });
    button.addEventListener('click', onClick);
    return button;
  }

  function scrubBundleUi() {
    document.querySelectorAll('.mist-r9-bundles-nav').forEach((n) => n.remove());
    const strip = document.querySelector('#mist-home-hero .mist-r9-hero-bottom');
    if (strip && /explore bundles/i.test(strip.textContent || '')) strip.remove();
    if (location.hash.startsWith('#/bundles')) {
      history.replaceState(null, '', `${location.pathname}${location.search}#/`);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      installNav();
      scrubBundleUi();
    });
  }
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('hashchange', scrubBundleUi);

  // ---------------------------------------------------------------- events
  if (bridge.events && bridge.events.serverState) {
    bridge.events.serverState((state) => {
      const server = S.servers.find((s) => s.id === state.id);
      if (server) server.state = state;
      paintNavState();
      if (S.open && S.view === 'dashboard' && S.serverId === state.id) paint();
      if (S.open && S.view === 'browse') loadBrowse();
    });
  }
  if (bridge.events && bridge.events.serverLog) {
    bridge.events.serverLog(({ id, line }) => {
      const arr = S.logs.get(id) || [];
      arr.push(line);
      if (arr.length > 2000) arr.shift();
      S.logs.set(id, arr);
      appendLogLine(id, line);
    });
  }

  // keep sidebar/state fresh
  setInterval(() => {
    if (document.querySelector('[data-mist-server-nav]')) return;
    installNav();
  }, 2500);
  setInterval(() => { if (S.open) refreshServers(); }, 8000);
  setInterval(() => {
    if (S.open && S.view === 'browse' && S.browse.state !== 'loading' && Date.now() - S.browse.at > 5000) loadBrowse();
  }, 5000);

  document.addEventListener('DOMContentLoaded', () => { installNav(); refreshServers(); });
  installNav();
  setTimeout(() => { installNav(); refreshServers(); }, 1200);
})();
