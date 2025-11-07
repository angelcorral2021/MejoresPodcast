// Individual episode like button initialization
if (typeof document !== 'undefined') {
  function initEpisodeLikeButton() {
    const likeButton = document.querySelector('.episode-like-button');
    if (!likeButton) return;

    const podcastId = likeButton.getAttribute('data-podcast-id');
    if (!podcastId) return;

    // Check if already liked
    const likedPodcasts = localStorage.getItem('user_liked_podcasts');
    if (likedPodcasts) {
      try {
        const liked = JSON.parse(likedPodcasts);
        if (liked.includes(podcastId)) {
          likeButton.classList.add('liked');
          const countElement = likeButton.querySelector('.like-count');
          if (countElement) {
            const likesData = localStorage.getItem('podcast_likes');
            if (likesData) {
              const likes = JSON.parse(likesData);
              countElement.textContent = (likes[podcastId] || 0).toString();
            }
          }
        }
      } catch (e) {
        console.error('Error checking liked status:', e);
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEpisodeLikeButton);
  } else {
    initEpisodeLikeButton();
  }
}