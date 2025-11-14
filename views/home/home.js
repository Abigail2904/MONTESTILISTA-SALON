//carrusel de Imagen con movimuiento
const images = document.querySelector('.carousel-images');
const total = images.children.length;
let index = 0;

function showSlide(i) {
  images.style.transform = `translateX(-${i * 100}%)`;
}

document.querySelector('.next').addEventListener('click', () => {
  index = (index + 1) % total;
  showSlide(index);
});

document.querySelector('.prev').addEventListener('click', () => {
  index = (index - 1 + total) % total;
  showSlide(index);
});

// ⏱️ Desplazamiento automático cada 4 segundos
setInterval(() => {
  index = (index + 1) % total;
  showSlide(index);
}, 4000);

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
