// Like system implementation
function initLikeButtons() {
  const likeButtons = document.querySelectorAll('.like-button');
  
  likeButtons.forEach(button => {
    const podcastId = button.getAttribute('data-podcast-id');
    if (!podcastId) return;

    // Check if already liked
    if (typeof window !== 'undefined') {
      const likedPodcasts = localStorage.getItem('user_liked_podcasts');
      if (likedPodcasts) {
        try {
          const liked = JSON.parse(likedPodcasts);
          if (liked.includes(podcastId)) {
            button.classList.add('liked');
          }
        } catch (e) {
          console.error('Error parsing liked podcasts:', e);
        }
      }
    }

    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleLike(podcastId, button);
    });
  });
}

function handleLike(podcastId, button) {
  if (typeof window === 'undefined') return;

  // Get current likes
  const likesData = localStorage.getItem('podcast_likes');
  let likes = {};
  
  if (likesData) {
    try {
      likes = JSON.parse(likesData);
    } catch (e) {
      console.error('Error parsing likes:', e);
    }
  }

  // Check if user already liked
  const userLiked = localStorage.getItem('user_liked_podcasts');
  let liked = [];
  
  if (userLiked) {
    try {
      liked = JSON.parse(userLiked);
    } catch (e) {
      liked = [];
    }
  }

  const isLiked = liked.includes(podcastId);
  const currentLikes = likes[podcastId] || 0;

  if (isLiked) {
    // Remove like
    liked = liked.filter(id => id !== podcastId);
    likes[podcastId] = Math.max(0, currentLikes - 1);
    button.classList.remove('liked');
  } else {
    // Add like
    liked.push(podcastId);
    likes[podcastId] = currentLikes + 1;
    button.classList.add('liked');
  }

  // Save to localStorage
  localStorage.setItem('podcast_likes', JSON.stringify(likes));
  localStorage.setItem('user_liked_podcasts', JSON.stringify(liked));

  // Update visual counter
  const countElement = button.querySelector('.like-count');
  if (countElement) {
    countElement.textContent = likes[podcastId].toString();
  }

  // Dispatch event for other components
  window.dispatchEvent(new CustomEvent('podcast-liked', {
    detail: { podcastId, likes: likes[podcastId] }
  }));
}

// Initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLikeButtons);
  } else {
    initLikeButtons();
  }

  // Listen for like events from other components
  window.addEventListener('podcast-liked', (e) => {
    const { podcastId, likes } = e.detail;
    const countElement = document.querySelector(`.like-count[data-like-count="${podcastId}"]`);
    if (countElement) {
      countElement.textContent = likes.toString();
    }
  });
}