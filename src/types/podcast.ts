export interface Podcast {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  duration?: string;
  date: string;
  category: string;
  podcastName: string;
  episodeNumber?: number;
  likes?: number;
  rating?: number;
  isCult?: boolean;
  podcastId?: string; // ID del podcast al que pertenece el episodio
}

export interface PodcastShow {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  episodes: Podcast[];
  totalEpisodes: number;
  likes?: number;
  rating?: number;
  isCult?: boolean;
}

