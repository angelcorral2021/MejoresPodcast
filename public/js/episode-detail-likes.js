if (typeof document !== 'undefined') {
  function initEpisodeLikeButton() {
    const likeButton = document.querySelector('.episode-like-button');
    if (!likeButton) return;

    const podcastId = likeButton.getAttribute('data-podcast-id');
    if (!podcastId) return;

    // Verificar si ya tiene like
    const likedPodcasts = localStorage.getItem('user_liked_podcasts');
    if (likedPodcasts) {
      try {
        const liked = JSON.parse(likedPodcasts);
        if (liked.includes(podcastId)) {
          likeButton.classList.add('liked');
        }
      } catch (e) {
        console.error('Error parsing liked podcasts:', e);
      }
    }

    likeButton.addEventListener('click', () => {
      handleEpisodeLike(podcastId, likeButton);
    });
  }

  function handleEpisodeLike(podcastId, button) {
    if (typeof window === 'undefined') return;

    const likesData = localStorage.getItem('podcast_likes');
    let likes = {};
    
    if (likesData) {
      try {
        likes = JSON.parse(likesData);
      } catch (e) {
        console.error('Error parsing likes:', e);
      }
    }

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
      liked = liked.filter(id => id !== podcastId);
      likes[podcastId] = Math.max(0, currentLikes - 1);
      button.classList.remove('liked');
    } else {
      liked.push(podcastId);
      likes[podcastId] = currentLikes + 1;
      button.classList.add('liked');
    }

    localStorage.setItem('podcast_likes', JSON.stringify(likes));
    localStorage.setItem('user_liked_podcasts', JSON.stringify(liked));

    const countElement = button.querySelector('.episode-like-count');
    if (countElement) {
      countElement.textContent = likes[podcastId].toString();
    }

    window.dispatchEvent(new CustomEvent('podcast-liked', {
      detail: { podcastId, likes: likes[podcastId] }
    }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEpisodeLikeButton);
  } else {
    initEpisodeLikeButton();
  }
}