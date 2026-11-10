const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const baseUrl = process.env.LANI_BASE_URL || "http://127.0.0.1:3000";
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.LANI_BROWSER_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    const errors = [],
      bad = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("requestfailed", (r) => bad.push([r.url(), r.failure().errorText]));
    page.on("response", (r) => {
      if (r.status() >= 400) bad.push([r.url(), r.status()]);
    });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1100);
    assert.equal(await page.locator(".profile-card").count(), 7);
    assert.equal(await page.locator("#comparisonBody tr").count(), 7);
    assert.equal(await page.locator(".header-cta .vector-arrow").count(), 1);
    for (const lang of ["sq", "en"]) {
      await page.locator(`[data-lang="${lang}"]`).click();
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          false,
          lang + " overflow " + width,
        );
      }
      assert.equal(await page.locator("html").getAttribute("lang"), lang);
    }
    console.log(
      "PASS: seven distinct profiles; comparison; SQ/EN at five widths.",
    );
    await page.setViewportSize({ width: 390, height: 844 });
    assert(await page.locator("#mobileProfileSelect").isVisible());
    assert.equal(await page.locator("#mobileProfileSelect option").count(), 7);
    const mobileModels = await page
      .locator("#mobileProfileSelect option")
      .evaluateAll((options) => options.map((o) => o.value));
    for (const id of mobileModels) {
      await page.locator("#mobileProfileSelect").selectOption(id);
      assert(await page.locator("#profile-" + id).isVisible());
      assert.equal(
        await page
          .locator("#profile-" + id + " .profile-technical")
          .evaluate((el) => el.open),
        false,
      );
    }
    await page.locator("#mobileProfileSelect").selectOption("schuco-living-md");
    const compactHeight = await page
      .locator("#profilet")
      .evaluate((el) => el.getBoundingClientRect().height);
    assert(
      compactHeight < 900,
      "mobile catalogue should fit roughly one screen",
    );
    await page
      .locator("#profile-schuco-living-md .profile-technical>summary")
      .click();
    assert(
      await page
        .locator("#profile-schuco-living-md .profile-technical-table")
        .first()
        .isVisible(),
    );
    const expandedHeight = await page
      .locator("#profilet")
      .evaluate((el) => el.getBoundingClientRect().height);
    assert(expandedHeight > compactHeight + 200);
    await page
      .locator("#profile-schuco-living-md .profile-technical>summary")
      .click();
    await page.setViewportSize({ width: 1440, height: 1000 });
    assert(
      await page
        .locator("#profile-schuco-living-md .profile-technical")
        .evaluate((el) => el.open),
    );
    console.log(
      "PASS: mobile selector exposes all seven models; specs start collapsed, expand on request and remain open on desktop.",
    );
    for (const mode of ["turn", "slide", "shutter"]) {
      await page.locator(`[data-opening="${mode}"]`).click();
      assert.equal(
        await page.locator("#windowDemo").getAttribute("data-mode"),
        mode,
      );
      assert.equal(
        await page.locator("#demoToggle").getAttribute("aria-pressed"),
        "false",
      );
      await page.locator("#demoToggle").click();
      assert.equal(
        await page.locator("#demoToggle").getAttribute("aria-pressed"),
        "true",
      );
      assert(
        await page
          .locator("#windowDemo")
          .evaluate((el) => el.classList.contains("is-open")),
      );
    }
    await page.locator('[data-brand="Schüco"]').click();
    assert.equal(await page.locator(".profile-card").count(), 3);
    await page.locator('[data-brand="Kömmerling"]').click();
    assert.equal(await page.locator(".profile-card").count(), 4);
    await page.locator('[data-brand="all"]').click();
    assert.equal(await page.locator(".profile-quote .vector-arrow").count(), 7);
    const ids = await page
      .locator("[data-profile-select]")
      .evaluateAll((buttons) =>
        buttons.map((button) => button.dataset.profileSelect),
      );
    for (const id of ids) {
      await page.locator(`[data-profile-select="${id}"]`).click();
      const card = page.locator(`#profile-${id}`);
      assert(await card.isVisible());
      assert.equal(await card.locator(".profile-cutaway").count(), 1);
      const photo = await card.locator(".profile-cutaway").getAttribute("src");
      assert.equal(
        (await page.request.get(new URL(photo, baseUrl).href)).status(),
        200,
      );
      if (id === "kommerling-76-ad")
        assert((await card.innerText()).includes("5 chambers"));
      if (id === "kommerling-76-md")
        assert((await card.innerText()).includes("6 chambers"));
      if (id === "kommerling-88-md")
        assert((await card.innerText()).includes("7 chambers"));
      assert.equal(await page.locator(".profile-detail:visible").count(), 1);
      assert((await card.locator(".profile-feature-list li").count()) >= 3);
      assert(
        (await card
          .locator(".profile-technical-table")
          .first()
          .locator("tbody tr")
          .count()) >= 3,
      );
      await card.locator("[data-profile-quote]").click();
      assert(
        (await page.locator("#userService").inputValue()).length > 0,
        id + " missing quote option",
      );
      if (id === "schuco-living-md") {
        const table = await card
          .locator(".profile-technical-table")
          .first()
          .innerText();
        assert(table.includes("0.96 W/(m²·K)"));
        assert(table.includes("24–52 mm"));
        assert(table.includes("47 dB(A)"));
        assert(
          await card.locator("th").filter({ hasText: "Frame Uf (≥)" }).count(),
        );
        await card.locator(".profile-extra>summary").click();
        assert(
          (await card.locator(".profile-extra").innerText()).includes(
            "2 600 mm",
          ),
        );
      } else if (id === "schuco-living-as") {
        const table = await card
          .locator(".profile-technical-table")
          .innerText();
        assert(table.includes("1.0 W/(m²·K)"));
        assert(!table.includes("0.96"));
        assert.equal(await card.locator(".profile-cutaway").count(), 1);
        assert.equal(
          await card
            .locator(".profile-cutaway")
            .getAttribute("data-photo-scope"),
          "family-reference",
        );
        assert(
          (await card.locator(".cutaway-zoom").innerText()).includes(
            "Family reference",
          ),
        );
      } else {
        assert(!(await card.innerText()).includes("0.96"));
      }
    }
    // Re-rendering a profile via filters must preserve image enlargement.
    await page.locator('[data-brand="Kömmerling"]').click();
    await page.locator('[data-profile-select="kommerling-76-md"]').click();
    await page
      .locator("#profile-kommerling-76-md .profile-cutaway-button")
      .click();
    assert(await page.locator("#galleryDialog").evaluate((el) => el.open));
    assert(
      (await page.locator("#galleryDialog img").getAttribute("src")).includes(
        "profiles/kommerling-76-md.webp",
      ),
    );
    await page.keyboard.press("Escape");
    await page.locator('[data-brand="all"]').click();
    await page.locator("#krahasimi>summary").click();
    assert(await page.locator("#krahasimi").evaluate((el) => el.open));
    await page.locator('[data-brand="Schüco"]').click();
    await page.locator('[data-profile-jump="kommerling-88-md"]').click();
    assert.equal(await page.locator(".profile-card").count(), 7);
    assert(await page.locator("#profile-kommerling-88-md").isVisible());
    console.log(
      "PASS: three hero modes; compact model selection; separate AS/MD data; exact-model photo enlargement; quotes and comparison navigation.",
    );
    for (const key of ["alu", "sliding", "facade", "shutter"]) {
      await page.locator(`[data-product="${key}"]`).click();
      assert.equal(
        await page.locator("#productPanel").getAttribute("aria-labelledby"),
        "tab-" + key,
      );
      await page.locator("#productQuote").click();
      assert(
        (await page.locator("#userService").inputValue()).length > 0,
        key + " missing quote option",
      );
    }
    await page.locator('[data-profile-select="kommerling-88-md"]').click();
    await page.locator('[data-profile-quote="kommerling-88-md"]').click();
    await page.locator(".quote-options>summary").click();
    await page.locator("#userQuantity").fill("4");
    await page.locator("#userFinish").selectOption("Antracit");
    await page.locator("#userGlazing").selectOption("Tri fletë xhami");
    await page.locator("#userProject").selectOption("Rinovim");
    await page.evaluate(() => {
      window.__requests = [];
      window.open = (...args) => window.__requests.push(args);
    });
    await page.locator('[data-channel="whatsapp"]').click();
    assert.equal(await page.evaluate(() => window.__requests.length), 0);
    await page.locator("#userName").fill("Test Client");
    await page.locator("#userPhone").fill("+389 70 123 456");
    await page.locator('[data-channel="whatsapp"]').click();
    let message = decodeURIComponent(
      await page.evaluate(() => window.__requests[0][0]),
    );
    assert(message.includes("Kömmerling 88 MD"));
    assert(message.includes("Quantity: 4"));
    assert(message.includes("Antracit"));
    assert(message.includes("Tri fletë xhami"));
    assert(message.includes("Rinovim"));
    assert(!message.includes("undefined"));
    console.log(
      "PASS: other systems, native form validation, exact profile and all optional details in WhatsApp payload.",
    );
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => scrollTo(0, 0));
    await page.locator(".menu-toggle").click();
    assert.equal(
      await page.locator(".menu-toggle").getAttribute("aria-expanded"),
      "true",
    );
    await page.locator("#navigation a").first().click();
    assert.equal(
      await page.locator(".menu-toggle").getAttribute("aria-expanded"),
      "false",
    );
    await page.locator(".collection [data-gallery]").first().click();
    assert(await page.locator("#galleryDialog").evaluate((el) => el.open));
    await page.keyboard.press("Escape");
    assert.equal(
      await page.locator("#galleryDialog").evaluate((el) => el.open),
      false,
    );
    await page.locator('[data-lang="sq"]').click();
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.locator("html").getAttribute("lang"), "sq");
    await page.goto(baseUrl + "/#pvc-schuco", { waitUntil: "networkidle" });
    assert(
      (await page.locator("#profile-schuco-living-md").boundingBox()).y < 150,
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(
      await page
        .locator(".reveal")
        .first()
        .evaluate((el) => getComputedStyle(el).opacity),
      "1",
    );
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(1200);
    await page.screenshot({ path: "/tmp/lani-expanded-mobile.png" });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(250);
    await page.screenshot({ path: "/tmp/lani-expanded-hero.png" });
    await page.locator('[data-profile-select="schuco-living-md"]').click();
    await page
      .locator("#profile-schuco-living-md")
      .evaluate((el) => el.scrollIntoView({ block: "start" }));
    await page.waitForTimeout(850);
    await page.screenshot({ path: "/tmp/lani-profile-technical.png" });
    assert.deepEqual(errors, []);
    assert.deepEqual(bad, []);
    console.log(
      "PASS: mobile navigation, gallery, saved language, legacy product links, reduced motion; no page errors or failed resources.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
