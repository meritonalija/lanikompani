const english = {
  skip: "Skip to content",
  nav_products: "Products",
  nav_about: "About us",
  collection: "Gallery",
  nav_contact: "Contact",
  start: "Request a quote",
  hero_eyebrow: "BETTER WINDOWS. BETTER LIVING.",
  hero_desc:
    "Doors, windows and facades designed for more daylight, quiet and comfort in every space.",
  hero_bottom: "PVC & ALUMINIUM · EUROPEAN PROFILES",
  partners: "Selected profiles.\nQuality that brings us together.",
  about_kicker: "LANI KOMPANI",
  statement: "Quality you can see.<br>Comfort you can feel.",
  about_text:
    "From selecting the profile to installation, we ensure every detail suits your space. PVC and aluminium doors, windows and facades, with direct communication and care at every step.",
  value1: "German and European profiles",
  value2: "Thermal and acoustic insulation",
  value3: "Measurement, production and installation",
  systems_kicker: "OUR PRODUCTS",
  systems_title: "For every space,<br>the right solution.",
  systems_desc:
    "Explore PVC profiles, aluminium systems and panoramic solutions. Select a product to see its details.",
  facades: "Facades",
  shutters: "Shutters / Alubond",
  product_quote: "Request a quote for this system",
  spec_note:
    "Final specifications and available finishes are confirmed for your project configuration.",
  collection_kicker: "A CLOSER LOOK",
  collection_title: "Where design<br>meets functionality.",
  collection_desc: "Views and details of our glass, PVC and aluminium systems.",
  gallery1: "Glass & aluminium facades",
  gallery2: "PVC windows",
  talk: "Talk to us",
  quote_kicker: "LET’S TALK ABOUT YOUR PROJECT",
  quote_title: "Share your idea.<br>We’ll handle the details.",
  quote_desc:
    "Send us approximate dimensions and the product you are interested in. We’ll continue the conversation together.",
  form_title: "Request a quote",
  name: "Full name *",
  name_ph: "Your name",
  phone: "Phone *",
  city: "City",
  city_ph: "Your city",
  service: "System *",
  choose: "Choose a system",
  sliding: "Panoramic systems",
  full_project: "Full project",
  width: "Width (cm)",
  height: "Height (cm)",
  notes: "A little more about your project",
  notes_ph: "Your idea, quantity or any other details…",
  send: "Continue on WhatsApp",
  send_email: "Or send by email ↗",
  form_note:
    "Your enquiry opens in WhatsApp or email. You confirm sending it there.",
  faq_kicker: "FREQUENTLY ASKED QUESTIONS",
  faq_title: "Helping you make\nthe right choice.",
  faq1: "How do I choose the right system?",
  faq1_desc:
    "The choice depends on your space, insulation needs and design. Contact us to discuss PVC, aluminium and panoramic systems for your project.",
  faq2: "Are my measurements enough for a quote?",
  faq2_desc:
    "Approximate measurements help us prepare an initial estimate. Final dimensions and details are confirmed before production.",
  faq3: "How long does it take?",
  faq3_desc:
    "Timing depends on the system, quantity and complexity of the project. We agree on the schedule when confirming your quote.",
  location: "FIND US",
  address: "Orizare, Municipality of Likovo ↗",
  hours: "Monday – Saturday / 08:00 – 18:00",
  connect: "CONNECT WITH US",
  footer_end: "Doors. Windows. Facades.",
  brand_line: "DOORS · WINDOWS · FACADES",
  hero_heading: "Open your home<br>to <span>daylight.</span>",
  view_products: "Explore our products",
  hero_quote: "Request a quote",
  hero_bottom_desc: "Solutions for homes and business spaces.",
};
const albanian = {};
function applyLanguage(lang) {
  lang = lang === "en" ? "en" : "sq";
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (!(key in albanian))
      albanian[key] = el.dataset.i18nHtml ? el.innerHTML : el.textContent;
    const value = lang === "en" ? english[key] : albanian[key];
    if (value !== undefined) {
      if (el.dataset.i18nHtml) el.innerHTML = value;
      else el.textContent = value;
    }
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const key = el.dataset.i18nPh;
    if (!(key in albanian)) albanian[key] = el.placeholder;
    el.placeholder = (lang === "en" ? english[key] : albanian[key]) || "";
  });
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
  document.title =
    lang === "en"
      ? "LANI KOMPANI — Doors, windows & facades"
      : "LANI KOMPANI — Dyer, dritare & fasada";
  try {
    localStorage.setItem("lani_preferred_lang", lang);
  } catch {}
  document.dispatchEvent(new CustomEvent("languagechange", { detail: lang }));
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-lang]");
  if (btn) applyLanguage(btn.dataset.lang);
});
let savedLanguage = "sq";
try {
  savedLanguage = localStorage.getItem("lani_preferred_lang") || "sq";
} catch {}
applyLanguage(savedLanguage);
