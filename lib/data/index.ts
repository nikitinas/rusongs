import {
  PerformanceType as PrismaPerformanceType,
  PerformanceSource as PrismaPerformanceSource,
  CollectionType as PrismaCollectionType,
  Collection as PrismaCollectionModel,
  Prisma,
} from "@prisma/client";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Collection, Performance, Song } from "./types";

type SongWithRelations = Prisma.SongGetPayload<{
  include: {
    performances: true;
    collections: true;
  };
}>;

type PerformanceRecord = Prisma.PerformanceGetPayload<{}>;

const mapPerformanceType = (type: PrismaPerformanceType): Performance["type"] => type.toLowerCase() as Performance["type"];

const mapPerformanceSource = (source: PrismaPerformanceSource): Performance["source"] =>
  source.toLowerCase() as Performance["source"];

const mapPerformance = (performance: PerformanceRecord): Performance => ({
  id: performance.id,
  songId: performance.songId,
  title: performance.title,
  type: mapPerformanceType(performance.type),
  artists: performance.artists,
  year: performance.year,
  duration: performance.duration,
  source: mapPerformanceSource(performance.source),
  sourceUrl: performance.sourceUrl,
  quality: performance.quality as Performance["quality"],
  rating: performance.rating as Performance["rating"],
  context: performance.context ?? undefined,
  highlights: performance.highlights.length ? performance.highlights : undefined,
  tempoBpm: performance.tempoBpm ?? undefined,
  arrangement: performance.arrangement ?? undefined,
});

const mapSong = (song: SongWithRelations): Song => ({
  id: song.id,
  slug: song.slug,
  title: song.title,
  originalTitle: song.originalTitle ?? undefined,
  era: song.era,
  genre: song.genre,
  language: song.language,
  summary: song.summary,
  lyrics: song.lyrics,
  chords: song.chords,
  defaultTempo: song.defaultTempo,
  tags: song.tags,
  performances: song.performances.map(mapPerformance),
  collections: song.collections.map((entry) => entry.collectionId),
  featuredImage: song.featuredImage ?? undefined,
  historicalContext: song.historicalContext ?? undefined,
});

const mapCollectionType = (type: PrismaCollectionType): Collection["type"] =>
  type.toLowerCase() as Collection["type"];

const mapCollection = (collection: PrismaCollectionModel): Collection => ({
  id: collection.id,
  slug: collection.slug,
  title: collection.title,
  description: collection.description,
  featuredSongIds: collection.featuredSongIds,
  curator: collection.curator,
  type: mapCollectionType(collection.type),
});

export const getSongs = cache(async (query?: { search?: string; tag?: string }): Promise<Song[]> => {
  const where: Prisma.SongWhereInput = {};

  const searchTerm = query?.search?.trim();
  if (searchTerm) {
    where.OR = [
      { title: { contains: searchTerm, mode: "insensitive" } },
      { originalTitle: { contains: searchTerm, mode: "insensitive" } },
      { summary: { contains: searchTerm, mode: "insensitive" } },
      { lyrics: { contains: searchTerm, mode: "insensitive" } },
      { performances: { some: { title: { contains: searchTerm, mode: "insensitive" } } } },
      { tags: { has: searchTerm.toLowerCase() } },
    ];
  }

  const tag = query?.tag?.trim().toLowerCase();
  if (tag) {
    where.tags = { has: tag };
  }

  const songs = await prisma.song.findMany({
    where,
    include: {
      performances: true,
      collections: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return songs.map(mapSong);
});

export const getSongBySlug = cache(async (slug: string): Promise<Song | undefined> => {
  const song = await prisma.song.findUnique({
    where: { slug },
    include: {
      performances: true,
      collections: true,
    },
  });

  return song ? mapSong(song) : undefined;
});

export const getPerformanceById = cache(async (performanceId: string): Promise<Performance | undefined> => {
  const performance = await prisma.performance.findUnique({
    where: { id: performanceId },
  });

  if (!performance) {
    return undefined;
  }

  return mapPerformance(performance);
});

export const getCollections = cache(async (): Promise<Collection[]> => {
  const collections = await prisma.collection.findMany({
    orderBy: {
      title: "asc",
    },
  });

  return collections.map(mapCollection);
});

export const getCollectionBySlug = cache(async (slug: string): Promise<Collection | undefined> => {
  const collection = await prisma.collection.findUnique({
    where: { slug },
  });

  return collection ? mapCollection(collection) : undefined;
});
