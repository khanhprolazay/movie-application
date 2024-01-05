export interface Genre {
  name: string,
}

export interface Movie {
  id: number,
  title: string,
  rating: number,
  imageUrl: string,
  release: string,
  posterPath?: string,
  movieLength?: number,
  backdropPath?: string,
  genres: { id: number, genre: Genre }[], 
}

export interface Video {
  name: string;
  key: string;
  site: string;
  type: string;
  size: number;
  official: boolean;
}

export interface Actor {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Cast {
  role: string;
  actor: Actor;
}

export interface DetailMovie {
  id: number,
  imdbId: string,
  title: string,
  rating: number,
  description?: string,
  movieLength?: number,
  videos: Video[],
  imageUrl: string,
  release?: string,
  plot?: string,
  banner: string,
  posterPath?: string,
  backdropPath?: string,
  genres: { id: number, genre: Genre }[], 
  casts: Cast[],
  directors: {actorId: string, actor: Actor}[],
}