const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const base = process.env.LANI_BASE_URL || "http://127.0.0.1:3000";
const featured = ["schuco-living-md", "kommerling-88-md"];
const models = [
  ["schuco-living-md", "Schüco LivIng 82 MD"],
  ["schuco-living-as", "Schüco LivIng 82 AS"],
  ["schuco-ct70", "Schüco CT 70 AS"],
  ["kommerling-70-ad", "Kömmerling 70 AD"],
  ["kommerling-76-ad", "Kömmerling 76 AD"],
  ["kommerling-76-md", "Kömmerling 76 MD"],
  ["kommerling-88-md", "Kömmerling 88 MD"],
];
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
    page.on("requestfailed", (r) => bad.push(r.url()));
    page.on("response", (r) => {
      if (r.status() >= 400) bad.push([r.url(), r.status()]);
    });
    const noSources = async () =>
      assert.equal(
        await page
          .locator(
            'a[href*="github.com"],a[href*="schueco.com"],a[href*="koemmerling.com"],.manufacturer-references,.profile-maker',
          )
          .count(),
        0,
      );
    await page.goto(base, { waitUntil: "networkidle" });
    assert.equal(await page.locator(".profile-card").count(), 2);
    assert.deepEqual(
      await page
        .locator("#mobileProfileSelect option")
        .evaluateAll((a) => a.map((o) => o.value)),
      featured,
    );
    await noSources();
    assert.deepEqual(
      await page
        .locator("#otherProfiles a")
        .evaluateAll((a) => a.map((e) => e.getAttribute("href"))),
      models
        .filter(([id]) => !featured.includes(id))
        .map(([id]) => "profilet/" + id + ".html"),
    );
    for (const lang of ["sq", "en"]) {
      await page.locator(`[data-lang="${lang}"]`).click();
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          false,
          "home overflow " + lang + " " + width,
        );
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    for (const id of featured) {
      await page.locator("#mobileProfileSelect").selectOption(id);
      assert(await page.locator("#profile-" + id).isVisible());
      assert.equal(
        await page
          .locator("#profile-" + id + " .profile-technical")
          .evaluate((e) => e.open),
        false,
      );
    }
    assert((await page.locator("#profilet").boundingBox()).height < 900);
    await page.locator("#otherProfiles>summary").click();
    await page.locator("#otherProfiles a").first().click();
    await page.waitForURL("**/profilet/schuco-living-as.html");
    console.log(
      "PASS: two homepage models, five ordered page links and compact SQ/EN layout at five widths.",
    );
    for (let i = 0; i < models.length; i++) {
      const [id, name] = models[i];
      assert.equal(
        (
          await page.goto(base + "/profilet/" + id + ".html", {
            waitUntil: "networkidle",
          })
        ).status(),
        200,
      );
      assert.equal(await page.locator("h1").textContent(), name);
      assert.equal(await page.locator("h1").count(), 1);
      await noSources();
      assert.equal(
        await page.locator('link[rel="canonical"]').getAttribute("href"),
        "https://www.lanikompani.com/profilet/" + id + ".html",
      );
      assert.equal(
        await page.locator(".profile-previous").getAttribute("href"),
        i
          ? "../profilet/" + models[i - 1][0] + ".html"
          : "../index.html#profilet",
      );
      assert.equal(
        await page.locator(".profile-next").getAttribute("href"),
        i < models.length - 1
          ? "../profilet/" + models[i + 1][0] + ".html"
          : "../index.html#profilet",
      );
      for (const lang of ["sq", "en"]) {
        await page.locator(`[data-lang="${lang}"]`).click();
        assert((await page.title()).includes(name));
        for (const width of [320, 1440]) {
          await page.setViewportSize({ width, height: 900 });
          assert.equal(
            await page.evaluate(
              () => document.documentElement.scrollWidth > innerWidth,
            ),
            false,
            id + " overflow " + lang + " " + width,
          );
        }
      }
      await page.waitForFunction(
        () => document.querySelector(".profile-technical").open,
      );
      const text = await page.locator(".profile-detail").innerText();
      if (id === "schuco-living-md") {
        assert(text.includes("0.96 W/(m²·K)"));
        assert(text.includes("47 dB(A)"));
      }
      if (id === "schuco-living-as") {
        assert(text.includes("1.0 W/(m²·K)"));
        assert(!text.includes("0.96"));
        assert.equal(
          await page
            .locator(".profile-cutaway")
            .getAttribute("data-photo-scope"),
          "family-reference",
        );
      }
      await page.locator(".profile-cutaway-button").click();
      assert(await page.locator("#galleryDialog").evaluate((e) => e.open));
      await page.keyboard.press("Escape");
      await page.locator(".profile-quote").click();
      await page.waitForURL("**/index.html?profile=" + id + "#oferte");
      assert.equal(await page.locator("#userService").inputValue(), name);
    }
    console.log(
      "PASS: seven directly accessible profile pages, ordered navigation, separate AS/MD values, photos and exact quotation selection.",
    );
    await page.goto(base + "/#profile-kommerling-76-md", {
      waitUntil: "networkidle",
    });
    await page.waitForURL("**/profilet/kommerling-76-md.html");
    await page.goto(base + "/index.html?profile=kommerling-88-md#oferte", {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => {
      window.__requests = [];
      window.open = (...a) => window.__requests.push(a);
    });
    await page.locator('[data-channel="whatsapp"]').click();
    assert.equal(await page.evaluate(() => window.__requests.length), 0);
    await page.locator("#userName").fill("Test Client");
    await page.locator("#userPhone").fill("+389 70 123 456");
    await page.locator(".quote-options>summary").click();
    await page.locator("#userQuantity").fill("4");
    await page.locator('[data-channel="whatsapp"]').click();
    const message = decodeURIComponent(
      await page.evaluate(() => window.__requests[0][0]),
    );
    assert(message.includes("Kömmerling 88 MD"));
    assert(message.includes("Quantity: 4"));
    assert(!message.includes("undefined"));
    await page.locator('[data-lang="sq"]').click();
    await page.setViewportSize({ width: 390, height: 844 });
    await page
      .locator("#profilet")
      .evaluate((e) => e.scrollIntoView({ block: "start" }));
    await page.waitForTimeout(700);
    await page.screenshot({ path: "/tmp/lani-two-featured-mobile.png" });
    await page.goto(base + "/profilet/kommerling-76-md.html", {
      waitUntil: "networkidle",
    });
    await page.screenshot({ path: "/tmp/lani-separate-profile-mobile.png" });
    assert.deepEqual(errors, []);
    assert.deepEqual(bad, []);
    const context = await browser.newContext({ javaScriptEnabled: false });
    const staticPage = await context.newPage();
    await staticPage.goto(base + "/profilet/schuco-living-as.html");
    assert.equal(
      await staticPage.locator("h1").textContent(),
      "Schüco LivIng 82 AS",
    );
    assert(await staticPage.locator(".profile-quote").isVisible());
    await context.close();
    console.log(
      "PASS: legacy links, validated quotation payload, no public source links, no browser/resource errors and static page fallback.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
