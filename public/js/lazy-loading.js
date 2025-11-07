// Image lazy loading implementation
if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px'
  });

  // Observe all images with data-src after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    });
  } else {
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}