(() => {
  const view = window.LaniProfileView;
  const profile = profileCatalog.find(
    (p) => p.id === document.body.dataset.profilePage,
  );
  if (!profile) return;
  const breakpoint = matchMedia("(min-width:801px)");
  function render() {
    const en = document.documentElement.lang === "en";
    document.getElementById("profilePageContent").innerHTML = view.render(
      profile,
      {
        en,
        assetPrefix: "../",
        technicalOpen: breakpoint.matches,
        quoteHref: `../index.html?profile=${encodeURIComponent(profile.id)}#oferte`,
        heading: "h1",
      },
    );
    document.title = `${view.name(profile)} | LANI KOMPANI`;
  }
  document.addEventListener("languagechange", render);
  breakpoint.addEventListener("change", (event) =>
    document.querySelectorAll(".profile-technical").forEach((detail) => {
      detail.open = event.matches;
    }),
  );
  render();
  const gallery = document.getElementById("galleryDialog");
  let trigger;
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery]");
    if (!button) return;
    trigger = button;
    gallery.querySelector("img").src = button.dataset.gallery;
    gallery.querySelector("img").alt = button.querySelector("img").alt;
    gallery.showModal();
  });
  document
    .querySelector(".dialog-close")
    .addEventListener("click", () => gallery.close());
  gallery.addEventListener("click", (event) => {
    if (event.target === gallery) gallery.close();
  });
  gallery.addEventListener("close", () => trigger?.focus());
})();
