// Product data and its provenance are recorded in docs/product-sources.md.
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
// Expanded LivIng 82 MD values are transcribed from the two user-supplied references.
// They are system limits, not a performance declaration for every finished window.
const profileReferences = {
  "schuco-living-md": {
    image: "foto_1788827279996.jpg",
    imageOrigin:
      "Existing repository image previously labelled Schüco LivIng 82 MD",
    provenance: "user-supplied-technical-table-and-brochure",
  },
  "kommerling-76-md": {
    image: "profile_kommerling_76.png",
    imageOrigin:
      "Existing repository image previously labelled Kömmerling 76 MD",
    provenance: "existing-catalogue-no-new-performance-values",
  },
};
// Values supplied in the user's LivIng AS/MD brochure, separate from the MD-only table.
profileReferences["schuco-living-as"] = {
  provenance: "user-supplied-living-brochure",
  highlights: [
    ["7 dhoma · thellësi 82 mm", "7 chambers · 82 mm depth"],
    ["Vulosje në ndalesë AS", "AS rebate sealing"],
    ["Guarnicione EPDM të saldueshme", "Weldable EPDM gaskets"],
    ["Xhamëzim me dy ose tri fletë xhami", "Double or triple glazing"],
  ],
  compactTechnical: [
    ["Thellësia e sistemit", "System depth", "82 mm"],
    [
      "Uf e kornizës · referencë",
      "Frame Uf · reference value",
      "1,0 W/(m²·K)",
      "1.0 W/(m²·K)",
    ],
    ["Trashësia e xhamëzimit", "Glazing thickness", "24–52 mm"],
    ["Izolimi akustik · maksimumi", "Sound reduction · maximum", "47 dB"],
    ["Përshkueshmëria e ajrit", "Air permeability", "Klasa 4", "Class 4"],
    ["Papërshkueshmëria e ujit", "Watertightness", "Klasa 9A", "Class 9A"],
    [
      "Rezistenca ndaj vjedhjes",
      "Burglary resistance",
      "Deri në RC2",
      "Up to RC2",
    ],
  ],
};
Object.assign(profileReferences["schuco-living-md"], {
  highlights: [
    ["7 dhoma · thellësi 82 mm", "7 chambers · 82 mm depth"],
    [
      "Vulosje qendrore MD · 3 nivele hermetizimi",
      "MD centre sealing · 3 sealing levels",
    ],
    ["Guarnicione EPDM të saldueshme", "Weldable EPDM gaskets"],
    ["Xhamëzim me dy ose tri fletë xhami", "Double or triple glazing"],
  ],
  compactTechnical: [
    ["Thellësia e sistemit", "System depth", "82 mm"],
    ["Uf e kornizës (≥)", "Frame Uf (≥)", "0,96 W/(m²·K)", "0.96 W/(m²·K)"],
    ["Trashësia e xhamëzimit", "Glazing thickness", "24–52 mm"],
    [
      "Reduktimi maksimal i zërit Rwp",
      "Maximum sound reduction Rwp",
      "47 dB(A)",
    ],
    ["Përshkueshmëria e ajrit", "Air permeability", "Klasa 4", "Class 4"],
    ["Papërshkueshmëria e ujit", "Watertightness", "Klasa 9A", "Class 9A"],
    [
      "Rezistenca ndaj vjedhjes",
      "Burglary resistance",
      "Deri në RC2",
      "Up to RC2",
    ],
  ],
  extraTechnical: [
    ["Gjerësia minimale e dukshme", "Minimum face width", "120 mm"],
    ["Gjerësia maksimale e krahut", "Maximum vent width", "1 500 mm"],
    ["Lartësia maksimale e krahut", "Maximum vent height", "2 600 mm"],
    [
      "Rezistenca ndaj ngarkesës së erës",
      "Wind load resistance",
      "Klasa C5/B5",
      "Class C5/B5",
    ],
    [
      "Shënjimi CE · sipas referencës",
      "CE marking · as listed in the reference",
      "Po",
      "Yes",
    ],
  ],
});
profileCatalog.forEach((profile) =>
  Object.assign(profile, profileReferences[profile.id] || {}),
);
// Present the supplied reference model first.
profileCatalog.unshift(
  profileCatalog.splice(
    profileCatalog.findIndex((p) => p.id === "schuco-living-md"),
    1,
  )[0],
);

