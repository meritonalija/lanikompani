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
