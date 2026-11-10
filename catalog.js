(() => {
  const $ = (s) => document.querySelector(s);
  const view = window.LaniProfileView;
  const featuredIds = ["schuco-living-md", "kommerling-88-md"];
  const featured = featuredIds.map((id) =>
    profileCatalog.find((p) => p.id === id),
  );
  const technicalBreakpoint = matchMedia("(min-width:801px)");
  technicalBreakpoint.addEventListener("change", (event) =>
    document.querySelectorAll(".profile-technical").forEach((detail) => {
      detail.open = event.matches;
    }),
  );
  const en = () => document.documentElement.lang === "en";
  const text = (sq, english) => (en() ? english : sq);
  function renderCatalog() {
    $("#profileCards").innerHTML = featured
      .map((p) =>
        view.render(p, {
          en: en(),
          active: true,
          technicalOpen: technicalBreakpoint.matches,
        }),
      )
      .join("");
    document.dispatchEvent(new Event("catalogrender"));
  }
  document.addEventListener("click", (event) => {
    const quote = event.target.closest("[data-profile-quote]");
    if (quote) {
      const p = profileCatalog.find((p) => p.id === quote.dataset.profileQuote);
      if (p) $("#userService").value = view.name(p);
    }
  });
  const group = document.createElement("optgroup");
  group.label = "PVC · Schüco / Kömmerling";
  profileCatalog.forEach((p) => {
    const option = document.createElement("option");
    option.value = option.textContent = view.name(p);
    group.append(option);
  });
  $("#userService")
    .querySelectorAll("option")
    .forEach((option) => {
      if (/Schüco|Kömmerling/.test(option.value)) option.remove();
    });
  $("#userService").insertBefore(group, $("#userService").children[1]);
  const quoteId = new URLSearchParams(location.search).get("profile");
  const requested = profileCatalog.find((p) => p.id === quoteId);
  if (requested) $("#userService").value = view.name(requested);
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
    const profile = profileCatalog.find((p) => p.id === id);
    if (!profile) return;
    if (!featuredIds.includes(id)) {
      location.assign("profilet/profilet-e-tjera.html#profile-" + id);
      return;
    }
    document
      .getElementById("profile-" + id)
      ?.scrollIntoView({ behavior: "instant" });
  };
})();
