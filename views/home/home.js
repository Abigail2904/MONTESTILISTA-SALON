const input = document.querySelector('input');
const ul = document.querySelector('ul');
const addBtn = document.querySelector('.add-btn');
const invalidCheck = document.querySelector('.invalid-check');
const form = document.querySelector('#form');
const totalCountSpan = document.querySelector('.total-count');
const completedCountSpan = document.querySelector('.completed-count');
const incompletedCountSpan = document.querySelector('.incompleted-count');


//carrusel de Imagen con movimiento

document.addEventListener('DOMContentLoaded', () => {
  const carouselEl = document.querySelector('.carrusel');
  const images = carouselEl ? Array.from(carouselEl.querySelectorAll('img')) : [];
  let index = 0;
  let intervalId = null;

  if (images.length === 0) return;

  function showImage(i) {
    images.forEach(img => img.classList.remove('active'));
    const img = images[i % images.length];
    if (img) img.classList.add('active');
  }

  function startInterval() {
    stopInterval();
    intervalId = setInterval(() => {
      index = (index + 1) % images.length; // siempre vuelve a 0 cuando llega al final
      showImage(index);
    }, 1000);
  }

  function stopInterval() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // mostrar primera imagen y arrancar autoplay
  index = 0;
  showImage(index);
  startInterval();

  // pausa al hover y reinicia al salir
  if (carouselEl) {
    carouselEl.addEventListener('mouseenter', stopInterval);
    carouselEl.addEventListener('mouseleave', startInterval);
  }
});


 

// Panel de información del producto desplegable// ...existing code...

// --- Tendencias: panel info dinámico ---
(function () {
  const items = Array.from(document.querySelectorAll('.tendencia-item'));
  const panel = document.getElementById('productPanel');
  const content = {
    1: {
      name: 'Alisado con laser',
      desc: 'El alisado con láser es un tratamiento avanzado que utiliza tecnología de punta para suavizar y alisar el cabello. Este procedimiento ayuda a reducir el frizz, mejorar la manejabilidad y proporcionar un acabado brillante y sedoso. Ideal para quienes buscan una solución duradera para el cabello rebelde.',
      
    },
    2: {
      name: 'Alisado con laser',
      desc: ' El alisado con láser es un tratamiento avanzado que utiliza tecnología de punta para suavizar y alisar el cabello. Este procedimiento ayuda a reducir el frizz, mejorar la manejabilidad y proporcionar un acabado brillante y sedoso. Ideal para quienes buscan una solución duradera para el cabello rebelde.',
    }
  };

  if (!items.length || !panel) return;

  const nameEl = panel.querySelector('.product-name');
  const descEl = panel.querySelector('.product-desc');
  const priceEl = panel.querySelector('.product-price');
  const closeBtn = document.getElementById('closeProduct');

  function openPanel(id) {
    const data = content[id];
    if (!data) return;
    nameEl.textContent = data.name;
    descEl.textContent = data.desc;
    priceEl.textContent = data.price;
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    // desplazar suavemente hacia el panel (opcional)
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function closePanel() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  }

  items.forEach((it) => {
    const id = it.dataset.id;
    it.addEventListener('click', () => {
      // si está abierto y es el mismo id, cerrar
      if (panel.classList.contains('open') && nameEl.textContent === content[id].name) {
        closePanel();
      } else {
        openPanel(id);
      }
    });
    // accesibilidad: abrir con Enter
    it.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        it.click();
      }
    });
  });

  closeBtn?.addEventListener('click', closePanel);
})();
