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

The suite verifies two featured homepage models (Schüco LivIng 82 MD and Kömmerling 88 MD), five ordered links to other models, compact mobile rendering, ten language/viewport combinations on the homepage, and seven directly accessible product pages. Each page is checked in both languages at mobile and desktop sizes, including canonical URLs, previous/next order, image enlargement and exact profile selection when returning to the quotation form. It also checks AS/MD data separation, old bookmarks, quotation validation/payload, static HTML fallback, browser errors, failed resources and absence of public source links. WhatsApp opening is intercepted; no message is sent.

## Profile page generation

The shared data lives in `profiles-data.js`, the shared presentation in `profile-view.js`. Run after changing profile details:

```sh
node scripts/build-profile-pages.cjs
```

This writes the seven static pages in `profilet/` and updates `sitemap.xml`. Generated HTML supports direct loading and has useful content without JavaScript. Commit the generated output with its data/presentation changes. If profile membership changes, also update the ordered homepage links in `index.html`.

Source records remain in `docs/` for maintenance; the website no longer presents source links or a source section. Source verification limits are recorded in `docs/product-sources.md`.
