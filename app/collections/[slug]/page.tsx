import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollectionBySlug, getSongs } from "@/lib/data";
import { SongCard } from "@/components/domain/SongCard";

interface CollectionPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) {
    return { title: "Коллекция не найдена" };
  }
  return {
    title: collection.title,
    description: collection.description
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) {
    notFound();
  }

  const songs = getSongs().filter((song) => collection.featuredSongIds.includes(song.id));

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Подборка
        </span>
        <h1 className="font-display text-4xl text-primary">{collection.title}</h1>
        <p className="text-sm text-text-secondary">Куратор: {collection.curator}</p>
        <p className="text-sm text-text-secondary">{collection.description}</p>
      </header>
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </section>
    </div>
  );
}
