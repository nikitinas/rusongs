import type { Performance } from "@/lib/data/types";
import { formatDuration, formatTempo, formatYear } from "@/lib/utils/format";

interface PerformanceComparatorProps {
  performances: Performance[];
}

export function PerformanceComparator({ performances }: PerformanceComparatorProps) {
  if (!performances.length) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-white/80 p-5 text-sm text-text-secondary">
        Добавьте исполнения в сравнение, чтобы увидеть детальную таблицу характеристик.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-primary/20">
      <table className="min-w-full divide-y divide-primary/10 text-sm">
        <thead className="bg-primary/10 text-left uppercase tracking-wide text-text-secondary">
          <tr>
            <th className="px-4 py-3 font-medium text-text-primary">Исполнение</th>
            <th className="px-4 py-3 font-medium text-text-primary">Год</th>
            <th className="px-4 py-3 font-medium text-text-primary">Рейтинг</th>
            <th className="px-4 py-3 font-medium text-text-primary">Длительность</th>
            <th className="px-4 py-3 font-medium text-text-primary">Темп</th>
            <th className="px-4 py-3 font-medium text-text-primary">Особенности</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary/10 bg-white">
          {performances.map((performance) => (
            <tr key={performance.id}>
              <td className="px-4 py-3">
                <div className="font-medium text-text-primary">{performance.title}</div>
                <div className="text-xs text-text-secondary">{performance.artists.join(", ")}</div>
              </td>
              <td className="px-4 py-3 text-text-secondary">{formatYear(performance.year)}</td>
              <td className="px-4 py-3 text-text-secondary">{performance.rating.overall.toFixed(1)}</td>
              <td className="px-4 py-3 text-text-secondary">{formatDuration(performance.duration)}</td>
              <td className="px-4 py-3 text-text-secondary">{formatTempo(performance.tempoBpm)}</td>
              <td className="px-4 py-3 text-text-secondary">
                {performance.highlights?.join(", ") ?? performance.arrangement ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
