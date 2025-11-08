import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSongBySlug } from "@/lib/data";
import { SongHero } from "@/components/domain/SongHero";
import { SongTabs } from "@/components/domain/SongTabs";

interface SongPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: SongPageProps): Promise<Metadata> {
  const song = getSongBySlug(params.slug);
  if (!song) {
    return {
      title: "Песня не найдена"
    };
  }

  return {
    title: song.title,
    description: song.summary
  };
}

export default function SongPage({ params }: SongPageProps) {
  const song = getSongBySlug(params.slug);

  if (!song) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <SongHero song={song} />
      <SongTabs song={song} />
    </div>
  );
}
