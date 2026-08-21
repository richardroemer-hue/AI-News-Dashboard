(() => {
  "use strict";

  const CATEGORIES = [
    "Trends",
    "Tools & Software",
    "Studien & Berichte",
    "Governance & Compliance",
    "Unternehmen & Praxis"
  ];

  // Kuratierte Startbeiträge, damit das Dashboard sofort Inhalte zeigt,
  // auch bevor (oder falls) der Live-Abruf unten fehlschlägt.
  const SEED_ARTICLES = [
    { id: "seed-01", title: "KI-Orakel 2026: Die wichtigsten Trends für Entscheider", source: "IT-Daily", url: "https://www.it-daily.net/it-management/ki/ki-orakel-2026-trends", date: "2026", category: "Trends", description: "Die KI-Trends 2026 stehen im Zeichen von Agentic AI, Explainable AI und Governance. Unternehmen wechseln von Pilotprojekten zu belastbaren, steuerbaren Produktivsystemen mit messbarem Beitrag zu Effizienz und Compliance.", curated: true },
    { id: "seed-02", title: "Enterprise Search als zentrale Wissensbasis fürs Unternehmen", source: "Handelsblatt", url: "https://www.handelsblatt.com/adv/firmen/ki-trends-2026.html", date: "2026", category: "Trends", description: "Enterprise Search etabliert sich als zentrale Wissensbasis für Unternehmen und ermöglicht die verlässliche Implementierung von RAG-Ansätzen und erklärbaren GenAI-Diensten im Wissensmanagement.", curated: true },
    { id: "seed-03", title: "Die KI im Realitätscheck: Trends 2026 für Führungskräfte", source: "Workday Blog", url: "https://blog.workday.com/de-de/die-ki-im-realitaetscheck-trends-2026.html", date: "2026", category: "Governance & Compliance", description: "Unternehmen investieren verstärkt in Datenherkunft, Confidential Computing und Governance-Frameworks, damit KI-gestütztes Wissensmanagement transparent, regelkonform und sicher bleibt.", curated: true },
    { id: "seed-04", title: "AI Knowledge Management Moves from Search Tool to Enterprise Decision Layer", source: "CIOReview", url: "https://www.cioreview.com/news/ai-knowledge-management-moves-from-search-tool-to-enterprise-decision-layer-nid-42532-cid-175.html", date: "2026", category: "Tools & Software", description: "KI-Wissensmanagement wird nicht mehr als reine Suchfunktion verkauft, sondern als Teil agentischer Workflows: Zusammenfassen, Abrufen, Entwerfen, Klassifizieren und Weiterleiten von Unternehmenswissen.", curated: true },
    { id: "seed-05", title: "Bloomfire zum dritten Mal in Folge als KI-Wissensmanagement-Anbieter des Jahres ausgezeichnet", source: "Bloomfire Newsroom", url: "https://bloomfire.com/newsroom/bloomfire-cioreview-ai-knowledge-management-company-of-the-year-2026/", date: "2026", category: "Unternehmen & Praxis", description: "CIOReview kürt Bloomfire bereits im dritten Jahr in Folge zum 'AI-Powered Knowledge Management Software Company of the Year' – ein Indikator für die wachsende Bedeutung KI-gestützter Wissensplattformen.", curated: true },
    { id: "seed-06", title: "Wissensmanagement mit KI: der smarte iFinder von IntraFind", source: "Handelsblatt", url: "https://www.handelsblatt.com/adv/firmen/wissensmanagement-mit-ki.html", date: "2026", category: "Tools & Software", description: "Praxisbeispiel eines deutschen Anbieters, der mit einer KI-gestützten Enterprise-Search-Lösung Unternehmenswissen durchsuchbar und nutzbar macht.", curated: true },
    { id: "seed-07", title: "Die 10 besten Wissensmanagement-Tools im Jahr 2026", source: "Powell Software", url: "https://powell-software.com/de/resources/blog/wissensmanagement-tools/", date: "2026", category: "Tools & Software", description: "Überblick über führende Lösungen von Microsoft SharePoint und Teams bis Powell Intranet, bewertet nach Integrationsfähigkeit, DSGVO-Konformität und KI-Funktionen.", curated: true },
    { id: "seed-08", title: "Wie KI-Wissensmanagement die klassische Enterprise Search 2026 ablöst", source: "Tech+ Trends", url: "https://techplustrends.com/ai-knowledge-management-systems-replacing-enterprise-search-2026/", date: "2026", category: "Studien & Berichte", description: "Analyse, wie KI-gestützte Systeme mit semantischer Suche, RAG und Knowledge Graphs klassische Enterprise-Search-Werkzeuge in Unternehmen zunehmend verdrängen.", curated: true },
    { id: "seed-09", title: "Was ist Enterprise AI Knowledge Management? Leitfaden 2026", source: "GoSearch", url: "https://www.gosearch.ai/faqs/enterprise-ai-knowledge-management-guide-2026/", date: "2026", category: "Studien & Berichte", description: "Einsteigerleitfaden zu Konzepten, Nutzen und aktuellen Trends von KI-gestütztem Wissensmanagement für Unternehmen, inklusive FAQ und Praxisbeispielen.", curated: true },
    { id: "seed-10", title: "Microsoft, Google, Glean und ServiceNow verschärfen den Wettbewerb um Unternehmenswissen", source: "Windows Forum", url: "https://windowsforum.com/threads/2026-enterprise-ai-knowledge-management-from-search-to-governed-agent-workflows.410816/", date: "2026", category: "Unternehmen & Praxis", description: "Große Anbieter integrieren KI-Wissensfunktionen direkt in bestehende Unternehmens-Abos (Microsoft 365 Copilot, Google AI-Suchstack, ServiceNow Now Assist), um Adoptionshürden zu senken.", curated: true },
    { id: "seed-11", title: "Trend-Report 2026 zusammengefasst: 8 wichtige Entwicklungen", source: "Konrad Weber", url: "https://konradweber.ch/2026/01/03/trend-reports-2026-zusammengefasst/", date: "2026-01-03", category: "Trends", description: "Zusammenfassung diverser Trendreports für 2026 mit Fokus auf KI-Entwicklungen, die auch Wissensarbeit und Unternehmenswissen betreffen.", curated: true },
    { id: "seed-12", title: "Die 7 besten KI-Tools für Wissensdatenbank-Management 2026", source: "eesel AI", url: "https://www.eesel.ai/de/blog/best-ai-tools-for-knowledge-base-management", date: "2026", category: "Tools & Software", description: "Vergleich KI-gestützter Tools zur Pflege und Durchsuchung von Wissensdatenbanken für Support- und Wissensmanagement-Teams.", curated: true }
  ];

  // Google-News-RSS-Abfragen, eine je Kategorie. Laufen direkt im Browser des
  // Nutzers (nicht in dieser Entwicklungsumgebung) und benötigen daher nur
  // dessen normale Internetverbindung plus einen CORS-Proxy für den RSS-Abruf.
  const LIVE_QUERIES = [
    { category: "Trends", query: "KI Wissensmanagement Unternehmen", hl: "de", gl: "DE", ceid: "DE:de" },
    { category: "Tools & Software", query: "KI Tools Wissensmanagement Unternehmen", hl: "de", gl: "DE", ceid: "DE:de" },
    { category: "Studien & Berichte", query: "AI knowledge management enterprise", hl: "en-US", gl: "US", ceid: "US:en" },
    { category: "Governance & Compliance", query: "KI Governance Wissensmanagement Compliance", hl: "de", gl: "DE", ceid: "DE:de" },
    { category: "Unternehmen & Praxis", query: "Unternehmenswissen KI Software", hl: "de", gl: "DE", ceid: "DE:de" }
  ];

  const CORS_PROXIES = [
    (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`
  ];

  // Offizielle, öffentliche X-Profile ausgewählter KI-Größen. Eingebunden via
  // X-Embed-Widgets (kein API-Key nötig, siehe renderXWidgets()).
  const X_FIGURES = [
    { name: "Boris Cherny", handle: "bcherny" },
    { name: "Andrej Karpathy", handle: "karpathy" },
    { name: "Sam Altman", handle: "sama" },
    { name: "Yann LeCun", handle: "ylecun" },
    { name: "Demis Hassabis", handle: "demishassabis" }
  ];

  const CACHE_KEY = "kiwm_dashboard_live_cache_v1";
  const CACHE_TTL_MS = 30 * 60 * 1000;
  const FETCH_TIMEOUT_MS = 8000;

  const state = {
    articles: [...SEED_ARTICLES],
    activeCategory: "Alle",
    search: "",
    source: "",
    sort: "newest",
    live: false
  };

  const el = {
    grid: document.getElementById("cardGrid"),
    empty: document.getElementById("emptyState"),
    chips: document.getElementById("categoryChips"),
    search: document.getElementById("searchInput"),
    sourceFilter: document.getElementById("sourceFilter"),
    sortOrder: document.getElementById("sortOrder"),
    refreshBtn: document.getElementById("refreshBtn"),
    themeToggle: document.getElementById("themeToggle"),
    statusBadge: document.getElementById("statusBadge"),
    statCount: document.getElementById("statCount"),
    statSources: document.getElementById("statSources"),
    statCategories: document.getElementById("statCategories"),
    statUpdated: document.getElementById("statUpdated"),
    xToggle: document.getElementById("xToggle"),
    xGrid: document.getElementById("xGrid")
  };

  let xWidgetsLoaded = false;
  let xVisible = false;

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  function loadTwitterWidgetsScript() {
    return new Promise((resolve) => {
      if (window.twttr && window.twttr.widgets) {
        resolve();
        return;
      }
      const existing = document.getElementById("twitter-wjs");
      if (existing) {
        existing.addEventListener("load", () => resolve());
        return;
      }
      const script = document.createElement("script");
      script.id = "twitter-wjs";
      script.async = true;
      script.src = "https://platform.twitter.com/widgets.js";
      script.addEventListener("load", () => resolve());
      script.addEventListener("error", () => resolve());
      document.body.appendChild(script);
    });
  }

  function buildXCards() {
    const theme = currentTheme();
    el.xGrid.innerHTML = X_FIGURES.map((p) => `
      <div class="x-card">
        <h3><a href="https://twitter.com/${p.handle}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.name)} (@${escapeHtml(p.handle)})</a></h3>
        <a class="twitter-timeline" data-height="480" data-theme="${theme}" href="https://twitter.com/${p.handle}?ref_src=twsrc%5Etfw">Tweets von @${escapeHtml(p.handle)}</a>
      </div>
    `).join("");
  }

  async function renderXWidgets() {
    buildXCards();
    await loadTwitterWidgetsScript();
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load(el.xGrid);
    }
    xWidgetsLoaded = true;
  }

  function setXVisible(visible) {
    xVisible = visible;
    el.xGrid.hidden = !visible;
    el.xToggle.textContent = visible ? "X-Feeds ausblenden" : "X-Feeds laden & anzeigen";
    localStorage.setItem("kiwm_x_visible", visible ? "1" : "0");
    if (visible && !xWidgetsLoaded) {
      renderXWidgets();
    }
  }

  function initXFeeds() {
    el.xToggle.addEventListener("click", () => setXVisible(!xVisible));
    if (localStorage.getItem("kiwm_x_visible") === "1") {
      setXVisible(true);
    }
  }

  function fetchWithTimeout(url, ms) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
  }

  function stripHtml(html) {
    if (!html) return "";
    return html
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function hashId(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return "live-" + Math.abs(h);
  }

  async function fetchOneQuery(cfg) {
    const targetUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(cfg.query)}&hl=${cfg.hl}&gl=${cfg.gl}&ceid=${cfg.ceid}`;

    let xmlText = null;
    for (const buildProxyUrl of CORS_PROXIES) {
      try {
        const res = await fetchWithTimeout(buildProxyUrl(targetUrl), FETCH_TIMEOUT_MS);
        if (!res.ok) continue;
        xmlText = await res.text();
        if (xmlText && xmlText.includes("<item")) break;
      } catch (_) {
        // try next proxy
      }
    }
    if (!xmlText) return [];

    const doc = new DOMParser().parseFromString(xmlText, "text/xml");
    if (doc.querySelector("parsererror")) return [];

    const items = Array.from(doc.querySelectorAll("item")).slice(0, 12);
    return items.map((item) => {
      const title = item.querySelector("title")?.textContent?.trim() || "Ohne Titel";
      const link = item.querySelector("link")?.textContent?.trim() || "#";
      const pubDate = item.querySelector("pubDate")?.textContent?.trim() || "";
      const sourceEl = item.querySelector("source");
      const source = sourceEl?.textContent?.trim() || "Google News";
      const description = stripHtml(item.querySelector("description")?.textContent || "");

      return {
        id: hashId(link),
        title,
        source,
        url: link,
        date: pubDate || cfg.query,
        category: cfg.category,
        description: description || "Keine Zusammenfassung verfügbar.",
        curated: false
      };
    });
  }

  async function fetchLiveArticles() {
    const results = await Promise.allSettled(LIVE_QUERIES.map(fetchOneQuery));
    const merged = [];
    const seenUrls = new Set();
    for (const r of results) {
      if (r.status !== "fulfilled") continue;
      for (const article of r.value) {
        if (seenUrls.has(article.url)) continue;
        seenUrls.add(article.url);
        merged.push(article);
      }
    }
    return merged;
  }

  function readCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.items)) return null;
      return parsed;
    } catch (_) {
      return null;
    }
  }

  function writeCache(items) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), items }));
    } catch (_) {
      // localStorage nicht verfügbar (z. B. privates Fenster) – ignorieren
    }
  }

  function setStatus(mode, extra) {
    el.statusBadge.classList.remove("live", "fallback");
    if (mode === "live") {
      el.statusBadge.classList.add("live");
      el.statusBadge.textContent = `Live-Daten aktiv${extra ? " · " + extra : ""}`;
    } else if (mode === "fallback") {
      el.statusBadge.classList.add("fallback");
      el.statusBadge.textContent = "Nur kuratierte Startdaten (Live-Abruf nicht verfügbar)";
    } else {
      el.statusBadge.textContent = "Lädt…";
    }
  }

  function combineArticles(liveItems) {
    if (!liveItems || liveItems.length === 0) {
      state.articles = [...SEED_ARTICLES];
      return;
    }
    const seenUrls = new Set(liveItems.map((a) => a.url));
    const seedRest = SEED_ARTICLES.filter((a) => !seenUrls.has(a.url));
    state.articles = [...liveItems, ...seedRest];
  }

  function parseDate(value) {
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d;
    const yearMatch = /^\d{4}$/.exec(value);
    if (yearMatch) return new Date(`${value}-01-01`);
    return new Date(0);
  }

  function formatDate(value) {
    if (/^\d{4}$/.test(value)) return value;
    const d = parseDate(value);
    if (d.getTime() === 0) return value || "";
    return d.toLocaleDateString("de-DE", { year: "numeric", month: "short", day: "2-digit" });
  }

  function populateSourceFilter() {
    const sources = Array.from(new Set(state.articles.map((a) => a.source))).sort((a, b) => a.localeCompare(b, "de"));
    const current = el.sourceFilter.value;
    el.sourceFilter.innerHTML = '<option value="">Alle Quellen</option>' +
      sources.map((s) => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("");
    if (sources.includes(current)) el.sourceFilter.value = current;
  }

  function renderChips() {
    const cats = ["Alle", ...CATEGORIES];
    el.chips.innerHTML = cats.map((c) =>
      `<button type="button" class="chip${c === state.activeCategory ? " active" : ""}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`
    ).join("");
    el.chips.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeCategory = btn.dataset.cat;
        renderChips();
        renderGrid();
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function getFilteredSorted() {
    let list = state.articles.filter((a) => {
      if (state.activeCategory !== "Alle" && a.category !== state.activeCategory) return false;
      if (state.source && a.source !== state.source) return false;
      if (state.search) {
        const haystack = `${a.title} ${a.source} ${a.description}`.toLowerCase();
        if (!haystack.includes(state.search.toLowerCase())) return false;
      }
      return true;
    });

    if (state.sort === "newest") {
      list = list.slice().sort((a, b) => parseDate(b.date) - parseDate(a.date));
    } else if (state.sort === "oldest") {
      list = list.slice().sort((a, b) => parseDate(a.date) - parseDate(b.date));
    } else if (state.sort === "az") {
      list = list.slice().sort((a, b) => a.title.localeCompare(b.title, "de"));
    }
    return list;
  }

  function renderGrid() {
    const list = getFilteredSorted();
    el.empty.hidden = list.length !== 0;
    el.grid.innerHTML = list.map((a) => `
      <article class="card">
        <div class="card-top">
          <span class="card-tag">${escapeHtml(a.category)}</span>
          <span class="card-date">${escapeHtml(formatDate(a.date))}</span>
        </div>
        <h3><a href="${escapeHtml(a.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(a.title)}</a></h3>
        <p>${escapeHtml(a.description)}</p>
        <div class="card-source">${escapeHtml(a.source)}${a.curated ? " · kuratiert" : ""}</div>
      </article>
    `).join("");
    updateStats();
  }

  function updateStats() {
    const list = getFilteredSorted();
    el.statCount.textContent = list.length;
    el.statSources.textContent = new Set(state.articles.map((a) => a.source)).size;
    el.statCategories.textContent = new Set(state.articles.map((a) => a.category)).size;
  }

  function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function setUpdatedLabel(date) {
    if (!date) {
      el.statUpdated.textContent = "–";
      el.statUpdated.removeAttribute("title");
      return;
    }
    const sameDay = isSameDay(date, new Date());
    el.statUpdated.textContent = sameDay
      ? date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleString("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
    el.statUpdated.title = "Letzter erfolgreicher Live-Abruf: " +
      date.toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" });
  }

  async function runLiveRefresh(force) {
    if (!force) {
      const cached = readCache();
      if (cached && cached.items.length > 0 && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        combineArticles(cached.items);
        populateSourceFilter();
        renderChips();
        renderGrid();
        setStatus("live");
        setUpdatedLabel(new Date(cached.timestamp));
        return;
      }
    }

    el.refreshBtn.disabled = true;
    el.refreshBtn.classList.add("spin");
    try {
      const liveItems = await fetchLiveArticles();
      combineArticles(liveItems);
      if (liveItems.length > 0) {
        writeCache(liveItems);
        setStatus("live", `${liveItems.length} neu`);
        setUpdatedLabel(new Date());
      } else {
        setStatus("fallback");
      }
    } catch (_) {
      combineArticles([]);
      setStatus("fallback");
    } finally {
      populateSourceFilter();
      renderChips();
      renderGrid();
      el.refreshBtn.disabled = false;
      el.refreshBtn.classList.remove("spin");
    }
  }

  function initTheme() {
    const saved = localStorage.getItem("kiwm_theme");
    if (saved === "dark" || saved === "light") {
      document.documentElement.setAttribute("data-theme", saved);
    }
    el.themeToggle.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("kiwm_theme", next);
      if (xWidgetsLoaded && xVisible) renderXWidgets();
    });
  }

  function initControls() {
    el.search.addEventListener("input", (e) => {
      state.search = e.target.value;
      renderGrid();
    });
    el.sourceFilter.addEventListener("change", (e) => {
      state.source = e.target.value;
      renderGrid();
    });
    el.sortOrder.addEventListener("change", (e) => {
      state.sort = e.target.value;
      renderGrid();
    });
    el.refreshBtn.addEventListener("click", () => runLiveRefresh(true));
  }

  function init() {
    initTheme();
    initControls();
    initXFeeds();
    populateSourceFilter();
    renderChips();
    renderGrid();
    setStatus("loading");
    runLiveRefresh(false);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
