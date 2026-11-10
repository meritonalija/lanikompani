const $ = (selector) => document.querySelector(selector);
const products = {
  alu: {
    title: "Dyer & dritare\nAlumini",
    titleEn: "Aluminium\nDoors & windows",
    image: "foto_1788827375791.jpg",
    photo: true,
    caption: "ALUMINIUM",
    quote: "Dyer & dritare ALU",
    tag: ["ALUMINI · DYER & DRITARE", "ALUMINIUM · DOORS & WINDOWS"],
    description: [
      "Zgjidhje alumini për dyer dhe dritare. Seria e profilit, prania e ndërprerjes termike, xhami dhe mekanizmat përcaktohen sipas hapësirës dhe kërkesave të projektit.",
      "Aluminium solutions for doors and windows. The profile series, thermal break, glazing and hardware are specified for the space and project requirements.",
    ],
    specs: [
      ["ALU", "Materiali", "Material"],
      ["Dyer / Dritare", "Përdorimi", "Use"],
      ["Me ofertë", "Seria e profilit", "Profile series"],
    ],
  },
  sliding: {
    title: "Panorama\nSliding Systems",
    image: "foto_1788827375791.jpg",
    photo: true,
    caption: "PANORAMA / SLIDING SYSTEMS",
    quote: "Panorama",
    tag: ["ALUMINI · HAPËSIRË PA KUFI", "ALUMINIUM · SPACE WITHOUT LIMITS"],
    description: [
      "Panele xhami që rrëshqasin lehtë dhe lidhin ambientin e brendshëm me atë të jashtëm. Më shumë pamje, më shumë dritë, më shumë liri në projektim.",
      "Glazed panels that slide with ease and connect indoors with outdoors. More views, more daylight and greater design freedom.",
    ],
    specs: [
      ["ALU", "Materiali", "Material"],
      ["↔", "Hapje rrëshqitëse", "Sliding opening"],
      ["XHAM", "Panele panoramike", "Panoramic panels"],
    ],
  },
  facade: {
    title: "Fasada\nStrukturale",
    titleEn: "Structural\nFacades",
    image: "foto_1788828133911.webp",
    photo: true,
    caption: "ARCHITECTURE / GLASS & ALUMINIUM",
    quote: "Fasada",
    tag: ["XHAM · ALUMINI", "GLASS · ALUMINIUM"],
    description: [
      "Identitet arkitektonik përmes transparencës. Sisteme fasadash xhami dhe alumini, të përshtatura për ndërtesa afariste dhe projekte bashkëkohore.",
      "Architectural identity through transparency. Glass and aluminium facade systems tailored to commercial buildings and contemporary projects.",
    ],
    specs: [
      ["ALU", "Struktura", "Structure"],
      ["GLASS", "Sipërfaqja", "Surface"],
      ["Projekt", "Konfigurim individual", "Individual configuration"],
    ],
  },
  shutter: {
    title: "Roleta\n& Alubond",
    titleEn: "Shutters\n& Alubond",
    image: "foto_1788828668962.webp",
    caption: "COMFORT / ALUMINIUM SYSTEMS",
    quote: "Roleta / Alubond",
    tag: ["ALUMINI · KONTROLL & MBROJTJE", "ALUMINIUM · CONTROL & PROTECTION"],
    description: [
      "Kontrolloni dritën dhe privatësinë me roleta alumini. Plotësoni pamjen e objektit me veshje Alubond, sipas karakterit të arkitekturës suaj.",
      "Control daylight and privacy with aluminium shutters. Complete the building with Alubond cladding that complements your architecture.",
    ],
    specs: [
      ["ALU", "Materiali", "Material"],
      ["☼", "Kontroll i dritës", "Daylight control"],
      ["Projekt", "Konfigurim individual", "Individual configuration"],
    ],
  },
};
let activeProduct = "sliding";
function renderProduct() {
  const p = products[activeProduct];
  const en = document.documentElement.lang === "en";
  $("#productTitle").textContent = en && p.titleEn ? p.titleEn : p.title;
  $("#productTag").textContent = p.tag[en ? 1 : 0];
  $("#productDescription").textContent = p.description[en ? 1 : 0];
  $("#productImage").src = "images/" + p.image;
  $("#productImage").alt = (en && p.titleEn ? p.titleEn : p.title).replace(
    "\n",
    " ",
  );
  $(".product-image-wrap").classList.toggle("photo", !!p.photo);
  $("#productCaption").textContent = p.caption;
  $("#productSpecs").replaceChildren(
    ...p.specs.map((spec) => {
      const d = document.createElement("div");
      const strong = document.createElement("strong");
      const s = document.createElement("span");
      strong.textContent = spec[0];
      s.textContent = spec[en ? 2 : 1];
      d.append(strong, s);
      return d;
    }),
  );
}
function selectProduct(key, focus = false) {
  if (!products[key]) return;
  activeProduct = key;
  document.querySelectorAll("[data-product]").forEach((btn) => {
    const active = btn.dataset.product === key;
    btn.setAttribute("aria-selected", String(active));
    btn.tabIndex = active ? 0 : -1;
    if (active && focus) btn.focus();
  });
  $("#productPanel").setAttribute("aria-labelledby", "tab-" + key);
  renderProduct();
}
document.querySelectorAll("[data-product]").forEach((btn) => {
  btn.addEventListener("click", () => selectProduct(btn.dataset.product));
  btn.addEventListener("keydown", (e) => {
    const keys = Object.keys(products);
    let next = keys.indexOf(activeProduct);
    if (e.key === "ArrowRight") next = (next + 1) % keys.length;
    else if (e.key === "ArrowLeft")
      next = (next - 1 + keys.length) % keys.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = keys.length - 1;
    else return;
    e.preventDefault();
    selectProduct(keys[next], true);
  });
});
$("#productQuote").addEventListener("click", () => {
  $("#userService").value = products[activeProduct].quote;
});
document.addEventListener("languagechange", renderProduct);
renderProduct();
const menu = $(".menu-toggle");
const nav = $("#navigation");
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
}
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
});
nav
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    closeMenu();
    menu.focus();
  }
});
matchMedia("(min-width: 801px)").addEventListener("change", (e) => {
  if (e.matches) closeMenu();
});
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
document.body.classList.add("js-ready");
let scrollQueued = false;
function updateScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  $(".scroll-progress").style.width =
    (max > 0 ? (scrollY / max) * 100 : 0) + "%";
  scrollQueued = false;
}
addEventListener(
  "scroll",
  () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateScroll);
    }
  },
  { passive: true },
);
updateScroll();
const scenes = [
  ["foto_1788828508241.webp", "Hapësirë me dritare panoramike"],
  ["foto_1788827375791.jpg", "Sistem rrëshqitës panoramik"],
  ["foto_1788828133911.webp", "Fasadë strukturore xhami"],
];
let scene = 0;
$("#nextScene").addEventListener("click", () => {
  scene = (scene + 1) % scenes.length;
  $(".hero-image").src = "images/" + scenes[scene][0];
  $(".hero-image").alt = scenes[scene][1];
  $(".visual-index>span").textContent = String(scene + 1).padStart(2, "0");
});
const gallery = $("#galleryDialog");
let galleryTrigger;
document.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-gallery]");
  if (!btn) return;
  galleryTrigger = btn;
  gallery.querySelector("img").src = btn.dataset.gallery;
  gallery.querySelector("img").alt = btn.querySelector("img").alt;
  gallery.showModal();
});
$(".dialog-close").addEventListener("click", () => gallery.close());
gallery.addEventListener("click", (e) => {
  if (e.target === gallery) gallery.close();
});
gallery.addEventListener("close", () => galleryTrigger?.focus());
$("#inquiryForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const en = document.documentElement.lang === "en";
  const value = (id) => $("#" + id).value.trim();
  const fields = en
    ? [
        "Name",
        "Phone",
        "City",
        "System",
        "Width (cm)",
        "Height (cm)",
        "Notes",
        "Quantity",
        "Finish",
        "Glazing",
        "Project type",
      ]
    : [
        "Emri",
        "Telefoni",
        "Qyteti",
        "Sistemi",
        "Gjerësia (cm)",
        "Lartësia (cm)",
        "Shënime",
        "Numri i njësive",
        "Ngjyra",
        "Xhami",
        "Lloji i projektit",
      ];
  const ids = [
    "userName",
    "userPhone",
    "userCity",
    "userService",
    "userWidth",
    "userHeight",
    "userNotes",
    "userQuantity",
    "userFinish",
    "userGlazing",
    "userProject",
  ];
  const message =
    (en ? "QUOTE REQUEST" : "KËRKESË PËR OFERTË") +
    " — LANI KOMPANI\n\n" +
    ids.map((id, i) => fields[i] + ": " + (value(id) || "—")).join("\n");
  if (e.submitter?.dataset.channel === "email") {
    location.href =
      "mailto:lanikompani5@gmail.com?subject=" +
      encodeURIComponent(
        (en ? "Quote request: " : "Kërkesë për ofertë: ") + value("userName"),
      ) +
      "&body=" +
      encodeURIComponent(message);
  } else {
    window.open(
      "https://wa.me/38971442821?text=" + encodeURIComponent(message),
      "_blank",
      "noopener,noreferrer",
    );
  }
});
$("#year").textContent = new Date().getFullYear();

