function initEpisodesCarousel() {
  const carousel = document.querySelector('.carousel-container');
  const track = carousel?.querySelector('.carousel-slides');
  const slides = carousel?.querySelectorAll('.carousel-slide');
  const dotsContainer = document.querySelector('.carousel-dots');
  const dots = dotsContainer?.querySelectorAll('.carousel-dot');
  const prevButton = carousel?.querySelector('.carousel-button.prev');
  const nextButton = carousel?.querySelector('.carousel-button.next');
  
  if (!carousel || !track || !slides?.length) return;

  let currentPage = 0;
  let slidesPerPage = 1;

  function updateSlidesPerPage() {
    const width = window.innerWidth;
    slidesPerPage = width >= 1024 ? 3 : width >= 640 ? 2 : 1;
    return Math.ceil(slides.length / slidesPerPage);
  }

  let totalPages = updateSlidesPerPage();

  function updateCarousel() {
    const slideWidth = 100 / slidesPerPage;
    const offset = currentPage * -slideWidth;
    
    // Actualizar posición del track
    track.style.transform = `translateX(${offset}%)`;
    
    // Actualizar estado de los botones
    if (prevButton) prevButton.disabled = currentPage === 0;
    if (nextButton) nextButton.disabled = currentPage >= totalPages - 1;

    // Actualizar dots
    if (dots) {
      dots.forEach((dot, i) => {
        dot.setAttribute('data-active', (i === currentPage).toString());
        dot.setAttribute('aria-selected', (i === currentPage).toString());
      });
    }

    // Actualizar ARIA labels
    const start = currentPage * slidesPerPage + 1;
    const end = Math.min((currentPage + 1) * slidesPerPage, slides.length);
    
    if (prevButton) prevButton.setAttribute('aria-label', `Ver episodios ${Math.max(1, start - slidesPerPage)} a ${start - 1}`);
    if (nextButton) nextButton.setAttribute('aria-label', `Ver episodios ${end + 1} a ${Math.min(end + slidesPerPage, slides.length)}`);
  }

  // Event Listeners
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        updateCarousel();
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages - 1) {
        currentPage++;
        updateCarousel();
      }
    });
  }

  // Click handlers para dots
  if (dots) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentPage = i;
        updateCarousel();
      });
    });
  }

  // Touch/Swipe handling
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentPage < totalPages - 1) {
        // Swipe izquierda
        currentPage++;
        updateCarousel();
      } else if (diff < 0 && currentPage > 0) {
        // Swipe derecha
        currentPage--;
        updateCarousel();
      }
    }
  }

  // Manejo responsivo
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const oldTotalPages = totalPages;
      totalPages = updateSlidesPerPage();
      
      // Ajustar la página actual si es necesario
      if (currentPage >= totalPages) {
        currentPage = totalPages - 1;
      }
      
      updateCarousel();
    }, 250);
  });

  // Inicialización
  updateCarousel();
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEpisodesCarousel);
} else {
  initEpisodesCarousel();
}