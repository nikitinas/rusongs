import type { Song } from "@/lib/data/types";

interface SongHeroProps {
  song: Song;
}

export function SongHero({ song }: SongHeroProps) {
  return (
    <section className="grid gap-8 md:grid-cols-[2fr,1fr] md:items-center">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-accent">{song.era}</p>
        <h1 className="font-display text-4xl md:text-5xl">{song.title}</h1>
        <p className="text-lg text-text-secondary">{song.summary}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          {song.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-primary">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
          <span>
            <strong className="text-text-primary">{song.performances.length}</strong> исполнений
          </span>
          <span>
            <strong className="text-text-primary">{song.defaultTempo} BPM</strong> базовый темп
          </span>
        </div>
      </div>
      <aside className="card h-full w-full overflow-hidden">
        <div className="relative h-64 w-full overflow-hidden">
          <img
            alt={`Обложка песни ${song.title}`}
            src={song.featuredImage ?? "/images/songs/placeholder.svg"}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-2 border-t border-black/5 p-5 text-sm text-text-secondary">
          <div>
            <span className="font-medium text-text-primary">Язык:</span> {song.language.toUpperCase()}
          </div>
          <div>
            <span className="font-medium text-text-primary">Жанр:</span> {song.genre}
          </div>
          <div>
            <span className="font-medium text-text-primary">Коллекции:</span> {song.collections.length}
          </div>
        </div>
      </aside>
    </section>
  );
}
