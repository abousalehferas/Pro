 const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => header?.classList.toggle("is-scrolled", window.scrollY > 12));

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".main-nav a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const duration = 1100;
    const began = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - began) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + "+";
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.8 });
document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

const testimonials = Array.from(document.querySelectorAll(".testimonial-card"));
let testimonialIndex = 0;
function showTestimonial(index) {
  if (!testimonials.length) return;
  testimonials[testimonialIndex].classList.remove("is-active");
  testimonialIndex = (index + testimonials.length) % testimonials.length;
  testimonials[testimonialIndex].classList.add("is-active");
}
document.querySelector("[data-next]")?.addEventListener("click", () => showTestimonial(testimonialIndex + 1));
document.querySelector("[data-prev]")?.addEventListener("click", () => showTestimonial(testimonialIndex - 1));
if (testimonials.length) setInterval(() => showTestimonial(testimonialIndex + 1), 5200);

document.querySelector("[data-contact-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = document.querySelector("[data-form-note]");
  if (note) note.textContent = document.documentElement.lang === "ar" ? "شكرًا لك. النموذج جاهز للربط مع البريد أو خدمة النماذج." : "Thank you. This demo form is ready to connect to your email or form service.";
  event.currentTarget.reset();
});
