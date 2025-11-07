// Handle podcast name link clicks
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.podcast-name-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  });
}