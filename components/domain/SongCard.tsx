import Link from "next/link";
import type { Song } from "@/lib/data/types";

interface SongCardProps {
  song: Song;
}

export function SongCard({ song }: SongCardProps) {
  return (
    <Link href={`/songs/${song.slug}`} className="group block overflow-hidden rounded-2xl border border-primary/10 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img alt={song.title} src={song.featuredImage ?? "/images/songs/placeholder.svg"} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
          {song.genre}
        </span>
      </div>
      <div className="space-y-2 p-5">
        <h3 className="font-display text-xl text-text-primary">{song.title}</h3>
        <p className="line-clamp-3 text-sm text-text-secondary">{song.summary}</p>
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>{song.performances.length} исполнений</span>
          <span>{song.era}</span>
        </div>
      </div>
    </Link>
  );
}
