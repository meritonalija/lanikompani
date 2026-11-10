// Product-family identifiers and nominal depths only. See docs/product-sources.md.
// Performance figures must come from the exact manufacturer's technical sheet.
const profileCatalog = [
  {
    id: "schuco-living-as",
    brand: "Schüco",
    family: "LivIng",
    model: "82 AS",
    depth: 82,
    seal: "AS",
    description: [
      "Profil LivIng me guarnicione në ndalesat e kornizës dhe krahut. Alternativë ndaj variantit MD brenda familjes 82 mm.",
      "LivIng profile with rebate seals at the frame and sash. An alternative to the MD variant in the 82 mm family.",
    ],
    use: [
      "Dritare PVC për ndërtime të reja dhe rinovime.",
      "PVC windows for new builds and renovations.",
    ],
  },
  {
    id: "schuco-living-md",
    brand: "Schüco",
    family: "LivIng",
    model: "82 MD",
    depth: 82,
    seal: "MD",
    description: [
      "Varianti LivIng me vulosje qendrore. Shtresa e mesme e hermetizimit e dallon nga LivIng AS; konfigurimi i xhamit zgjidhet veçmas.",
      "The LivIng variant with a centre seal. The middle sealing level distinguishes it from LivIng AS; glazing is specified separately.",
    ],
    use: [
      "Projekte ku kërkohet sistem me vulosje qendrore.",
      "Projects specifying a centre-seal system.",
    ],
  },
  {
    id: "schuco-ct70",
    brand: "Schüco",
    family: "CT 70",
    model: "70 AS",
    depth: 70,
    seal: "AS",
    description: [
      "Familja Schüco me thellësi bazë 70 mm dhe vulosje në ndalesë. Sistem i veçantë nga LivIng 82, me gjeometri dhe konfigurim të vetin.",
      "The Schüco family with a nominal depth of 70 mm and rebate sealing. A separate system from LivIng 82, with its own geometry and configuration.",
    ],
    use: [
      "Rinovime dhe zgjidhje me profil 70 mm.",
      "Renovations and solutions requiring a 70 mm profile.",
    ],
  },
  {
    id: "kommerling-70-ad",
    brand: "Kömmerling",
    family: "70",
    model: "70 AD",
    depth: 70,
    seal: "AD",
    description: [
      "Sistem PVC me thellësi bazë 70 mm dhe vulosje në ndalesë. Nuk është i njëjti profil me seritë 76 ose 88 mm.",
      "A PVC system with a nominal depth of 70 mm and rebate sealing. It is a separate profile from the 76 and 88 mm series.",
    ],
    use: [
      "Projekte me kërkesë për sistem PVC 70 mm.",
      "Projects specifying a 70 mm PVC system.",
    ],
  },
  {
    id: "kommerling-76-ad",
    brand: "Kömmerling",
    family: "76",
    model: "76 AD",
    depth: 76,
    seal: "AD",
    description: [
      "Varianti 76 mm me vulosje në ndalesë. Dallohet nga 76 MD nga koncepti i hermetizimit, edhe pse thellësia bazë është e njëjtë.",
      "The 76 mm variant with rebate sealing. Its sealing concept differs from 76 MD despite the same nominal depth.",
    ],
    use: [
      "Dritare PVC me konfigurim AD.",
      "PVC windows with an AD sealing configuration.",
    ],
  },
  {
    id: "kommerling-76-md",
    brand: "Kömmerling",
    family: "76",
    model: "76 MD",
    depth: 76,
    seal: "MD",
    description: [
      "Varianti 76 mm me vulosje qendrore. Guarnicioni i mesëm e dallon nga 76 AD dhe krijon një nivel shtesë të hermetizimit.",
      "The 76 mm centre-seal variant. Its middle gasket distinguishes it from 76 AD and provides an additional sealing level.",
    ],
    use: [
      "Projekte me sistem 76 mm dhe vulosje qendrore.",
      "Projects requiring a 76 mm centre-seal system.",
    ],
  },
  {
    id: "kommerling-88-md",
    brand: "Kömmerling",
    family: "88",
    model: "88 MD",
    depth: 88,
    seal: "MD",
    description: [
      "Familja Kömmerling 88 mm me vulosje qendrore. Thellësi më e madhe e profilit; vlera e izolimit të dritares përcaktohet nga konfigurimi i plotë.",
      "The Kömmerling 88 mm centre-seal family. A deeper profile; the window’s insulation performance depends on its full configuration.",
    ],
    use: [
      "Projekte që specifikojnë familjen 88 mm.",
      "Projects specifying the 88 mm family.",
    ],
  },
];
(() => {
  const $ = (s) => document.querySelector(s);
  let brand = "all";
  const en = () => document.documentElement.lang === "en";
  const text = (sq, english) => (en() ? english : sq);
  function source(p) {
    return p.brand === "Schüco"
      ? "https://www.schueco.com/"
      : "https://www.koemmerling.com/";
  }
  function seal(p) {
    return p.seal === "MD"
      ? text("Vulosje qendrore", "Centre seal")
      : text("Vulosje në ndalesë", "Rebate seal");
  }
  function renderCatalog() {
    const shown = profileCatalog.filter(
      (p) => brand === "all" || p.brand === brand,
    );
    $("#profileCards").innerHTML = shown
      .map(
        (p) =>
          `<article class="profile-card" id="profile-${p.id}"><div class="profile-card-top"><span>${p.brand}</span><span class="profile-type">PVC · ${p.seal}</span></div><div class="profile-visual" aria-hidden="true"><div class="profile-frame"><i></i><i></i><span class="seal-line ${p.seal === "MD" ? "central" : ""}"></span></div><span>${p.depth}<small>mm</small></span></div><div class="profile-card-body"><p class="profile-family">${p.brand === "Schüco" ? p.family : "Kömmerling"}</p><h3>${p.brand === "Schüco" && p.family === "CT 70" ? "CT 70 AS" : p.model}</h3><dl><div><dt>${text("Thellësia bazë", "Nominal depth")}</dt><dd>${p.depth} mm</dd></div><div><dt>${text("Hermetizimi", "Sealing")}</dt><dd>${p.seal} · ${seal(p)}</dd></div></dl><details><summary>${text("Çfarë e dallon?", "What makes it different?")} <span>+</span></summary><p>${p.description[en() ? 1 : 0]}</p><p class="profile-use">${p.use[en() ? 1 : 0]}</p><a href="${source(p)}" target="_blank" rel="noopener noreferrer">${text("Faqja e prodhuesit", "Manufacturer website")} ↗</a></details><a class="profile-quote" href="#oferte" data-profile-quote="${p.id}">${text("Kërko për këtë profil", "Enquire about this profile")} <span>↗</span></a></div></article>`,
      )
      .join("");
    $("#profileCount").textContent = text(
      `${shown.length} profile`,
      `${shown.length} profiles`,
    );
    document
      .querySelectorAll("[data-brand]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.brand === brand)),
      );
    $("#comparisonBody").innerHTML = profileCatalog
      .map(
        (p) =>
          `<tr><th scope="row"><a href="#profile-${p.id}" data-profile-jump="${p.id}">${p.brand} ${p.family === "LivIng" ? "LivIng " : p.family === "CT 70" ? "CT " : ""}${p.model}</a></th><td>${p.depth} mm</td><td><span class="seal-badge">${p.seal}</span> ${seal(p)}</td><td><a href="${source(p)}" target="_blank" rel="noopener noreferrer">${p.brand} ↗</a></td></tr>`,
      )
      .join("");
    document.dispatchEvent(new Event("catalogrender"));
  }
  document.querySelectorAll("[data-brand]").forEach((b) =>
    b.addEventListener("click", () => {
      brand = b.dataset.brand;
      renderCatalog();
    }),
  );
  document.addEventListener("click", (e) => {
    const quote = e.target.closest("[data-profile-quote]");
    if (quote) {
      const p = profileCatalog.find((p) => p.id === quote.dataset.profileQuote);
      $("#userService").value = profileName(p);
    }
    const jump = e.target.closest("[data-profile-jump]");
    if (jump && brand !== "all") {
      brand = "all";
      renderCatalog();
    }
  });
  function profileName(p) {
    return `${p.brand} ${p.family === "LivIng" ? "LivIng " : p.family === "CT 70" ? "CT " : ""}${p.model}`;
  }
  const group = document.createElement("optgroup");
  group.label = "PVC · Schüco / Kömmerling";
  profileCatalog.forEach((p) => {
    const o = document.createElement("option");
    o.value = o.textContent = profileName(p);
    group.append(o);
  });
  $("#userService")
    .querySelectorAll("option")
    .forEach((o) => {
      if (/Schüco|Kömmerling/.test(o.value)) o.remove();
    });
  $("#userService").insertBefore(group, $("#userService").children[1]);
  document.addEventListener("languagechange", renderCatalog);
  renderCatalog();
  // Three opening concepts, illustrated rather than advertised as a specific product.
  const demo = $("#windowDemo");
  let mode = "turn",
    opened = false;
  function renderDemo() {
    demo.dataset.mode = mode;
    demo.classList.toggle("is-open", opened);
    $("#demoToggle").setAttribute("aria-pressed", String(opened));
    $("#demoState").textContent = opened
      ? text("Mbylle pamjen", "Close the preview")
      : text("Provoje hapjen", "Try the opening");
    document
      .querySelectorAll("[data-opening]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.opening === mode)),
      );
  }
  document.querySelectorAll("[data-opening]").forEach((b) =>
    b.addEventListener("click", () => {
      mode = b.dataset.opening;
      opened = false;
      renderDemo();
    }),
  );
  $("#demoToggle").addEventListener("click", () => {
    opened = !opened;
    renderDemo();
  });
  document.addEventListener("languagechange", renderDemo);
  renderDemo();
  window.revealProfile = (id) => {
    brand = "all";
    renderCatalog();
    document
      .getElementById("profile-" + id)
      ?.scrollIntoView({ behavior: "instant" });
  };
})();
