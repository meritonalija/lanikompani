const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const profiles = require(path.join(root, "profiles-data.js"));
const view = require(path.join(root, "profile-view.js"));
const escape = view.escape;
const home = "../index.html#profilet";
const brand = `<a class="wordmark" href="../index.html"><img src="../images/logo.png" alt="" width="44" height="44"><span>LANI <b>KOMPANI</b><small data-i18n="brand_line">DYER · DRITARE · FASADA</small></span></a>`;
fs.mkdirSync(path.join(root, "profilet"), { recursive: true });
profiles.forEach((profile, index) => {
  const name = view.name(profile);
  const previous = profiles[index - 1],
    next = profiles[index + 1];
  const pager = (model, back) =>
    `<a href="${model ? "../" + view.path(model) : home}" class="${back ? "profile-previous" : "profile-next"}">${back ? view.arrow(true) : ""}<span><small data-i18n="${back ? "previous_profile" : "next_profile"}">${back ? "Profili i mëparshëm" : "Profili i radhës"}</small><b>${model ? escape(view.name(model)) : '<span data-i18n="all_profile_pages">Të gjitha profilet</span>'}</b></span>${back ? "" : view.arrow()}</a>`;
  const html = `<!doctype html>
<html lang="sq"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(name)} | LANI KOMPANI</title><meta name="description" content="${escape(profile.description[0])}"><link rel="canonical" href="https://www.lanikompani.com/${view.path(profile)}"><meta name="theme-color" content="#ffffff"><link rel="icon" href="../images/logo.png"><link rel="stylesheet" href="../style.css"><script src="../translations.js" defer></script><script src="../profiles-data.js" defer></script><script src="../profile-view.js" defer></script><script src="../profile-page.js" defer></script></head>
<body class="product-page" data-profile-page="${profile.id}"><a class="skip-link" href="#main" data-i18n="skip">Kalo te përmbajtja</a>
<header class="header product-page-header">${brand}<a class="profile-home-link" href="${home}" data-i18n="all_profile_pages">Të gjitha profilet</a><div class="header-actions"><div class="languages" aria-label="Gjuha"><button class="lang-btn active" data-lang="sq" aria-pressed="true">SQ</button><span>/</span><button class="lang-btn" data-lang="en" aria-pressed="false">EN</button></div><a class="header-cta" href="../index.html?profile=${encodeURIComponent(profile.id)}#oferte"><span data-i18n="start">Kërko ofertë</span>${view.arrow()}</a></div></header>
<main id="main" class="profile-page-main"><nav class="profile-breadcrumb" aria-label="Pozicioni në faqe"><a href="${home}">${view.arrow(true)}<span data-i18n="back_profiles">Kthehu te profilet</span></a></nav><div id="profilePageContent">${view.render(profile, { assetPrefix: "../", quoteHref: `../index.html?profile=${profile.id}#oferte`, heading: "h1" })}</div><nav class="profile-page-order" aria-label="Profilet sipas radhës">${pager(previous, true)}${pager(next, false)}</nav></main>
<footer class="profile-page-footer"><a href="../index.html">© LANI KOMPANI</a><a href="tel:+38971442821">+389 71 442 821</a><a href="../index.html#kontakti" data-i18n="nav_contact">Kontakti</a></footer><dialog id="galleryDialog" aria-label="Pamje e zmadhuar"><button class="dialog-close" aria-label="Mbyll fotografinë">×</button><img src="../images/${escape(profile.image || "logo.png")}" alt=""></dialog></body></html>\n`;
  fs.writeFileSync(path.join(root, view.path(profile)), html);
});
const locations = [
  "https://www.lanikompani.com/",
  ...profiles.map((p) => "https://www.lanikompani.com/" + view.path(p)),
];
fs.writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`,
);
console.log(
  `Generated ${profiles.length} standalone profile pages and sitemap.`,
);
