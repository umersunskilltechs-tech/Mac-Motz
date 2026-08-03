/*
  contact-form.js — client-side validation + a friendly confirmation state.
  No backend is wired up yet — see AGENTS.md "Editing the contact form" before launch.
*/

export function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    status.textContent = "Sending…";

    // Placeholder confirmation — replace with a real fetch() to a form endpoint.
    // See AGENTS.md "Editing the contact form".
    window.setTimeout(() => {
      status.textContent = "Thank you — Mac will write back within a few days.";
      form.reset();
      submitBtn.disabled = false;
    }, 600);
  });
}
