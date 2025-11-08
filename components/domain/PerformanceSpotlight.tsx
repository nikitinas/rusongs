import { ExternalLink } from "lucide-react";
import type { Performance } from "@/lib/data/types";
import { formatYear } from "@/lib/utils/format";

interface PerformanceSpotlightProps {
  performance: Performance;
  title: string;
  variant?: "day" | "week";
}

export function PerformanceSpotlight({ performance, title, variant = "day" }: PerformanceSpotlightProps) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br ${
      variant === "day" ? "from-primary/10 via-white to-white" : "from-accent/10 via-white to-white"
    } p-6 shadow-soft`}
    >
      <div className="flex flex-col gap-4">
        <span className="inline-flex w-fit rounded-full bg-white/60 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">
          {title}
        </span>
        <h3 className="font-display text-2xl text-text-primary">{performance.title}</h3>
        <p className="text-sm text-text-secondary">{performance.artists.join(", ")}</p>
        <p className="text-sm text-text-secondary">{formatYear(performance.year)} • {performance.type}</p>
        <div className="flex flex-wrap gap-3 text-xs text-text-secondary">
          <span className="rounded-full bg-white/70 px-3 py-1">Рейтинг {performance.rating.overall.toFixed(1)}</span>
          <span className="rounded-full bg-white/70 px-3 py-1">Голосов {performance.rating.votes}</span>
        </div>
        <a
          href={performance.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
        >
          Слушать исполнение
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
