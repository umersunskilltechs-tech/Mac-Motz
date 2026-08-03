/*
  nav.js — mobile menu open/close. aria-current="page" is set directly in each HTML
  file (simplest, most robust for a 4-page static site), so this file only handles the
  toggle interaction.
*/

export function initNav() {
  const header = document.querySelector(".site-header");
  const updateHeader = () => {
    if (!header) return;
    header.dataset.scrolled = String(window.scrollY > 24);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const toggle = document.querySelector(".nav-menu-toggle");
  const list = document.querySelector(".primary-nav__list");
  if (!toggle || !list) return;

  toggle.addEventListener("click", () => {
    const isOpen = list.dataset.open === "true";
    list.dataset.open = String(!isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
    document.body.style.overflow = isOpen ? "" : "hidden";
  });

  list.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      list.dataset.open = "false";
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}