(() => {
  const $ = (s) => document.querySelector(s);
  let brand = "all";
  let activeProfile = "schuco-living-md";
  const technicalBreakpoint = matchMedia("(min-width: 801px)");
  technicalBreakpoint.addEventListener("change", (event) => {
    document.querySelectorAll(".profile-technical").forEach((detail) => {
      detail.open = event.matches;
    });
  });
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
  function renderProfile(p) {
    const fullName = profileName(p);
    const brandImage =
      p.brand === "Schüco"
        ? "logo_schuco_dark.png"
        : "logo_kommerling_color.png";
    const features = p.highlights || [
      [
        p.seal === "MD"
          ? "Vulosje qendrore MD"
          : `Vulosje në ndalesë ${p.seal}`,
        p.seal === "MD" ? "MD centre sealing" : `${p.seal} rebate sealing`,
      ],
      [`Thellësi bazë ${p.depth} mm`, `${p.depth} mm nominal depth`],
      [
        "Xhami dhe mekanizmi sipas konfigurimit",
        "Glazing and hardware specified for the configuration",
      ],
    ];
    const rows = p.compactTechnical || [
      ["Thellësia e sistemit", "System depth", `${p.depth} mm`],
      ["Materiali", "Material", "PVC-U"],
      ["Hermetizimi", "Sealing", `${p.seal} · ${seal(p)}`],
    ];
    function table(data) {
      return `<table class="profile-technical-table"><caption class="sr-only">${fullName} — ${text("të dhëna teknike", "technical data")}</caption><tbody>${data.map((r) => `<tr><th scope="row">${r[en() ? 1 : 0]}</th><td>${r[en() && r[3] ? 3 : 2]}</td></tr>`).join("")}</tbody></table>`;
    }
    const image = p.image
      ? `<button class="profile-cutaway-button" data-gallery="images/${p.image}" aria-label="${text("Zmadho prerjen", "Enlarge cutaway")}: ${fullName}"><img class="profile-cutaway" src="images/${p.image}" alt="${text("Prerja e profilit", "Profile cutaway")}: ${fullName}" loading="lazy"><span class="cutaway-zoom">${text("Zmadho foton", "Enlarge photo")} ↗</span></button>`
      : `<div class="profile-model-label"><img src="images/${brandImage}" alt="${p.brand}" loading="lazy"><strong>${p.family === "LivIng" ? "LivIng " : ""}${p.model}</strong><span>${p.depth} mm · ${p.seal}</span></div>`;
    return `<article class="profile-card profile-detail" id="profile-${p.id}" ${p.id === activeProfile ? "" : "hidden"} aria-labelledby="title-${p.id}"><div class="profile-detail-heading"><span class="profile-type">${p.brand} / PVC-U</span><h3 id="title-${p.id}">${fullName}</h3></div><div class="profile-detail-grid"><figure class="profile-cutaway-figure">${image}<figcaption>${fullName}${p.image ? " · " + text("Prerja e profilit", "Profile cutaway") : ""}</figcaption></figure><div class="profile-detail-copy"><h4>${text("Karakteristikat kryesore", "Key characteristics")}</h4><ul class="profile-feature-list">${features.map((f) => `<li>${f[en() ? 1 : 0]}</li>`).join("")}</ul><details class="profile-technical" ${technicalBreakpoint.matches ? "open" : ""} aria-label="${text("Informacion teknik", "Technical information")}: ${fullName}"><summary><span>${text("Informacion teknik", "Technical information")}</span><span>+</span></summary>${table(rows)}${p.extraTechnical ? `<details class="profile-extra"><summary>${text("Parametrat e tjerë", "Additional parameters")}<span>+</span></summary>${table(p.extraTechnical)}</details>` : ""}<p class="profile-reference-note">${p.compactTechnical ? text("Vlera të sistemit sipas materialit të referencës. Varen nga profili, xhami, mekanizmi dhe përmasat; Uf nuk është Uw.", "System values from the supplied reference material. They depend on profile, glazing, hardware and dimensions; Uf is not Uw.") : text("Vlerat e izolimit dhe klasat konfirmohen për variantin konkret.", "Insulation values and classes are confirmed for the exact variant.")}</p></details><div class="profile-detail-actions"><a class="profile-quote" href="#oferte" data-profile-quote="${p.id}">${text("Kërko ofertë", "Request a quote")}<span>↗</span></a><a class="profile-maker" href="${source(p)}" target="_blank" rel="noopener noreferrer">${p.brand} ↗</a></div></div></div></article>`;
  }
  function renderCatalog() {
    const shown = profileCatalog.filter(
      (p) => brand === "all" || p.brand === brand,
    );
    if (!shown.some((p) => p.id === activeProfile)) activeProfile = shown[0].id;
    $("#profileModelNav").innerHTML = shown
      .map(
        (p) =>
          `<button data-profile-select="${p.id}" aria-pressed="${p.id === activeProfile}" aria-controls="profile-${p.id}">${profileName(p)}</button>`,
      )
      .join("");
    $("#mobileProfileSelect").innerHTML = ["Schüco", "Kömmerling"]
      .map(
        (name) =>
          `<optgroup label="${name}">${profileCatalog
            .filter((p) => p.brand === name)
            .map((p) => `<option value="${p.id}">${profileName(p)}</option>`)
            .join("")}</optgroup>`,
      )
      .join("");
    $("#mobileProfileSelect").value = activeProfile;
    $("#profileCards").innerHTML = shown.map(renderProfile).join("");
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
  $("#mobileProfileSelect").addEventListener("change", (event) => {
    activeProfile = event.target.value;
    brand = "all";
    renderCatalog();
  });
  document.querySelectorAll("[data-brand]").forEach((b) =>
    b.addEventListener("click", () => {
      brand = b.dataset.brand;
      renderCatalog();
    }),
  );
  document.addEventListener("click", (e) => {
    const select = e.target.closest("[data-profile-select]");
    if (select) {
      activeProfile = select.dataset.profileSelect;
      renderCatalog();
      document
        .querySelector(`[data-profile-select="${activeProfile}"]`)
        ?.focus({ preventScroll: true });
    }
    const quote = e.target.closest("[data-profile-quote]");
    if (quote) {
      const p = profileCatalog.find((p) => p.id === quote.dataset.profileQuote);
      $("#userService").value = profileName(p);
    }
    const jump = e.target.closest("[data-profile-jump]");
    if (jump) {
      brand = "all";
      activeProfile = jump.dataset.profileJump;
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
    if (!profileCatalog.some((p) => p.id === id)) return;
    brand = "all";
    activeProfile = id;
    renderCatalog();
    document
      .getElementById("profile-" + id)
      ?.scrollIntoView({ behavior: "instant" });
  };
})();
