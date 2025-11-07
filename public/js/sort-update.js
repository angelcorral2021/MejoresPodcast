// Dynamic sorting update when likes change
if (typeof window !== 'undefined') {
  window.addEventListener('podcast-liked', async (e) => {
    const { podcastId } = e.detail;
    // Let the animation finish before reloading
    setTimeout(() => {
      window.location.reload();
    }, 300);
  });
}