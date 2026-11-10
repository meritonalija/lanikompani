# Browser smoke checks

Start the dependency-free application from the repository root:

```sh
node server.js
```

With Playwright and Chromium available in the development environment, run in a second terminal:

```sh
node tests/catalog.smoke.cjs
```

The cloud development image supplies Playwright and `/usr/bin/chromium`. For another environment install Playwright as a development tool and set `LANI_BROWSER_PATH` to its Chromium executable. `LANI_BASE_URL` overrides the default `http://127.0.0.1:3000`.

The suite checks seven separate profiles shown one at a time, filtering, comparison navigation, language persistence, ten language/viewport combinations, three hero opening modes, system tabs, quote validation and payload, optional quotation fields, mobile navigation, gallery, old product links, reduced motion and failed browser resources. WhatsApp opening is intercepted; no message is sent. It also saves preview screenshots under `/tmp`.

The suite also checks that the supplied AS and MD values remain separate, MD-only parameters are not copied to other models, and real cutaway enlargement still works after filtering. It checks transcription consistency, not independent manufacturer verification. Source verification status is recorded in `docs/product-sources.md`.
