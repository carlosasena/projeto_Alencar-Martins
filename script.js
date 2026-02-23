/* ── HAMBURGUER ────────────────────────────────────────── */
const toggle = document.getElementById('navToggle');
const navUl = document.querySelector('header ul');

if (toggle && navUl) {
  
  // Atualizar atributo aria-expanded
  function updateAriaExpanded(isOpen) {
    toggle.setAttribute('aria-expanded', isOpen);
  }
  
  toggle.addEventListener('click', () => {
    const isOpening = !toggle.classList.contains('open');
    toggle.classList.toggle('open');
    navUl.classList.toggle('open');
    updateAriaExpanded(isOpening);
  });

  // Fecha ao clicar em um link
  navUl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      navUl.classList.remove('open');
      updateAriaExpanded(false);
    });
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navUl.contains(e.target)) {
      toggle.classList.remove('open');
      navUl.classList.remove('open');
      updateAriaExpanded(false);
    }
  });
  
  // Fecha ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navUl.classList.contains('open')) {
      toggle.classList.remove('open');
      navUl.classList.remove('open');
      updateAriaExpanded(false);
    }
  });
}

/* ── FADE-IN (IntersectionObserver) ───────────────────── */
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Opcional: parar de observar após ficar visível
        // obs.unobserve(e.target);
      }
    });
  }, { 
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px' // Ajuste fino
  });

  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
} else {
  // Fallback para navegadores antigos
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
}

/* ── VALIDAÇÃO DE FORMULÁRIO (se existir) ─────────────── */
const contactForm = document.querySelector('.form-contato');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validação simples
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    
    if (!nome.value.trim()) {
      alert('Por favor, preencha seu nome');
      nome.focus();
      return;
    }
    
    if (!email.value.trim() || !email.value.includes('@')) {
      alert('Por favor, preencha um e-mail válido');
      email.focus();
      return;
    }
    
    // Se chegou aqui, pode enviar
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    contactForm.reset();
    
    // Aqui você pode adicionar o código para enviar via AJAX
    // contactForm.submit();
  });
}

/* ── MÁSCARA DE TELEFONE (opcional) ──────────────────── */
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
  telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 7) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else if (value.length > 0) {
      value = value.replace(/(\d{0,2})/, '($1');
    }
    
    e.target.value = value;
  });
}

/* ── DETECÇÃO DE PREFERÊNCIA DE MOVIMENTO ────────────── */
// Adiciona classe para reduzir animações se necessário
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.documentElement.classList.add('reduced-motion');
}