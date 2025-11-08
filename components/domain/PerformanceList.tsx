import type { Performance } from "@/lib/data/types";
import { PerformanceCard } from "./PerformanceCard";

interface PerformanceListProps {
  performances: Performance[];
}

export function PerformanceList({ performances }: PerformanceListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {performances.map((performance) => (
        <PerformanceCard key={performance.id} performance={performance} />
      ))}
    </div>
  );
}
