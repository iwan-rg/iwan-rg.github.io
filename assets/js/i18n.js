/* =========================================================
   i18n — bilingual (EN / AR) string table + RTL toggle
   Usage: <span data-i18n="nav.home"></span>
          placeholder via data-i18n-attr="placeholder:pub.search"
   ========================================================= */
const I18N = {
  en: {
    "meta.dir": "ltr",
    "brand.name": "iWAN",
    "brand.sub": "Research Group",
    "nav.home": "Home",
    "nav.research": "Research",
    "nav.publications": "Publications",
    "nav.members": "Members",
    "nav.projects": "Projects",
    "nav.resources": "Resources",
    "nav.join": "Join Us",
    "lang.switch": "العربية",

    "hero.eyebrow": "King Saud University · Riyadh",
    "hero.title": "Advancing the science of <em>Arabic language</em> technology.",
    "hero.lead": "iWAN is a research group building open models, datasets, and tools for Arabic Natural Language Processing — from large language models and dialects to speech, sentiment, and responsible AI.",
    "hero.cta1": "Explore publications",
    "hero.cta2": "View on GitHub",
    "hero.stat1": "Publications",
    "hero.stat2": "Citations",
    "hero.stat3": "Open datasets",
    "hero.stat4": "h-index",
    "hero.chip1": "Open datasets",
    "hero.chip1s": "on Hugging Face",
    "hero.chip2": "Arabic LLMs",
    "hero.chip2s": "models & surveys",

    "topics.label": "Focus areas",

    "about.eyebrow": "Who we are",
    "about.title": "An Arabic NLP lab with an open-science heart.",
    "about.lead": "Based in the Information Technology Department at King Saud University, iWAN brings together faculty, researchers, and graduate students working at the frontier of Arabic language technology. We publish openly and release our models and datasets to the community.",
    "about.quote": "We build language technology that serves Arabic speakers — open, rigorous, and rooted in the richness of the language and its dialects.",
    "about.quotec": "— iWAN Research Group",

    "focus.title": "What we work on",
    "focus.lead": "Our research spans the Arabic NLP stack, from foundational resources to applied, human-centered systems.",
    "focus.1t": "Large Language Models",
    "focus.1d": "Building and evaluating LLMs for Modern Standard Arabic and its dialects, including surveys and benchmarks.",
    "focus.2t": "Datasets & Corpora",
    "focus.2d": "Open, reusable corpora for NER, sentiment, parallel text, and cross-lingual transfer.",
    "focus.3t": "Sentiment & Social",
    "focus.3d": "Sentiment analysis, hate-speech and content understanding across the Arabic social web.",
    "focus.4t": "Speech & Accessibility",
    "focus.4d": "Arabic speech processing and assistive, human-centered AI for inclusive technology.",
    "focus.5t": "Computational Linguistics",
    "focus.5d": "Topic modeling, morphology, and the linguistic foundations of Arabic text.",
    "focus.6t": "Responsible AI",
    "focus.6d": "Fairness, politeness, bias, and the social impact of Arabic language models.",
    "focus.7t": "Eye Tracking",
    "focus.7d": "Eye-tracking studies of Arabic reading — readability, text complexity, and reading behaviour across readers.",
    "focus.8t": "Neuro-Cognitive NLP",
    "focus.8d": "Linking brain and cognition to language — neurocognitive markers of LLM prompting and cognition-driven NLP.",

    "home.pubs.title": "Recent publications",
    "home.pubs.lead": "Automatically synced from OpenAlex — always current.",
    "home.pubs.all": "See all publications",

    "cta.title": "Collaborate with iWAN",
    "cta.lead": "We welcome research collaborations, student inquiries, and partnerships in Arabic language technology.",
    "cta.btn1": "Meet the team",
    "cta.btn2": "Visit KSU site",

    "foot.tag": "Arabic Natural Language Processing research at King Saud University.",
    "foot.explore": "Explore",
    "foot.connect": "Connect",
    "foot.rights": "iWAN Research Group · King Saud University.",
    "foot.built": "Publications auto-updated from OpenAlex.",

    "pub.eyebrow": "Open research",
    "pub.title": "Publications",
    "pub.lead": "A live, automatically updated record of the group's research output, aggregated from OpenAlex across our members.",
    "pub.search": "Search by title, author, or venue…",
    "pub.f.all": "All",
    "pub.f.journal": "Journal",
    "pub.f.conference": "Conference",
    "pub.f.preprint": "Preprint",
    "pub.f.book": "Book / Chapter",
    "pub.count": "publications",
    "pub.loading": "Fetching the latest publications…",
    "pub.error": "Couldn't load publications right now. Showing what we have cached, or try again shortly.",
    "pub.empty": "No publications match your search.",
    "pub.cites": "cites",
    "pub.oa": "Open access",
    "pub.doi": "DOI",
    "pub.updated": "Last updated",

    "mem.eyebrow": "The people",
    "mem.title": "Members",
    "mem.lead": "Faculty, researchers, and graduate students advancing Arabic language technology at King Saud University.",
    "mem.lead.role": "Group Lead · Principal Investigator",
    "mem.g.faculty": "Faculty & Senior Researchers",
    "mem.g.students": "Researchers & Graduate Students",
    "mem.g.alumni": "Alumni & Collaborators",
    "mem.join.t": "Join the group",
    "mem.join.d": "We're always looking for motivated graduate students and collaborators in Arabic NLP.",
    "mem.join.b": "Apply now",
    "mem.join.formtitle": "Application form",
    "mem.join.formlead": "Complete the form below to apply to join iWAN. The form is in Arabic.",
    "mem.join.fallback": "Trouble viewing the form? Open it on the iWAN site ↗",
    "join.lead": "We're always looking for motivated graduate students, researchers, and collaborators in Arabic language technology. Apply using the form below.",

    "res.eyebrow": "Build with us",
    "res.title": "Resources",
    "res.lead": "Our open models, datasets, code, and community — free to explore, use, and build upon.",
    "res.platforms": "Platforms",
    "res.gh.title": "GitHub repositories",
    "res.gh.lead": "Surveys, corpora, and code — synced live from the iwan-rg organization.",
    "res.hf.title": "Hugging Face",
    "res.hf.lead": "Models and datasets, synced live from the iwan-rg organization.",
    "res.models": "Models",
    "res.datasets": "Datasets",
    "res.stars": "stars",
    "res.forks": "forks",
    "res.downloads": "downloads",
    "res.likes": "likes",
    "res.viewall": "View all",
    "res.loading": "Loading…",

    "proj.eyebrow": "What we build",
    "proj.title": "Projects",
    "proj.lead": "Selected past and ongoing projects — datasets, benchmarks, and systems for Arabic language technology.",
    "proj.current": "Current projects",
    "proj.past": "Past projects",
    "proj.current.badge": "Ongoing",
    "proj.past.badge": "Completed",
    "proj.link": "Learn more",
  },

  ar: {
    "meta.dir": "rtl",
    "brand.name": "إيوان",
    "brand.sub": "مجموعة بحثية",
    "nav.home": "الرئيسية",
    "nav.research": "أبحاثنا",
    "nav.publications": "الأوراق البحثية",
    "nav.members": "الأعضاء",
    "nav.projects": "المشاريع",
    "nav.resources": "المصادر",
    "nav.join": "انضم إلينا",
    "lang.switch": "English",

    "hero.eyebrow": "جامعة الملك سعود · الرياض",
    "hero.title": "نُطوّر علم تقنيات <em>اللغة العربية</em>.",
    "hero.lead": "إيوان مجموعة بحثية تبني نماذج ومجموعات بيانات وأدوات مفتوحة لمعالجة اللغة العربية طبيعيًا — من النماذج اللغوية الكبيرة واللهجات إلى الكلام وتحليل المشاعر والذكاء الاصطناعي المسؤول.",
    "hero.cta1": "استعرض الأوراق البحثية",
    "hero.cta2": "تابعنا على GitHub",
    "hero.stat1": "الأوراق البحثية",
    "hero.stat2": "اقتباس",
    "hero.stat3": "مجموعة بيانات",
    "hero.stat4": "مؤشر h",
    "hero.chip1": "بيانات مفتوحة",
    "hero.chip1s": "على Hugging Face",
    "hero.chip2": "نماذج عربية",
    "hero.chip2s": "نماذج ومراجعات",

    "topics.label": "مجالات التركيز",

    "about.eyebrow": "من نحن",
    "about.title": "مختبرٌ لمعالجة العربية بروح العلم المفتوح.",
    "about.lead": "تتخذ مجموعة إيوان من قسم تقنية المعلومات بجامعة الملك سعود مقرًّا لها، وتضم أعضاء هيئة تدريس وباحثين وطلاب دراسات عليا يعملون على حدود تقنيات اللغة العربية. ننشر أبحاثنا علنًا، ونُتيح نماذجنا وبياناتنا للمجتمع.",
    "about.quote": "نبني تقنيةً لغويةً تخدم الناطقين بالعربية — مفتوحةً ودقيقةً ومتجذّرةً في ثراء اللغة ولهجاتها.",
    "about.quotec": "— مجموعة إيوان البحثية",

    "focus.title": "مجالات عملنا",
    "focus.lead": "تمتد أبحاثنا عبر منظومة معالجة اللغة العربية، من المصادر الأساسية إلى الأنظمة التطبيقية المتمحورة حول الإنسان.",
    "focus.1t": "النماذج اللغوية الكبيرة",
    "focus.1d": "بناء وتقييم النماذج اللغوية للعربية الفصحى ولهجاتها، بما في ذلك المراجعات والمقاييس المرجعية.",
    "focus.2t": "البيانات والمدوّنات",
    "focus.2d": "مدوّنات مفتوحة قابلة لإعادة الاستخدام للتعرف على الكيانات وتحليل المشاعر والنصوص المتوازية.",
    "focus.3t": "المشاعر ووسائل التواصل",
    "focus.3d": "تحليل المشاعر وخطاب الكراهية وفهم المحتوى عبر الويب الاجتماعي العربي.",
    "focus.4t": "الكلام وإمكانية الوصول",
    "focus.4d": "معالجة الكلام العربي والذكاء الاصطناعي المساعد المتمحور حول الإنسان لتقنيةٍ شاملة.",
    "focus.5t": "اللسانيات الحاسوبية",
    "focus.5d": "نمذجة المواضيع والصرف والأسس اللغوية للنص العربي.",
    "focus.6t": "الذكاء الاصطناعي المسؤول",
    "focus.6d": "العدالة والتأدّب والتحيّز والأثر الاجتماعي للنماذج اللغوية العربية.",
    "focus.7t": "تتبّع حركة العين",
    "focus.7d": "دراسات تتبّع حركة العين لقراءة العربية — سهولة القراءة وتعقيد النص وسلوك القارئ.",
    "focus.8t": "المعالجة العصبية-الإدراكية",
    "focus.8d": "ربط الدماغ والإدراك باللغة — المؤشرات العصبية-الإدراكية لتوجيه النماذج اللغوية والمعالجة المدفوعة بالإدراك.",

    "home.pubs.title": "أحدث الأوراق البحثية",
    "home.pubs.lead": "تُحدَّث تلقائيًا من OpenAlex — محدّثة دائمًا.",
    "home.pubs.all": "عرض جميع الأوراق البحثية",

    "cta.title": "تعاون مع إيوان",
    "cta.lead": "نرحّب بالتعاون البحثي واستفسارات الطلاب والشراكات في مجال تقنيات اللغة العربية.",
    "cta.btn1": "تعرّف على الفريق",
    "cta.btn2": "موقع الجامعة",

    "foot.tag": "أبحاث معالجة اللغة العربية طبيعيًا في جامعة الملك سعود.",
    "foot.explore": "استكشف",
    "foot.connect": "تواصل",
    "foot.rights": "مجموعة إيوان البحثية · جامعة الملك سعود.",
    "foot.built": "الأوراق البحثية محدّثة تلقائيًا من OpenAlex.",

    "pub.eyebrow": "بحثٌ مفتوح",
    "pub.title": "الأوراق البحثية",
    "pub.lead": "سجلٌّ حيٌّ ومُحدَّثٌ تلقائيًا للإنتاج البحثي للمجموعة، مُجمَّع من OpenAlex عبر أعضائنا.",
    "pub.search": "ابحث بالعنوان أو المؤلف أو جهة النشر…",
    "pub.f.all": "الكل",
    "pub.f.journal": "مجلة",
    "pub.f.conference": "مؤتمر",
    "pub.f.preprint": "مسودة",
    "pub.f.book": "كتاب / فصل",
    "pub.count": "ورقة بحثية",
    "pub.loading": "جارٍ جلب أحدث الأوراق البحثية…",
    "pub.error": "تعذّر تحميل الأوراق البحثية الآن. نعرض النسخة المخزّنة، أو حاول مجددًا بعد قليل.",
    "pub.empty": "لا توجد أوراق بحثية تطابق بحثك.",
    "pub.cites": "اقتباس",
    "pub.oa": "وصول مفتوح",
    "pub.doi": "DOI",
    "pub.updated": "آخر تحديث",

    "mem.eyebrow": "الأشخاص",
    "mem.title": "الأعضاء",
    "mem.lead": "أعضاء هيئة تدريس وباحثون وطلاب دراسات عليا يطوّرون تقنيات اللغة العربية في جامعة الملك سعود.",
    "mem.lead.role": "قائدة المجموعة · الباحث الرئيسي",
    "mem.g.faculty": "أعضاء هيئة التدريس والباحثون",
    "mem.g.students": "الباحثون وطلاب الدراسات العليا",
    "mem.g.alumni": "الخريجون والمتعاونون",
    "mem.join.t": "انضمّ إلى المجموعة",
    "mem.join.d": "نبحث دائمًا عن طلاب دراسات عليا متحمّسين ومتعاونين في معالجة اللغة العربية.",
    "mem.join.b": "قدّم الآن",
    "mem.join.formtitle": "نموذج الانضمام",
    "mem.join.formlead": "عبّئ النموذج أدناه لتقديم طلب الانضمام إلى إيوان.",
    "mem.join.fallback": "تواجه مشكلة في عرض النموذج؟ افتحه على موقع إيوان ↗",
    "join.lead": "نبحث دائمًا عن طلاب دراسات عليا وباحثين ومتعاونين متحمّسين في مجال تقنيات اللغة العربية. قدّم طلبك عبر النموذج أدناه.",

    "res.eyebrow": "ابْنِ معنا",
    "res.title": "المصادر",
    "res.lead": "نماذجنا وبياناتنا وأكوادنا ومجتمعنا المفتوح — متاحة للاستكشاف والاستخدام والبناء عليها.",
    "res.platforms": "المنصّات",
    "res.gh.title": "مستودعات GitHub",
    "res.gh.lead": "مراجعات ومدوّنات وأكواد — تُحدَّث مباشرةً من منظمة iwan-rg.",
    "res.hf.title": "Hugging Face",
    "res.hf.lead": "نماذج ومجموعات بيانات تُحدَّث مباشرةً من منظمة iwan-rg.",
    "res.models": "نماذج",
    "res.datasets": "مجموعات بيانات",
    "res.stars": "نجمة",
    "res.forks": "تفرّع",
    "res.downloads": "تنزيل",
    "res.likes": "إعجاب",
    "res.viewall": "عرض الكل",
    "res.loading": "جارٍ التحميل…",

    "proj.eyebrow": "ما نبنيه",
    "proj.title": "المشاريع",
    "proj.lead": "مختارات من مشاريعنا الحالية والسابقة — مجموعات بيانات ومقاييس وأنظمة لتقنيات اللغة العربية.",
    "proj.current": "المشاريع الحالية",
    "proj.past": "المشاريع السابقة",
    "proj.current.badge": "جارٍ",
    "proj.past.badge": "مكتمل",
    "proj.link": "اعرف المزيد",
  }
};

