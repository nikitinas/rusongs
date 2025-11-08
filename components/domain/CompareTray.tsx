"use client";

import { X } from "lucide-react";
import { useCompareTray } from "@/lib/hooks/useCompareTray";
import { PerformanceComparator } from "./PerformanceComparator";

export function CompareTray() {
  const { performances, clear, removePerformance } = useCompareTray();

  return (
    <aside className="space-y-4 rounded-2xl border border-primary/20 bg-white/80 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-text-primary">Сравнение исполнений</h3>
          <p className="text-sm text-text-secondary">Добавьте до 4 исполнений для детального анализа.</p>
        </div>
        {performances.length ? (
          <button
            type="button"
            onClick={clear}
            className="text-xs text-primary underline underline-offset-4"
          >
            Очистить
          </button>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {performances.map((performance) => (
          <button
            key={performance.id}
            onClick={() => removePerformance(performance.id)}
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
          >
            {performance.title}
            <X className="h-3 w-3" />
          </button>
        ))}
      </div>
      <PerformanceComparator performances={performances} />
    </aside>
  );
}
