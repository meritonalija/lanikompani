# Browser smoke checks

Start the dependency-free application from the repository root:

```sh
node server.js
```

With Playwright and Chromium available in the development environment, run in a second terminal:

```sh
node tests/catalog.smoke.cjs
```

The cloud development image supplies Playwright and `/usr/bin/chromium`. Set `LANI_BROWSER_PATH` for another Chromium executable or `LANI_BASE_URL` for another server.

The suite verifies that Schüco LivIng 82 MD and Kömmerling 88 MD are both visible on the homepage, stacked vertically without model switching controls. The single “Other profiles” link opens one page showing all five other profiles in order, without selecting them individually. It tests both languages and responsive layouts, correct quotation selection from the collection, retained individual page URLs, gallery enlargement, legacy bookmarks, source-link removal and static HTML fallback. WhatsApp opening is intercepted; no message is sent.

## Profile page generation

The shared data lives in `profiles-data.js`, the shared presentation in `profile-view.js`. Run after changing profile details:

```sh
node scripts/build-profile-pages.cjs
```

This writes the collection page `profilet/profilet-e-tjera.html`, seven retained individual detail pages in `profilet/`, and `sitemap.xml`. Generated HTML supports direct loading and has useful content without JavaScript. Commit the generated output with its data/presentation changes. The homepage keeps both featured systems visible. The other profiles are gathered on the collection page.

Source records remain in `docs/` for maintenance; the website no longer presents source links or a source section. Source verification limits are recorded in `docs/product-sources.md`.
