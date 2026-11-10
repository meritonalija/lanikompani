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
// Additional sources are independent published catalogues; see docs/product-sources.md.
const thirdPartyReference =
  "https://github.com/OpenAEC-Foundation/open-frame-studio/blob/fb67ef26beb342755e4639f914fb01c15b72ff0e/profiles/pvc/kommerling.json";
const dealerReference =
  "https://github.com/DanielGanea45/-Fenster-WeissenBurger/blob/cef16362816145dec234fac0bd4e711cca5f5734/produkte/kunststofffenster-koemmerling/index.html";
const referenceModels = [
  {
    id: "kommerling-70-ad",
    depth: 70,
    chambers: 5,
    levels: 2,
    uf: 1.2,
    source: dealerReference,
  },
  {
    id: "kommerling-76-ad",
    depth: 76,
    chambers: 5,
    levels: 2,
    uf: 1.1,
    source: thirdPartyReference,
  },
  {
    id: "kommerling-76-md",
    depth: 76,
    chambers: 6,
    levels: 3,
    uf: 1.0,
    source: thirdPartyReference,
  },
  {
    id: "kommerling-88-md",
    depth: 88,
    chambers: 7,
    levels: 3,
    uf: 0.95,
    source: thirdPartyReference,
  },
];
referenceModels.forEach((model) => {
  const code = model.levels === 3 ? "MD" : "AD";
  profileReferences[model.id] = {
    ...profileReferences[model.id],
    image: `profiles/${model.id}.webp`,
    imageScope: "catalogue-reference",
    imageCaption: [
      `${model.depth} ${code} · pamje reference e katalogut`,
      `${model.depth} ${code} · catalogue reference view`,
    ],
    technicalSource: model.source,
    provenance: "independent-catalogue-reference",
    highlights: [
      [
        `${model.chambers} dhoma · thellësi ${model.depth} mm`,
        `${model.chambers} chambers · ${model.depth} mm depth`,
      ],
      [
        `${code} · ${model.levels} nivele hermetizimi`,
        `${code} · ${model.levels} sealing levels`,
      ],
      [
        model.levels === 3
          ? "Guarnicion shtesë në qendër të profilit"
          : "Guarnicione në ndalesat e kornizës dhe krahut",
        model.levels === 3
          ? "Additional centre gasket"
          : "Seals at the frame and sash rebates",
      ],
      [
        "Përforcimi dhe xhami sipas konfigurimit",
        "Reinforcement and glazing specified for the configuration",
      ],
    ],
    compactTechnical: [
      ["Thellësia e sistemit", "System depth", `${model.depth} mm`],
      ["Materiali", "Material", "PVC-U"],
      ["Dhoma izoluese", "Insulating chambers", String(model.chambers)],
      ["Nivele hermetizimi", "Sealing levels", `${model.levels} · ${code}`],
      [
        "Uf e kornizës · referencë",
        "Frame Uf · reference",
        `${model.uf.toFixed(2).replace(".", ",")} W/(m²·K)`,
        `${model.uf.toFixed(2)} W/(m²·K)`,
      ],
    ],
  };
});
profileReferences["kommerling-88-md"].compactTechnical.push([
  "Trashësia maksimale e xhamëzimit · referencë",
  "Maximum glazing thickness · reference",
  "58 mm",
]);
Object.assign(profileReferences["schuco-living-as"], {
  image: "profiles/schuco-living-family.jpg",
  imageScope: "family-reference",
  imageCaption: [
    "Familja LivIng 82 · pamje reference, jo prerje specifike AS",
    "LivIng 82 family · reference view, not an AS-specific cutaway",
  ],
  imageAlt: [
    "Familja Schüco LivIng 82: pamje reference e prodhuesit",
    "Schüco LivIng 82 family: manufacturer reference view",
  ],
});
Object.assign((profileReferences["schuco-ct70"] = {}), {
  image: "profiles/schuco-corona-family.jpg",
  imageScope: "family-reference",
  imageCaption: [
    "Familja Corona · pamje reference",
    "Corona family · reference view",
  ],
  imageAlt: [
    "Familja Schüco Corona: pamje reference e prodhuesit",
    "Schüco Corona family: manufacturer reference view",
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

if (typeof module !== "undefined" && module.exports)
  module.exports = profileCatalog;
