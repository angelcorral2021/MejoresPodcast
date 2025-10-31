/**
 * Utilidades para gestionar likes y ratings de podcasts
 * Usa localStorage para persistencia del estado
 */

const LIKES_STORAGE_KEY = 'podcast_likes';
const RATINGS_STORAGE_KEY = 'podcast_ratings';

export interface LikesData {
  [podcastId: string]: number;
}

export interface RatingsData {
  [podcastId: string]: number;
}

/**
 * Obtiene todos los likes guardados
 */
export function getLikes(): LikesData {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(LIKES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Obtiene el número de likes de un podcast
 */
export function getPodcastLikes(podcastId: string): number {
  const likes = getLikes();
  return likes[podcastId] || 0;
}

/**
 * Incrementa los likes de un podcast
 */
export function likePodcast(podcastId: string): number {
  if (typeof window === 'undefined') return 0;
  
  const likes = getLikes();
  const currentLikes = likes[podcastId] || 0;
  const newLikes = currentLikes + 1;
  
  likes[podcastId] = newLikes;
  
  try {
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likes));
    // Disparar evento personalizado para actualizar UI
    window.dispatchEvent(new CustomEvent('podcast-liked', { 
      detail: { podcastId, likes: newLikes } 
    }));
  } catch (error) {
    console.error('Error guardando likes:', error);
  }
  
  return newLikes;
}

/**
 * Verifica si un usuario ya dio like a un podcast
 */
export function hasUserLiked(podcastId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const likedPodcasts = localStorage.getItem('user_liked_podcasts');
  if (!likedPodcasts) return false;
  
  try {
    const liked: string[] = JSON.parse(likedPodcasts);
    return liked.includes(podcastId);
  } catch {
    return false;
  }
}

/**
 * Marca un podcast como liked por el usuario
 */
export function markAsLiked(podcastId: string): void {
  if (typeof window === 'undefined') return;
  
  const likedPodcasts = localStorage.getItem('user_liked_podcasts');
  let liked: string[] = [];
  
  if (likedPodcasts) {
    try {
      liked = JSON.parse(likedPodcasts);
    } catch {
      liked = [];
    }
  }
  
  if (!liked.includes(podcastId)) {
    liked.push(podcastId);
    localStorage.setItem('user_liked_podcasts', JSON.stringify(liked));
  }
}

/**
 * Obtiene el rating promedio de un podcast
 */
export function getPodcastRating(podcastId: string): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const stored = localStorage.getItem(RATINGS_STORAGE_KEY);
    const ratings: RatingsData = stored ? JSON.parse(stored) : {};
    return ratings[podcastId] || 0;
  } catch {
    return 0;
  }
}

/**
 * Calcula la prioridad de un podcast basada en likes y rating
 */
export function calculatePriority(podcast: { id: string; likes?: number; rating?: number }): number {
  const likes = getPodcastLikes(podcast.id) || podcast.likes || 0;
  const rating = getPodcastRating(podcast.id) || podcast.rating || 0;
  
  // Prioridad = (likes * 2) + (rating * 10)
  // Esto da más peso al rating pero los likes también son importantes
  return (likes * 2) + (rating * 10);
}

