/* =========================
   Ominitrix — main script
   ========================= */

// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // fecha ao clicar em algum link (mobile)
  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id.length <= 1) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Demo “submit”
function submitDemo(e){
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button');
  if (btn){
    btn.disabled = true;
    const prev = btn.textContent;
    btn.textContent = 'Sent ✓';
    setTimeout(()=>{ btn.disabled = false; btn.textContent = prev; }, 3000);
  }
  alert('Thanks! Wire this to your backend when ready.');
  return false;
}
window.submitDemo = submitDemo;

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Portfolio filter
(function setupPortfolioFilter(){
  const section = document.querySelector('#portfolio');
  if (!section) return;

  const bar = section.querySelector('.filters');
  const pills = bar ? Array.from(bar.querySelectorAll('.pill')) : [];
  const shots = Array.from(section.querySelectorAll('.shot'));
  if (!pills.length || !shots.length) return;

  // lazy nas imagens
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

// fecha menu ao mudar de breakpoint (evita estado travado)
let lastWide = window.innerWidth > 960;
window.addEventListener('resize', () => {
  const wide = window.innerWidth > 960;
  if (wide !== lastWide) {
    links && links.classList.remove('open');
    toggle && toggle.setAttribute('aria-expanded', 'false');
    lastWide = wide;
  }
});
