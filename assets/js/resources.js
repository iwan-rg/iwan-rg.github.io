/* =========================================================
   resources.js — live GitHub repos + Hugging Face models/datasets
   ========================================================= */
const GH_ORG = "iwan-rg";
const HF_ORG = "iwan-rg";

function rEsc(s){ return (s==null?"":String(s)).replace(/[&<>"]/g,c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c])); }
function fmtNum(n){ return n>=1000 ? (n/1000).toFixed(1).replace(/\.0$/,"")+"k" : ""+(n||0); }

const ICON = {
  star:`<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="m12 2 3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1L12 2z"/></svg>`,
  fork:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="19" r="2.5"/><path d="M6 8.5v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-3M12 14.5v2"/></svg>`,
  repo:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h11a1 1 0 0 1 1 1v16l-7-3-7 3V5a2 2 0 0 1 2-2z"/></svg>`,
  dl:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>`,
  heart:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg>`,
  model:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>`,
  data:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>`,
};

async function loadGitHub(){
  const host = document.getElementById("gh-list");
  const counter = document.getElementById("gh-count");
  try{
    // iwan-rg is a User account, not an Org — use the /users endpoint.
    let res = await fetch(`https://api.github.com/users/${GH_ORG}/repos?per_page=100&sort=updated`);
    if(!res.ok) res = await fetch(`https://api.github.com/orgs/${GH_ORG}/repos?per_page=100&sort=updated`);
    if(!res.ok) throw new Error("gh");
    let repos = await res.json();
    if(!Array.isArray(repos)) throw new Error("gh");
    repos = repos.filter(r=>!r.fork).sort((a,b)=> b.stargazers_count - a.stargazers_count).slice(0,9);
    if(counter) counter.textContent = repos.length;
    host.innerHTML = repos.map(r=>`
      <a class="card repo reveal" href="${rEsc(r.html_url)}" target="_blank" rel="noopener">
        <div class="repo__name">${ICON.repo}<span>${rEsc(r.name)}</span></div>
        <div class="repo__desc">${rEsc(r.description||"")}</div>
        <div class="repo__meta">
          ${r.language?`<span><i class="dot-lang"></i>${rEsc(r.language)}</span>`:""}
          <span>${ICON.star}${fmtNum(r.stargazers_count)}</span>
          <span>${ICON.fork}${fmtNum(r.forks_count)}</span>
        </div>
      </a>`).join("");
    if(window.iwanReveal) window.iwanReveal(host);
  }catch(e){
    host.innerHTML = `<a class="card repo" href="https://github.com/${GH_ORG}" target="_blank" rel="noopener"><div class="repo__name">${ICON.repo}<span>github.com/${GH_ORG}</span></div><div class="repo__desc">Browse all repositories on GitHub ↗</div></a>`;
  }
}

async function loadHF(){
  const mHost = document.getElementById("hf-models");
  const dHost = document.getElementById("hf-datasets");
  const mc = document.getElementById("hf-mcount"), dc = document.getElementById("hf-dcount");
  async function grab(kind){
    const url = `https://huggingface.co/api/${kind}?author=${HF_ORG}&full=true&limit=100`;
    const r = await fetch(url); if(!r.ok) throw new Error("hf"); return r.json();
  }
  // models
  try{
    let models = await grab("models");
    models = models.sort((a,b)=>(b.likes||0)-(a.likes||0)||(b.downloads||0)-(a.downloads||0)).slice(0,6);
    if(mc) mc.textContent = models.length;
    mHost.innerHTML = models.map(m=>`
      <a class="card repo reveal" href="https://huggingface.co/${rEsc(m.id)}" target="_blank" rel="noopener">
        <div class="repo__name">${ICON.model}<span>${rEsc(m.id.replace(HF_ORG+"/",""))}</span></div>
        <div class="repo__meta">
          <span>${ICON.dl}${fmtNum(m.downloads)}</span>
          <span>${ICON.heart}${fmtNum(m.likes)}</span>
        </div>
      </a>`).join("") || emptyHF(mHost,"models");
    if(window.iwanReveal) window.iwanReveal(mHost);
  }catch(e){ emptyHF(mHost,"models"); }
  // datasets
  try{
    let ds = await grab("datasets");
    ds = ds.sort((a,b)=>(b.downloads||0)-(a.downloads||0)).slice(0,6);
    if(dc) dc.textContent = ds.length;
    dHost.innerHTML = ds.map(d=>`
      <a class="card repo reveal" href="https://huggingface.co/datasets/${rEsc(d.id)}" target="_blank" rel="noopener">
        <div class="repo__name">${ICON.data}<span>${rEsc(d.id.replace(HF_ORG+"/",""))}</span></div>
        <div class="repo__meta">
          <span>${ICON.dl}${fmtNum(d.downloads)}</span>
          <span>${ICON.heart}${fmtNum(d.likes)}</span>
        </div>
      </a>`).join("") || emptyHF(dHost,"datasets");
    if(window.iwanReveal) window.iwanReveal(dHost);
  }catch(e){ emptyHF(dHost,"datasets"); }
}
function emptyHF(host,kind){
  host.innerHTML = `<a class="card repo" href="https://huggingface.co/${HF_ORG}" target="_blank" rel="noopener"><div class="repo__name">${ICON.data}<span>huggingface.co/${HF_ORG}</span></div><div class="repo__desc">Browse all ${kind} on Hugging Face ↗</div></a>`;
}

function initResourcesPage(){
  loadGitHub();
  loadHF();
}
