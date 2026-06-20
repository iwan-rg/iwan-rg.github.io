/* =========================================================
   main.js — shared site behaviour
   ========================================================= */
(function(){
  // ---- mobile nav ----
  const burger = document.querySelector(".nav__burger");
  const links = document.querySelector(".nav__links");
  if(burger && links){
    burger.addEventListener("click", ()=> links.classList.toggle("open"));
    links.querySelectorAll("a").forEach(a=> a.addEventListener("click", ()=> links.classList.remove("open")));
  }

  // ---- active nav link ----
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach(a=>{
    const href = a.getAttribute("href");
    if(href === here || (here === "" && href === "index.html")) a.classList.add("is-active");
  });

  // ---- scroll reveal ----
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries)=>{
        entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
      },{threshold:.12, rootMargin:"0px 0px -40px 0px"})
    : null;
  function watch(scope){
    (scope||document).querySelectorAll(".reveal:not(.in)").forEach((el,i)=>{
      if(io){ el.style.transitionDelay = Math.min(i*60,360)+"ms"; io.observe(el); }
      else el.classList.add("in");
    });
  }
  watch();
  // expose so async-rendered content can register
  window.iwanReveal = watch;

  // ---- count-up for hero stats ----
  function animateCount(el){
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if(isNaN(target)) return;
    const dur = 1100, start = performance.now();
    function step(now){
      const p = Math.min((now-start)/dur, 1);
      const eased = 1-Math.pow(1-p,3);
      const val = target * eased;
      el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(0)) + suffix;
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const counters = document.querySelectorAll("[data-count]");
  if(counters.length){
    const co = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ animateCount(e.target); co.unobserve(e.target); } });
    },{threshold:.5});
    counters.forEach(c=> co.observe(c));
  }
})();
