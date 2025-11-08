"use client";

import { ExternalLink, Sparkles, Star } from "lucide-react";
import { useCompareTray } from "@/lib/hooks/useCompareTray";
import type { Performance } from "@/lib/data/types";
import { formatDuration, formatTempo, formatYear } from "@/lib/utils/format";

interface PerformanceCardProps {
  performance: Performance;
  showComparison?: boolean;
}

export function PerformanceCard({ performance, showComparison = true }: PerformanceCardProps) {
  const { togglePerformance, performances } = useCompareTray();
  const selected = performances.some((item) => item.id === performance.id);

  return (
    <article className="card flex flex-col gap-4 p-5">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl text-text-primary">{performance.title}</h3>
          <p className="text-sm text-text-secondary">{performance.artists.join(", ")}</p>
        </div>
        <span className="rounded-full border border-primary/20 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
          {performance.type}
        </span>
      </header>
      <dl className="grid grid-cols-2 gap-4 text-sm text-text-secondary sm:grid-cols-4">
        <div>
          <dt className="font-medium text-text-primary">Год</dt>
          <dd>{formatYear(performance.year)}</dd>
        </div>
        <div>
          <dt className="font-medium text-text-primary">Длительность</dt>
          <dd>{formatDuration(performance.duration)}</dd>
        </div>
        <div>
          <dt className="font-medium text-text-primary">Темп</dt>
          <dd>{formatTempo(performance.tempoBpm)}</dd>
        </div>
        <div>
          <dt className="font-medium text-text-primary">Рейтинг</dt>
          <dd className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            {performance.rating.overall.toFixed(1)} <span className="text-xs">({performance.rating.votes})</span>
          </dd>
        </div>
      </dl>
      {performance.highlights?.length ? (
        <ul className="flex flex-wrap gap-2 text-xs">
          {performance.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-accent">
              <Sparkles className="h-3 w-3" /> {highlight}
            </li>
          ))}
        </ul>
      ) : null}
      {performance.context ? <p className="text-sm text-text-secondary">{performance.context}</p> : null}
      <footer className="flex flex-wrap gap-3">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={performance.sourceUrl}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-3 py-1.5 text-sm font-medium text-primary transition hover:border-primary/50 hover:bg-primary/5"
        >
          Открыть источник
          <ExternalLink className="h-4 w-4" />
        </a>
        {showComparison ? (
          <button
            type="button"
            onClick={() => togglePerformance(performance)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition ${
              selected
                ? "border border-primary bg-primary text-white"
                : "border border-primary/20 text-primary hover:border-primary/40 hover:bg-primary/5"
            }`}
          >
            {selected ? "В сравнении" : "Сравнить"}
          </button>
        ) : null}
      </footer>
    </article>
  );
}
