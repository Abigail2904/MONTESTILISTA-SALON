
    // Script para desplegar contenido al hacer clic
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('active');
      });
    });