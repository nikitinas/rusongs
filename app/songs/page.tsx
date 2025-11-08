import Link from "next/link";
import type { Metadata } from "next";
import { CatalogSearchForm } from "@/components/domain/CatalogSearchForm";
import { SongCard } from "@/components/domain/SongCard";
import { getSongs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Каталог песен",
  description: "Исследуйте исполнений, сравнивайте версии и находите новые любимые песни."
};

interface SongsPageProps {
  searchParams: { query?: string; tag?: string };
}

export default async function SongsPage({ searchParams }: SongsPageProps) {
  const [songs, allSongs] = await Promise.all([getSongs({ search: searchParams.query, tag: searchParams.tag }), getSongs()]);

  const availableTags = Array.from(new Set(allSongs.flatMap((song) => song.tags))).slice(0, 12);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="font-display text-4xl text-primary">Каталог песен</h1>
        <p className="text-sm text-text-secondary">
          В базе {allSongs.length} произведений. Используйте поиск и фильтры, чтобы найти нужное исполнение.
        </p>
        <CatalogSearchForm />
      </header>

      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-[0.3em] text-text-secondary">Популярные теги</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/songs"
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              !searchParams.tag ? "bg-primary text-white" : "border border-primary/20 text-primary hover:border-primary/40 hover:bg-primary/5"
            }`}
          >
            Все
          </Link>
          {availableTags.map((tag) => {
            const isActive = searchParams.tag === tag;
            return (
              <Link
                key={tag}
                href={`/songs?tag=${encodeURIComponent(tag)}`}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  isActive ? "bg-primary text-white" : "border border-primary/20 text-primary hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                #{tag}
              </Link>
            );
          })}
        </div>
      </section>

      {searchParams.query ? (
        <p className="text-sm text-text-secondary">
          Результаты по запросу: <span className="font-medium text-text-primary">“{searchParams.query}”</span>
        </p>
      ) : null}

      <section>
        {songs.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {songs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-primary/20 bg-white/80 p-10 text-center text-sm text-text-secondary">
            По вашим фильтрам ничего не найдено. Попробуйте изменить запрос или выбрать другой тег.
          </div>
        )}
      </section>
    </div>
  );
}
