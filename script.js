/* =========================
   Ominitrix — main script
   ========================= */

   // Inicializa o particles.js
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#2ea7ff" },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.5, "random": false, "anim": { "enable": false } },
    "size": { "value": 3, "random": true, "anim": { "enable": false } },
    "line_linked": { "enable": true, "distance": 150, "color": "#2ea7ff", "opacity": 0.4, "width": 1 },
    "move": { "enable": true, "speed": 4, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "repulse" },
      "onclick": { "enable": true, "mode": "push" },
      "resize": true
    },
    "modes": {
      "repulse": { "distance": 100, "duration": 0.4 },
      "push": { "particles_nb": 4 }
    }
  },
  "retina_detect": true
});

// Atualiza ano automaticamente no footer
document.getElementById("year").textContent = new Date().getFullYear();


/* =========================
   NAV MOBILE
   ========================= */
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Fecha ao clicar em algum link (mobile)
  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Fecha menu ao mudar de breakpoint (evita estado travado)
let lastWide = window.innerWidth > 960;
window.addEventListener('resize', () => {
  const wide = window.innerWidth > 960;
  if (wide !== lastWide) {
    links && links.classList.remove('open');
    toggle && toggle.setAttribute('aria-expanded', 'false');
    lastWide = wide;
  }
});

/* =========================
   SMOOTH SCROLL (DESATIVADO)
   ========================= */
// document.querySelectorAll('a[href^="#"]').forEach((a) => {
//   a.addEventListener('click', (e) => {
//     const id = a.getAttribute('href');
//     if (!id || id.length <= 1) return;
//     const el = document.querySelector(id);
//     if (!el) return;
//     e.preventDefault();
//     el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   });
// });

/* =========================
   FORMULÁRIO DEMO (DESATIVADO)
   ========================= */
// function submitDemo(e){
//   e.preventDefault();
//   const form = e.target;
//   const btn = form.querySelector('button');
//   if (btn){
//     btn.disabled = true;
//     const prev = btn.textContent;
//     btn.textContent = 'Sent ✓';
//     setTimeout(()=>{ btn.disabled = false; btn.textContent = prev; }, 3000);
//   }
//   alert('Thanks! Wire this to your backend when ready.');
//   return false;
// }
// window.submitDemo = submitDemo;

/* =========================
   ANO AUTOMÁTICO
   ========================= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================
   PORTFOLIO FILTER
   ========================= */
(function setupPortfolioFilter(){
  const section = document.querySelector('#portfolio');
  if (!section) return;

  const bar = section.querySelector('.filters');
  const pills = bar ? Array.from(bar.querySelectorAll('.pill')) : [];
  const shots = Array.from(section.querySelectorAll('.shot'));
  if (!pills.length || !shots.length) return;

  // Lazy nas imagens
  shots.forEach((s) => {
    const img = s.querySelector('img');
    if (img && !img.loading) img.loading = 'lazy';
    if (img) img.setAttribute('draggable','false');
  });

  const setActive = (btn) => {
    pills.forEach((p) => {
      const on = p === btn;
      p.classList.toggle('active', on);
      p.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  };

  const applyFilter = (kind) => {
    const k = String(kind || 'all').toLowerCase();
    shots.forEach((card) => {
      const cat = (card.getAttribute('data-cat') || '').toLowerCase();
      const show = (k === 'all') || (cat === k);
      card.classList.toggle('hide', !show);
    });
  };

  pills.forEach((btn) => {
    btn.setAttribute('role','button');
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');

    btn.addEventListener('click', () => {
      setActive(btn);
      applyFilter(btn.dataset.filter);
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  const initial = pills.find(p => p.classList.contains('active')) || pills[0];
  if (initial){
    setActive(initial);
    applyFilter(initial.dataset.filter);
  }
})();
