/* =========================================================
   members.js — render the team roster from data/members.json
   ========================================================= */
const LINK_ICONS = {
  scholar:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3zM5 13.2v3.2c0 1.6 3.1 3.6 7 3.6s7-2 7-3.6v-3.2l-7 3.8-7-3.8z"/></svg>`,
  openalex:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,
  github:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .8.1-.6.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5a4 4 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .8-.2 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.2 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7a4 4 0 0 1 1 2.7c0 3.9-2.3 4.8-4.6 5 .4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/></svg>`,
  hf:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a8 8 0 0 0-8 8c0 1.1.2 2.1.6 3a2 2 0 0 0 .9 3.7 2 2 0 0 0 3.3 1.6 8 8 0 0 0 6.4 0 2 2 0 0 0 3.3-1.6 2 2 0 0 0 .9-3.7c.4-.9.6-1.9.6-3a8 8 0 0 0-8-8zm-3 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-3 5c-1.7 0-3-1-3-2h6c0 1-1.3 2-3 2z"/></svg>`,
  x:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-7-6.1 7H1.6l8-9.2L1 2h7l4.8 6.4L18.9 2Zm-2.4 18h1.9L7.6 4H5.6l10.9 16Z"/></svg>`,
  email:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  web:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>`,
};

function memEsc(s){ return (s==null?"":String(s)).replace(/[&<>"]/g,c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c])); }
function initials(name){ return name.split(/\s+/).slice(0,2).map(w=>w[0]).join("").toUpperCase(); }

function memberLinks(links){
  if(!links) return "";
  const order = ["scholar","openalex","github","hf","x","web","email"];
  return `<div class="member__links">` + order.filter(k=>links[k]).map(k=>{
    const href = k==="email" ? "mailto:"+links[k] : links[k];
    return `<a class="iconlink" href="${memEsc(href)}" target="_blank" rel="noopener" aria-label="${k}">${LINK_ICONS[k]}</a>`;
  }).join("") + `</div>`;
}

function leadCard(m, lang){
  const name = lang==="ar"?m.name_ar:m.name_en;
  const bio = lang==="ar"?(m.bio_ar||m.area_ar):(m.bio_en||m.area_en);
  const photo = m.photo
    ? `<img class="lead-card__photo" src="${memEsc(m.photo)}" alt="${memEsc(name)}">`
    : `<div class="lead-card__photo" style="display:grid;place-items:center;color:#fff;font-family:var(--font-display);font-size:62px;background:${m.color||'#0f5c4a'}">${initials(m.name_en)}</div>`;
  return `<div class="lead-card reveal">
    ${photo}
    <div>
      <div class="lead-card__role">${t("mem.lead.role")}</div>
      <h2>${memEsc(name)}</h2>
      <div class="lead-card__aff">${lang==="ar"?m.role_ar:m.role_en}</div>
      <p class="lead-card__bio">${memEsc(bio)}</p>
      ${memberLinks(m.links)}
    </div>
  </div>`;
}

function memberCard(m, lang){
  const name = lang==="ar"?m.name_ar:m.name_en;
  const avatar = m.photo
    ? `<img class="member__photo" src="${memEsc(m.photo)}" alt="${memEsc(name)}">`
    : `<div class="member__avatar" style="background:${m.color||'#0f5c4a'}">${initials(m.name_en)}</div>`;
  return `<div class="card member reveal">
    ${avatar}
    <h3>${memEsc(name)}</h3>
    <div class="member__role">${memEsc(lang==="ar"?m.role_ar:m.role_en)}</div>
    <div class="member__area">${memEsc(lang==="ar"?m.area_ar:m.area_en)}</div>
    ${memberLinks(m.links)}
  </div>`;
}

async function initMembersPage(){
  const host = document.getElementById("members-root");
  let data;
  try{ data = await (await fetch("./data/members.json")).json(); }
  catch(e){ host.innerHTML = `<div class="state">Couldn't load members.</div>`; return; }

  function render(){
    const lang = currentLang();
    const members = data.members||[];
    const lead = members.find(m=>m.group==="lead");
    const groups = [
      ["faculty","mem.g.faculty"],
      ["students","mem.g.students"],
      ["alumni","mem.g.alumni"],
    ];
    let html = "";
    if(lead) html += leadCard(lead, lang);
    groups.forEach(([g,key])=>{
      const list = members.filter(m=>m.group===g);
      if(!list.length) return;
      html += `<h2 class="memgroup-title">${t(key)}</h2>
        <div class="cards cards--3" style="margin-bottom:40px">${list.map(m=>memberCard(m,lang)).join("")}</div>`;
    });
    host.innerHTML = html;
    if(window.iwanReveal) window.iwanReveal(host);
  }
  render();
  document.addEventListener("langchange", render);
}