const I18N_STORE = "iwan-lang";

function currentLang(){
  return localStorage.getItem(I18N_STORE) || "en";
}

function t(key){
  const lang = currentLang();
  return (I18N[lang] && I18N[lang][key]) || (I18N.en[key]) || key;
}

function applyLang(lang){
  const dict = I18N[lang] || I18N.en;
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
  localStorage.setItem(I18N_STORE, lang);

  // text nodes
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(dict[key] !== undefined) el.innerHTML = dict[key];
  });
  // attributes, e.g. data-i18n-attr="placeholder:pub.search"
  document.querySelectorAll("[data-i18n-attr]").forEach(el=>{
    el.getAttribute("data-i18n-attr").split(",").forEach(pair=>{
      const [attr,key] = pair.split(":").map(s=>s.trim());
      if(dict[key] !== undefined) el.setAttribute(attr, dict[key]);
    });
  });
  // toggle button label
  const tg = document.querySelector("[data-lang-toggle] .lang-toggle__ar");
  if(tg) tg.textContent = dict["lang.switch"];

  document.dispatchEvent(new CustomEvent("langchange",{detail:{lang}}));
}

function initI18n(){
  applyLang(currentLang());
  const btn = document.querySelector("[data-lang-toggle]");
  if(btn) btn.addEventListener("click", ()=>{
    applyLang(currentLang() === "en" ? "ar" : "en");
  });
}

document.addEventListener("DOMContentLoaded", initI18n);
