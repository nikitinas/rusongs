import { cache } from "react";
import { SAMPLE_COLLECTIONS, SAMPLE_SONGS } from "./sampleSongs";
import type { Collection, Performance, Song } from "./types";

export const getSongs = cache((query?: { search?: string; tag?: string }) => {
  const normalisedSearch = query?.search?.trim().toLowerCase();
  const normalisedTag = query?.tag?.toLowerCase();

  return SAMPLE_SONGS.filter((song) => {
    const matchesSearch = normalisedSearch
      ? [
          song.title,
          song.originalTitle,
          song.summary,
          song.tags.join(" "),
          song.performances.map((performance) => performance.title).join(" ")
        ]
          .filter(Boolean)
          .some((field) => field!.toLowerCase().includes(normalisedSearch))
      : true;

    const matchesTag = normalisedTag ? song.tags.map((tag) => tag.toLowerCase()).includes(normalisedTag) : true;

    return matchesSearch && matchesTag;
  });
});

export const getSongBySlug = cache((slug: string): Song | undefined => {
  return SAMPLE_SONGS.find((song) => song.slug === slug);
});

export const getPerformanceById = cache((performanceId: string): Performance | undefined => {
  return SAMPLE_SONGS.flatMap((song) => song.performances).find((performance) => performance.id === performanceId);
});

export const getCollections = cache((): Collection[] => SAMPLE_COLLECTIONS);

export const getCollectionBySlug = cache((slug: string): Collection | undefined => {
  return SAMPLE_COLLECTIONS.find((collection) => collection.slug === slug);
});
