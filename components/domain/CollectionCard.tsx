import Link from "next/link";
import type { Collection } from "@/lib/data/types";

interface CollectionCardProps {
  collection: Collection;
}

const TYPE_LABELS: Record<Collection["type"], string> = {
  thematic: "Тематическая",
  decade: "Десятилетие",
  expert: "Экспертная",
  community: "Сообщество"
};

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.slug}`} className="group block overflow-hidden rounded-2xl border border-primary/10 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-text-secondary">
        <span>{TYPE_LABELS[collection.type]}</span>
        <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">{collection.featuredSongIds.length} песен</span>
      </div>
      <h3 className="mt-3 font-display text-xl text-text-primary">{collection.title}</h3>
      <p className="mt-2 text-sm text-text-secondary">{collection.description}</p>
      <p className="mt-4 text-xs text-text-secondary">Куратор: <span className="font-medium text-text-primary">{collection.curator}</span></p>
    </Link>
  );
}
