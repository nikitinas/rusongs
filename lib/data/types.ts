export type PerformanceType = "studio" | "live" | "cover" | "folk" | "amateur";

export type PerformanceSource = "youtube" | "vk" | "rutube" | "soundcloud" | "user_upload";

export interface PerformanceQuality {
  audio: number;
  video: number;
  authenticity: number;
}

export interface Performance {
  id: string;
  songId: string;
  title: string;
  type: PerformanceType;
  artists: string[];
  year: number;
  duration: number; // seconds
  source: PerformanceSource;
  sourceUrl: string;
  quality: PerformanceQuality;
  rating: {
    overall: number;
    votes: number;
  };
  context?: string;
  highlights?: string[];
  tempoBpm?: number;
  arrangement?: string;
}

export interface Song {
  id: string;
  slug: string;
  title: string;
  originalTitle?: string;
  era: string;
  genre: string;
  language: string;
  summary: string;
  lyrics: string;
  chords: string;
  defaultTempo: number;
  tags: string[];
  performances: Performance[];
  collections: string[];
  featuredImage?: string;
  historicalContext?: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  featuredSongIds: string[];
  curator: string;
  type: "thematic" | "decade" | "expert" | "community";
}
