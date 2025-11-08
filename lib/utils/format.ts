export function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

export function formatYear(year: number) {
  return new Intl.DateTimeFormat("ru-RU", { year: "numeric" }).format(new Date(year, 0, 1));
}

export function formatTempo(tempo?: number) {
  return tempo ? `${tempo} BPM` : "—";
}
