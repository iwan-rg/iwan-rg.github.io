/* =========================================================
   projects.js — render Projects from data/projects.json
   ========================================================= */
function pEsc(s){ return (s==null?"":String(s)).replace(/[&<>"]/g,c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c])); }

function projectCard(p, lang){
  const title = lang==="ar" ? p.title_ar : p.title_en;
  const desc  = lang==="ar" ? p.desc_ar  : p.desc_en;
  const tags = (p.tags||[]).map(tg=>`<span class="ptag">${pEsc(tg)}</span>`).join("");
  const statusKey = p.status==="past" ? "proj.past.badge" : "proj.current.badge";
  const link = p.link
    ? `<span class="proj__link">${t("proj.link")}
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>`
    : "";
  const tag = p.link ? "a" : "div";
  const href = p.link ? ` href="${pEsc(p.link)}" target="_blank" rel="noopener"` : "";
  return `<${tag} class="card project reveal"${href}>
    <div class="proj__head">
      <span class="proj__status proj__status--${p.status==="past"?"past":"current"}">${t(statusKey)}</span>
      ${p.year?`<span class="proj__year">${pEsc(p.year)}</span>`:""}
    </div>
    <h3>${pEsc(title)}</h3>
    <p class="proj__desc">${pEsc(desc)}</p>
    <div class="proj__tags">${tags}</div>
    ${link}
  </${tag}>`;
}

function initProjectsPage(){
  const host = document.getElementById("projects-root");
  let data;
  const render = ()=>{
    const lang = currentLang();
    const groups = [["current","proj.current"],["past","proj.past"]];
    let html = "";
    groups.forEach(([g,key])=>{
      const list = (data.projects||[]).filter(p=>p.status===g);
      if(!list.length) return;
      html += `<h2 class="memgroup-title">${t(key)}</h2>
        <div class="cards cards--3" style="margin-bottom:40px">${list.map(p=>projectCard(p,lang)).join("")}</div>`;
    });
    host.innerHTML = html;
    if(window.iwanReveal) window.iwanReveal(host);
  };
  fetch("./data/projects.json")
    .then(r=>r.json())
    .then(j=>{ data=j; render(); document.addEventListener("langchange", render); })
    .catch(()=>{ host.innerHTML = `<div class="state">Couldn't load projects.</div>`; });
}
