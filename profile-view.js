(function (root, factory) {
  const view = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = view;
  else root.LaniProfileView = view;
})(typeof window !== "undefined" ? window : globalThis, () => {
  const escape = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const name = (p) =>
    `${p.brand} ${p.family === "LivIng" ? "LivIng " : p.family === "CT 70" ? "CT " : ""}${p.model}`;
  const path = (p) => `profilet/${p.id}.html`;
  const arrow = (back = false) =>
    `<svg class="vector-arrow" viewBox="0 0 24 24" aria-hidden="true"${back ? ' style="transform:rotate(180deg)"' : ""}><path d="M3 12h18m-7-7 7 7-7 7"/></svg>`;
  function render(
    p,
    {
      en = false,
      active = true,
      assetPrefix = "",
      quoteHref = "#oferte",
      technicalOpen = true,
      heading = "h3",
    } = {},
  ) {
    const text = (sq, eng) => (en ? eng : sq);
    const fullName = name(p),
      label = escape(fullName),
      seal =
        p.seal === "MD"
          ? text("Vulosje qendrore", "Centre seal")
          : text("Vulosje në ndalesë", "Rebate seal");
    const highlights = p.highlights || [
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
      ["Hermetizimi", "Sealing", `${p.seal} · ${seal}`],
    ];
    const table = (data) =>
      `<table class="profile-technical-table"><caption class="sr-only">${label} — ${text("të dhëna teknike", "technical data")}</caption><tbody>${data.map((r) => `<tr><th scope="row">${escape(r[en ? 1 : 0])}</th><td>${escape(r[en && r[3] ? 3 : 2])}</td></tr>`).join("")}</tbody></table>`;
    const family = p.imageScope === "family-reference";
    const photoAlt = p.imageAlt
      ? p.imageAlt[en ? 1 : 0]
      : `${text("Prerja e profilit", "Profile cutaway")}: ${fullName}`;
    const photo = p.image
      ? `<button class="profile-cutaway-button" data-gallery="${assetPrefix}images/${escape(p.image)}" aria-label="${text("Zmadho foton", "Enlarge photo")}: ${label}"><img class="profile-cutaway" src="${assetPrefix}images/${escape(p.image)}" data-photo-scope="${p.imageScope || "existing-catalogue"}" alt="${escape(photoAlt)}" loading="lazy"><span class="cutaway-zoom">${family ? text("Pamje familjeje", "Family reference") : text("Zmadho foton", "Enlarge photo")} ${arrow()}</span></button>`
      : `<div class="profile-model-label"><strong>${label}</strong></div>`;
    const headingTag = heading === "h1" ? "h1" : "h3";
    return `<article class="profile-card profile-detail" id="profile-${p.id}" ${active ? "" : "hidden"} aria-labelledby="title-${p.id}"><div class="profile-detail-heading"><span class="profile-type">${escape(p.brand)} / PVC-U</span><${headingTag} id="title-${p.id}">${label}</${headingTag}></div><div class="profile-detail-grid"><figure class="profile-cutaway-figure">${photo}<figcaption>${family ? escape(p.imageCaption[en ? 1 : 0]) : label + " · " + text("Prerja e profilit", "Profile cutaway")}</figcaption></figure><div class="profile-detail-copy"><h4>${text("Karakteristikat kryesore", "Key characteristics")}</h4><ul class="profile-feature-list">${highlights.map((f) => `<li>${escape(f[en ? 1 : 0])}</li>`).join("")}</ul><details class="profile-technical" ${technicalOpen ? "open" : ""} aria-label="${text("Informacion teknik", "Technical information")}: ${label}"><summary><span>${text("Informacion teknik", "Technical information")}</span><span>+</span></summary>${table(rows)}${p.extraTechnical ? `<details class="profile-extra"><summary>${text("Parametrat e tjerë", "Additional parameters")}<span>+</span></summary>${table(p.extraTechnical)}</details>` : ""}<p class="profile-reference-note">${text("Vlerat varen nga xhami, përmasat dhe konfigurimi. Uf i përket kornizës, jo dritares së plotë.", "Values depend on glazing, dimensions and configuration. Uf describes the frame, not the complete window.")}</p></details><div class="profile-detail-actions"><a class="profile-quote" href="${escape(quoteHref)}" data-profile-quote="${p.id}">${text("Kërko ofertë", "Request a quote")}<span>${arrow()}</span></a></div></div></div></article>`;
  }
  return { name, path, render, arrow, escape };
});