// Keep existing product links working after the redesign.
function handleLegacyLink() {
  const links = {
    "#sliding-systems": "sliding",
    "#fasada-strukturale": "facade",
    "#roleta-alumini": "shutter",
  };
  const pvcLinks = {
    "#pvc-schuco": "schuco-living-md",
    "#pvc-kommerling": "kommerling-76-md",
  };
  if (location.hash.startsWith("#profile-")) {
    window.revealProfile(location.hash.slice("#profile-".length));
    return;
  }
  if (pvcLinks[location.hash]) {
    window.revealProfile(pvcLinks[location.hash]);
    return;
  }
  if (links[location.hash]) {
    selectProduct(links[location.hash]);
    $("#sistemet").scrollIntoView({ behavior: "instant" });
  } else {
    const sections = { "#per-ne": "#filozofia", "#portfolio": "#koleksioni" };
    if (sections[location.hash])
      $(sections[location.hash]).scrollIntoView({ behavior: "instant" });
  }
}
addEventListener("hashchange", handleLegacyLink);
handleLegacyLink();

// Draw interface arrows as SVG, independent of installed system fonts.
function decorateArrows() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (
      /[↗↘↑↓←→]/.test(node.textContent) &&
      !node.parentElement.closest("script,style,textarea,option,svg")
    )
      nodes.push(node);
  }
  const paths = {
    "↗": "M5 19 19 5M5 5h14v14",
    "↘": "M5 5 19 19M5 19h14V5",
    "↑": "M12 21V3M5 10l7-7 7 7",
    "↓": "M12 3v18M5 14l7 7 7-7",
    "←": "M21 12H3m7-7-7 7 7 7",
    "→": "M3 12h18m-7-7 7 7-7 7",
  };
  nodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    node.textContent.split(/([↗↘↑↓←→])/).forEach((part) => {
      if (!paths[part]) {
        fragment.append(document.createTextNode(part));
        return;
      }
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("class", "vector-arrow");
      svg.setAttribute("aria-hidden", "true");
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", paths[part]);
      svg.append(path);
      fragment.append(svg);
    });
    node.replaceWith(fragment);
  });
}
document.addEventListener("languagechange", decorateArrows);
document.addEventListener("catalogrender", decorateArrows);
decorateArrows();
