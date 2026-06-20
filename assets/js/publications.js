/* =========================================================
   publications.js
   Auto-populates publications from a nightly cache
   (data/publications.json) with a live OpenAlex fallback.
   ========================================================= */
const OA_BASE = "https://api.openalex.org/works";
const OA_MAILTO = "hend.alkhalifa@gmail.com"; // OpenAlex "polite pool"
const OA_SELECT = "id,title,display_name,publication_year,publication_date,type,type_crossref,cited_by_count,doi,primary_location,open_access,authorships";

const PUB = {
  all: [],
  filter: "all",
  query: "",
  highlight: "Al-Khalifa",
  updated: null,
};

function esc(s){ return (s==null?"":String(s)).replace(/[&<>"']/g, c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }

// OpenAlex exposes a new `type` vocabulary plus the legacy `type_crossref`.
// Use crossref first (it distinguishes journal vs conference), then fall back.
function classifyType(type, crossref, sourceType){
  const tc = crossref || "";
  if(tc === "journal-article") return "journal";
  if(tc === "proceedings-article") return "conference";
  if(tc === "posted-content") return "preprint";
  if(tc === "book-chapter" || tc.startsWith("book") || tc === "monograph" || tc === "reference-entry") return "book";
  const t = type || "";
  if(t === "preprint") return "preprint";
  if(t === "book" || t === "book-chapter") return "book";
  if(t === "article" || t === "review" || t === "letter"){
    return sourceType === "conference" ? "conference" : "journal";
  }
  return "other";
}
const TYPE_LABEL = {
  journal:"Journal", conference:"Conference", preprint:"Preprint",
  book:"Book / Chapter", other:"Article"
};

// punctuation/whitespace-insensitive title key (keeps Arabic letters) so
// different versions of the same paper collapse together
function titleKey(title){
  const k = (title||"").toLowerCase().replace(/[^\p{L}\p{N}]+/gu,"");
  return k ? "k:"+k : null;
}

function normalizeOA(w){
  const src = (w.primary_location && w.primary_location.source) || null;
  const venue = src ? src.display_name : "";
  const doi = w.doi ? w.doi.replace(/^https?:\/\/doi\.org\//,"") : "";
  const url = doi ? "https://doi.org/"+doi
            : (w.primary_location && w.primary_location.landing_page_url) ? w.primary_location.landing_page_url
            : w.id;
  const authors = (w.authorships||[]).map(a=> a.author ? a.author.display_name : "").filter(Boolean);
  const title = w.display_name || w.title || "Untitled";
  return {
    key: titleKey(title) || (doi ? "doi:"+doi.toLowerCase() : "t:"+title.toLowerCase()),
    title,
    year: w.publication_year || 0,
    date: w.publication_date || "",
    venue, type: classifyType(w.type, w.type_crossref, src ? src.type : ""),
    cites: w.cited_by_count || 0,
    doi, url,
    oa: !!(w.open_access && w.open_access.is_oa),
    oa_url: w.open_access ? w.open_access.oa_url : null,
    authors,
  };
}

function dedupe(list){
  const groups = new Map();
  for(const p of list){ const a = groups.get(p.key) || []; a.push(p); groups.set(p.key, a); }
  const realVenue = p => { const v=(p.venue||"").toLowerCase(); return !!v && !v.includes("arxiv") && !v.includes("open mind"); };
  const realDoi = p => !!p.doi && !p.doi.startsWith("10.48550");
  const rank = p => [p.type==="preprint"?0:1, realVenue(p)?1:0, realDoi(p)?1:0, p.cites||0];
  const cmp = (a,b) => { for(let i=0;i<a.length;i++){ if(a[i]!==b[i]) return a[i]-b[i]; } return 0; };
  const out = [];
  for(const g of groups.values()){
    let rep = g.reduce((best,p)=> cmp(rank(p),rank(best))>0 ? p : best, g[0]);
    rep = Object.assign({}, rep);
    rep.cites = Math.max(...g.map(x=>x.cites||0));
    if(!realVenue(rep)){ const v = g.find(realVenue); if(v) rep.venue = v.venue; }
    if(!rep.doi){ const d = g.find(x=>x.doi); if(d){ rep.doi = d.doi; rep.url = d.url; } }
    out.push(rep);
  }
  return out;
}

async function fetchAuthorWorks(id){
  let cursor = "*", out = [], pages = 0;
  while(cursor && pages < 4){
    const url = `${OA_BASE}?filter=author.id:${id}&per_page=200&cursor=${encodeURIComponent(cursor)}`
              + `&select=${OA_SELECT}&mailto=${OA_MAILTO}`;
    const res = await fetch(url);
    if(!res.ok) throw new Error("OpenAlex "+res.status);
    const data = await res.json();
    out = out.concat((data.results||[]).map(normalizeOA));
    cursor = data.meta && data.meta.next_cursor;
    pages++;
    if(!data.results || data.results.length < 200) break;
  }
  return out;
}

async function loadAuthors(){
  try{
    const res = await fetch("./data/authors.json");
    const j = await res.json();
    if(j.highlight_author) PUB.highlight = j.highlight_author;
    return (j.openalex_authors||[]).map(a=>a.id);
  }catch(e){ return ["A5063710079"]; }
}

/* Load cache first; fall back to live OpenAlex. Returns deduped, sorted list. */
async function loadPublications(){
  // 1) try the nightly cache
  try{
    const res = await fetch("./data/publications.json", {cache:"no-cache"});
    if(res.ok){
      const j = await res.json();
      if(j.highlight_author) PUB.highlight = j.highlight_author;
      if(Array.isArray(j.publications) && j.publications.length){
        PUB.updated = j.updated;
        return sortPubs(dedupe(j.publications.map(normalizeCached)));
      }
    }
  }catch(e){ /* ignore, go live */ }

  // 2) live fallback
  const ids = await loadAuthors();
  const batches = await Promise.all(ids.map(id => fetchAuthorWorks(id).catch(()=>[])));
  const merged = dedupe(batches.flat());
  PUB.updated = new Date().toISOString();
  return sortPubs(merged);
}

// cached records are already normalized by the python script, but be defensive
function normalizeCached(p){
  return {
    key: p.key || (p.doi ? "doi:"+p.doi.toLowerCase() : "t:"+(p.title||"").toLowerCase()),
    title: p.title||"Untitled", year: p.year||0, date: p.date||"",
    venue: p.venue||"", type: p.type||classifyType(p.openalex_type)||"other",
    cites: p.cites||0, doi: p.doi||"", url: p.url||"#",
    oa: !!p.oa, oa_url: p.oa_url||null, authors: p.authors||[],
  };
}

function sortPubs(list){
  return list.sort((a,b)=> (b.year-a.year) || (b.cites-a.cites) || a.title.localeCompare(b.title));
}

/* ---------- rendering ---------- */
// normalize unicode hyphens / whitespace so "Al‐Khalifa" matches "Al-Khalifa"
function norm(s){ return (s||"").toLowerCase().replace(/[‐-―−]/g,"-").replace(/\s+/g," ").trim(); }
function authorLine(authors){
  const hl = norm(PUB.highlight);
  return authors.map(a=>{
    const isMe = norm(a).includes(hl);
    return `<span class="${isMe?"me":""}">${esc(a)}</span>`;
  }).join(", ");
}

function pubItem(p){
  const tags = [];
  tags.push(`<span class="ptag">${esc(TYPE_LABEL[p.type]||"Article")}</span>`);
  if(p.venue) tags.push(`<span class="ptag">${esc(p.venue)}</span>`);
  if(p.oa && p.oa_url) tags.push(`<span class="ptag ptag--oa"><a href="${esc(p.oa_url)}" target="_blank" rel="noopener">${t("pub.oa")} ↗</a></span>`);
  else if(p.doi) tags.push(`<span class="ptag"><a href="${esc(p.url)}" target="_blank" rel="noopener">${t("pub.doi")} ↗</a></span>`);
  return `<article class="pub reveal">
    <div class="pub__cite"><b>${p.cites}</b><span>${t("pub.cites")}</span></div>
    <div class="pub__body">
      <a class="pub__title" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title)}</a>
      <div class="pub__authors">${authorLine(p.authors)}</div>
      ${p.venue?`<div class="pub__venue">${esc(p.venue)}${p.year?` · ${p.year}`:""}</div>`:""}
      <div class="pub__tags">${tags.join("")}</div>
    </div>
  </article>`;
}

function applyFilters(){
  const q = PUB.query.trim().toLowerCase();
  return PUB.all.filter(p=>{
    if(PUB.filter !== "all" && p.type !== PUB.filter) return false;
    if(!q) return true;
    return (p.title+" "+p.venue+" "+p.authors.join(" ")).toLowerCase().includes(q);
  });
}

function renderList(){
  const host = document.getElementById("pub-list");
  const list = applyFilters();
  const meta = document.getElementById("pub-meta");
  if(meta) meta.textContent = `${list.length} ${t("pub.count")}`;

  if(!list.length){ host.innerHTML = `<div class="state">${t("pub.empty")}</div>`; return; }

  const byYear = {};
  list.forEach(p=>{ (byYear[p.year]=byYear[p.year]||[]).push(p); });
  const years = Object.keys(byYear).map(Number).sort((a,b)=>b-a);

  host.innerHTML = years.map(y=>`
    <section class="yeargroup">
      <h2 class="yeargroup__year">${y||"—"} <small>${byYear[y].length}</small></h2>
      ${byYear[y].map(pubItem).join("")}
    </section>`).join("");
  if(window.iwanReveal) window.iwanReveal(host);
}

/* ---------- public entry points ---------- */
async function initPublicationsPage(){
  const host = document.getElementById("pub-list");
  host.innerHTML = `<div class="state"><div class="spinner"></div>${t("pub.loading")}</div>`;
  try{
    PUB.all = await loadPublications();
  }catch(e){
    host.innerHTML = `<div class="state">${t("pub.error")}</div>`;
    return;
  }
  // updated stamp
  const up = document.getElementById("pub-updated");
  if(up && PUB.updated){
    const d = new Date(PUB.updated);
    up.textContent = `${t("pub.updated")}: ${d.toLocaleDateString(currentLang()==="ar"?"ar":"en-GB",{year:"numeric",month:"short",day:"numeric"})}`;
  }

  // wire controls
  const search = document.getElementById("pub-search");
  if(search) search.addEventListener("input", e=>{ PUB.query = e.target.value; renderList(); });
  document.querySelectorAll("[data-filter]").forEach(chip=>{
    chip.addEventListener("click", ()=>{
      document.querySelectorAll("[data-filter]").forEach(c=>c.classList.remove("is-on"));
      chip.classList.add("is-on");
      PUB.filter = chip.dataset.filter;
      renderList();
    });
  });
  document.addEventListener("langchange", renderList);
  renderList();
}

async function initRecentPublications(selector, limit){
  const host = document.querySelector(selector);
  if(!host) return;
  host.innerHTML = `<div class="state"><div class="spinner"></div>${t("pub.loading")}</div>`;
  try{
    const list = await loadPublications();
    PUB.all = list;
    host.innerHTML = list.slice(0, limit||5).map(pubItem).join("");
    if(window.iwanReveal) window.iwanReveal(host);
    document.addEventListener("langchange", ()=>{
      host.innerHTML = list.slice(0, limit||5).map(pubItem).join("");
      if(window.iwanReveal) window.iwanReveal(host);
    });
    // update hero stats if present
    const sc = document.getElementById("stat-pubs");
    if(sc){ sc.dataset.count = list.length; sc.textContent = list.length; }
  }catch(e){
    host.innerHTML = `<div class="state">${t("pub.error")}</div>`;
  }
}
