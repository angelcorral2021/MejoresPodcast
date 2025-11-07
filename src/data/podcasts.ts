import type { Podcast, PodcastShow } from '../types/podcast';

export const podcasts: Podcast[] = [
  // Podcasts de HUMOR
  {
    id: '1',
    title: 'EL SENTIDO DEL HUMOR | Altas Expectaturas - Junto al Loco Lithium | 23 de Abril 2024',
    description: 'Un episodio hilarante donde exploramos el sentido del humor desde diferentes perspectivas. Conversaciones cómicas y anécdotas divertidas que te harán reír sin parar.',
    youtubeId: 's-Ao6vf0dI8',
    thumbnail: 'https://img.youtube.com/vi/s-Ao6vf0dI8/maxresdefault.jpg',
    duration: '65:30',
    date: '2024-04-23',
    category: 'Humor',
    podcastName: 'Altas Expectaturas',
    episodeNumber: 42,
    likes: 1250,
    rating: 4.8,
    podcastId: 'podcast-altas-expectaturas'
  },
  {
    id: '2',
    title: 'ESPECIAL SEÑORA JUANITA',
    description: 'Episodio especial dedicado a las mejores historias y chistes sobre la Señora Juanita. Un clásico del humor que no te puedes perder.',
    youtubeId: 'oXTVS7YwxLQ',
    thumbnail: 'https://img.youtube.com/vi/oXTVS7YwxLQ/maxresdefault.jpg',
    duration: '52:15',
    date: '2024-04-20',
    category: 'Humor',
    podcastName: 'Altas Expectaturas',
    episodeNumber: 41,
    likes: 980,
    rating: 4.9,
    isCult: true,
    podcastId: 'podcast-altas-expectaturas'
  },
  {
    id: '3',
    title: 'EL SENTIDO DEL HUMOR | Patas con guata | 19 de Octubre de 2023',
    description: 'Compilación de las bromas más divertidas y situaciones cómicas del año. Risas garantizadas.',
    youtubeId: 'T6Zn6Cs4QSw',
    thumbnail: 'https://img.youtube.com/vi/T6Zn6Cs4QSw/maxresdefault.jpg',
    duration: '58:45',
    date: '2024-04-18',
    category: 'Humor',
    podcastName: 'Comedia Sin Filtro',
    episodeNumber: 25,
    likes: 756,
    rating: 4.7,
    podcastId: 'podcast-comedia-sin-filtro'
  },
  {
    id: '4',
    title: 'Stand Up: Los Mejores Chistes',
    description: 'Los mejores momentos de stand up comedy del mes. Comediantes destacados y sus mejores rutinas.',
    youtubeId: 'kJQP7kiw5Fk',
    thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
    duration: '45:20',
    date: '2024-04-15',
    category: 'Humor',
    podcastName: 'Comedia Sin Filtro',
    episodeNumber: 24,
    likes: 642,
    rating: 4.6,
    podcastId: 'podcast-comedia-sin-filtro'
  },
  {
    id: '5',
    title: 'Historias Cómicas Reales',
    description: 'Historias reales contadas de forma cómica. Situaciones absurdas que solo pasan en la vida real.',
    youtubeId: 'OPf0YbXqDm0',
    thumbnail: 'https://img.youtube.com/vi/OPf0YbXqDm0/maxresdefault.jpg',
    duration: '48:10',
    date: '2024-04-12',
    category: 'Humor',
    podcastName: 'Risas Garantizadas',
    episodeNumber: 18,
    likes: 534,
    rating: 4.5,
    podcastId: 'podcast-risas-garantizadas'
  },
  {
    id: '6',
    title: 'Sátira Política Cómica',
    description: 'Un análisis cómico y satírico de los acontecimientos políticos más recientes. Humor inteligente y mordaz.',
    youtubeId: 'ScMzIvxBSi4',
    thumbnail: 'https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg',
    duration: '41:55',
    date: '2024-04-10',
    category: 'Humor',
    podcastName: 'Humor Inteligente',
    episodeNumber: 15,
    likes: 423,
    rating: 4.4,
    podcastId: 'podcast-humor-inteligente'
  },
  // Podcasts de otras categorías
  
  {
    id: '9',
    title: 'Salud Mental y Bienestar',
    description: 'Una charla honesta sobre la importancia de cuidar nuestra salud mental, con estrategias prácticas.',
    youtubeId: 'kJQP7kiw5Fk',
    thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
    duration: '48:20',
    date: '2024-04-17',
    category: 'Salud',
    podcastName: 'Vida Plena',
    episodeNumber: 32,
    likes: 289,
    rating: 4.2,
    podcastId: 'podcast-vida-plena'
  },
  {
    id: '10',
    title: 'Ciencia y Descubrimientos',
    description: 'Los últimos descubrimientos científicos que están cambiando nuestro entendimiento del universo.',
    youtubeId: 'OPf0YbXqDm0',
    thumbnail: 'https://img.youtube.com/vi/OPf0YbXqDm0/maxresdefault.jpg',
    duration: '50:10',
    date: '2024-04-14',
    category: 'Ciencia',
    podcastName: 'Exploradores',
    episodeNumber: 38,
    likes: 512,
    rating: 4.6,
    podcastId: 'podcast-exploradores',
    isCult: true
  },
];

// Funciones de utilidad
export function getPodcastById(id: string): Podcast | undefined {
  return podcasts.find(podcast => podcast.id === id);
}

export function getPodcastsByCategory(category: string): Podcast[] {
  return podcasts.filter(podcast => podcast.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set(podcasts.map(podcast => podcast.category))];
}

export function getLatestPodcasts(limit: number = 6): Podcast[] {
  return [...podcasts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getBestRatedPodcasts(limit: number = 6): Podcast[] {
  return [...podcasts]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}

export function getCultPodcasts(): Podcast[] {
  return podcasts.filter(podcast => podcast.isCult === true);
}

export function getHumorPodcasts(limit?: number): Podcast[] {
  const humorPodcasts = podcasts.filter(podcast => podcast.category === 'Humor');
  if (limit) {
    return humorPodcasts.slice(0, limit);
  }
  return humorPodcasts;
}

export function getPodcastsByShow(podcastId: string): Podcast[] {
  return podcasts.filter(podcast => podcast.podcastId === podcastId);
}

export function getPodcastShows(): PodcastShow[] {
  const showsMap = new Map<string, PodcastShow>();
  
  podcasts.forEach(podcast => {
    const showId = podcast.podcastId || `podcast-${podcast.podcastName.toLowerCase().replace(/\s+/g, '-')}`;
    
    if (!showsMap.has(showId)) {
      showsMap.set(showId, {
        id: showId,
        name: podcast.podcastName,
        description: `Todos los episodios de ${podcast.podcastName}`,
        thumbnail: podcast.thumbnail,
        category: podcast.category,
        episodes: [],
        totalEpisodes: 0,
        likes: podcast.likes || 0,
        rating: podcast.rating || 0,
        isCult: podcast.isCult || false
      });
    }
    
    const show = showsMap.get(showId)!;
    show.episodes.push(podcast);
    show.totalEpisodes = show.episodes.length;
    show.likes = (show.likes || 0) + (podcast.likes || 0);
    show.rating = show.episodes.reduce((sum, ep) => sum + (ep.rating || 0), 0) / show.episodes.length;
  });
  
  return Array.from(showsMap.values());
}

export function getPodcastShowById(showId: string): PodcastShow | undefined {
  return getPodcastShows().find(show => show.id === showId);
}
