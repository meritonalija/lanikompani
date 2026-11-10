const $ = (selector) => document.querySelector(selector);
$("#facadeQuote").addEventListener("click", () => {
  $("#userService").value = "Fasada";
});
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
  if (location.hash === "#fasada-strukturale") {
    $("#sistemet").scrollIntoView({ behavior: "instant" });
  } else if (
    location.hash === "#sliding-systems" ||
    location.hash === "#roleta-alumini"
  ) {
    $("#userService").value =
      location.hash === "#sliding-systems" ? "Panorama" : "Roleta / Alubond";
    $("#oferte").scrollIntoView({ behavior: "instant" });
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
