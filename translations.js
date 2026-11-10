const english = {
  skip: "Skip to content",
  nav_products: "Systems",
  nav_about: "Our philosophy",
  collection: "Collection",
  nav_contact: "Contact",
  start: "Start a project",
  hero_eyebrow: "YOUR SPACE. A NEW PERSPECTIVE.",
  hero_line1: "More light.",
  hero_line2: "More life.",
  hero_line3: "By design.",
  hero_desc:
    "Windows, doors and facades that transform the way you experience a space.",
  precision: "PRECISION IN EVERY MILLIMETRE",
  hero_note: "NO BOUNDARIES BETWEEN INSIDE AND OUT",
  hero_note_title: "Open your horizon.",
  hero_bottom: "CRAFT · COMMITMENT · PRECISION",
  scroll: "SCROLL TO DISCOVER",
  partners: "BUILT WITH PROFILES FROM",
  partner_end: "European engineering.\nLocal dedication.",
  about_kicker: "01 / OUR PHILOSOPHY",
  statement:
    "A window is not<br>the end of a wall.<br>It is <em>the start of a view.</em>",
  about_text:
    "At LANI KOMPANI, we believe good details are felt every day. In a quieter home, a warmer room, and the daylight that comes inside.",
  discover: "Discover the difference",
  value1: "Uncompromising aesthetics.",
  value1_desc:
    "Clean lines and considered proportions, designed around your architecture.",
  value2: "Comfort you can feel.",
  value2_desc:
    "Insulation systems that bring greater quiet and thermal balance.",
  value3: "The detail makes the difference.",
  value3_desc:
    "From profile selection to measurement and the final installation.",
  systems_kicker: "02 / OUR SYSTEMS",
  systems_title: "Different forms.<br><em>The same standard.</em>",
  systems_desc:
    "Choose a system. Explore the details. Find the right solution for your project.",
  facades: "Facades",
  shutters: "Shutters / Alubond",
  finishes: "SELECTED FINISHES",
  product_quote: "Request a quote for this system",
  spec_note:
    "Final specifications and available finishes are confirmed for your project configuration.",
  panorama_kicker: "ARCHITECTURE THAT BREATHES",
  panorama_title: "Less frame.<br><em>More world.</em>",
  explore: "Explore\nPanorama",
  panorama_bottom: "LARGE SPACES. A NATURAL CONNECTION.",
  collection_kicker: "03 / IN FOCUS",
  collection_note: "MATERIALS. FORMS. POSSIBILITIES.",
  collection_title: "Well considered.<br><em>Beautifully built.</em>",
  collection_desc:
    "From the transparency of glass to the precision of a profile. A closer look at our world of systems.",
  gallery1: "Transparency with character.",
  gallery2: "Daylight in every detail.",
  process_kicker: "04 / FROM IDEA TO REALITY",
  process_title: "Your project.<br><em>Our dedication.</em>",
  process_desc: "A clear process, with direct communication at every step.",
  talk: "Let’s talk",
  step1: "We listen.",
  step1_desc: "Tell us about your idea, your space and your expectations.",
  step2: "We make it precise.",
  step2_desc:
    "We establish the measurements, profile, glazing and the right finish.",
  step3: "We give it form.",
  step3_desc: "Production and installation with attention to every detail.",
  quote_kicker: "LET’S CREATE SOMETHING BEAUTIFUL.",
  quote_title:
    'Every space<br>begins with<br><em>an idea.</em><span class="red">↗</span>',
  quote_desc:
    "Tell us yours. Complete the enquiry and continue the conversation directly with us.",
  form_title: "REQUEST A QUOTE",
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
  faq_kicker: "GOOD TO KNOW",
  faq_title: "Good questions.\nClear answers.",
  faq1: "How do I choose the right system?",
  faq1_desc:
    "The choice depends on your space, insulation needs and design. Contact us to discuss PVC, aluminium and panoramic systems for your project.",
  faq2: "Are my measurements enough for a quote?",
  faq2_desc:
    "Approximate measurements help us prepare an initial estimate. Final dimensions and details are confirmed before production.",
  faq3: "How long does it take?",
  faq3_desc:
    "Timing depends on the system, quantity and complexity of the project. We agree on the schedule when confirming your quote.",
  footer_kicker: "YOUR NEW PERSPECTIVE STARTS HERE.",
  top: "BACK TO TOP",
  footer_title: "Let’s talk.",
  location: "FIND US",
  address: "Orizare, Municipality of Likovo ↗",
  hours: "Monday – Saturday / 08:00 – 18:00",
  connect: "CONNECT WITH US",
  footer_end: "WITH PRECISION. WITH CHARACTER.",
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
      ? "LANI KOMPANI — Architecture of light"
      : "LANI KOMPANI — Arkitekturë e dritës";
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
