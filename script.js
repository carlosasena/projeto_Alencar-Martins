/* ── HAMBURGUER ────────────────────────────────────────── */
const toggle = document.getElementById('navToggle');
const navUl  = document.querySelector('header ul');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  navUl.classList.toggle('open');
});

// Fecha ao clicar em um link
navUl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    navUl.classList.remove('open');
  });
});

// Fecha ao clicar fora
document.addEventListener('click', (e) => {
  if (!toggle.contains(e.target) && !navUl.contains(e.target)) {
    toggle.classList.remove('open');
    navUl.classList.remove('open');
  }
});

/* ── FADE-IN (IntersectionObserver) ───────────────────── */
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));