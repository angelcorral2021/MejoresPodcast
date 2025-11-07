function initLatestCarousel() {
  const carousel = document.querySelector('#latest-section .carousel-container');
  const track = carousel?.querySelector('.carousel-slides');
  const slides = carousel?.querySelectorAll('.carousel-slide');
  const dotsContainer = document.querySelector('#latest-section .carousel-dots');
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
    // Calcular el ancho total y el desplazamiento
    const slideWidth = 100 / slidesPerPage;
    const offset = currentPage * -slideWidth;
    
    // Actualizar posición del track
    track.style.transform = `translateX(${offset}%)`;
    
    // Actualizar estado de los botones
    if (prevButton) {
      prevButton.disabled = currentPage === 0;
      prevButton.style.visibility = currentPage === 0 ? 'hidden' : 'visible';
    }
    
    if (nextButton) {
      nextButton.disabled = currentPage >= totalPages - 1;
      nextButton.style.visibility = currentPage >= totalPages - 1 ? 'hidden' : 'visible';
    }

    // Actualizar dots
    if (dots) {
      dots.forEach((dot, i) => {
        dot.setAttribute('data-active', (i === currentPage).toString());
        dot.setAttribute('aria-selected', (i === currentPage).toString());
      });
    }
  }

  // Event Listeners para los botones
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

  // Event Listeners para los dots
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

  // Keyboard navigation
  carousel.setAttribute('tabindex', '0');
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentPage > 0) {
      currentPage--;
      updateCarousel();
    } else if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
      currentPage++;
      updateCarousel();
    }
  });

  // Responsive handling
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const oldTotalPages = totalPages;
      totalPages = updateSlidesPerPage();
      
      if (currentPage >= totalPages) {
        currentPage = totalPages - 1;
      }
      
      updateCarousel();
    }, 250);
  });

  // Autoplay functionality
  let autoplayInterval;
  let isUserInteracting = false;
  const AUTOPLAY_DELAY = 5000; // 5 segundos entre cada slide

  function startAutoplay() {
    if (!isUserInteracting) {
      autoplayInterval = setInterval(() => {
        if (currentPage < totalPages - 1) {
          currentPage++;
        } else {
          currentPage = 0;
        }
        updateCarousel();
      }, AUTOPLAY_DELAY);
    }
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  function handleUserInteraction() {
    isUserInteracting = true;
    stopAutoplay();
    // Reiniciar autoplay después de 10 segundos de inactividad
    setTimeout(() => {
      isUserInteracting = false;
      startAutoplay();
    }, 10000);
  }

  // Detener autoplay en interacción del usuario
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', () => {
    if (!isUserInteracting) startAutoplay();
  });
  carousel.addEventListener('touchstart', handleUserInteraction, { passive: true });
  carousel.addEventListener('click', handleUserInteraction);

  // También detener en foco para accesibilidad
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', () => {
    if (!isUserInteracting) startAutoplay();
  });

  // Detener autoplay cuando la página no está visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else if (!isUserInteracting) {
      startAutoplay();
    }
  });

  // Initial setup
  updateCarousel();
  startAutoplay();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLatestCarousel);
} else {
  initLatestCarousel();
}