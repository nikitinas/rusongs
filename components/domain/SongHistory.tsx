interface SongHistoryProps {
  historicalContext?: string;
}

export function SongHistory({ historicalContext }: SongHistoryProps) {
  if (!historicalContext) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-white/80 p-5 text-sm text-text-secondary">
        Историческая справка пока не добавлена. Поделитесь знаниями в комментариях или предложите правку.
      </div>
    );
  }

  return (
    <article className="prose max-w-none rounded-2xl border border-primary/20 bg-white/80 p-5 prose-headings:font-display prose-headings:text-primary prose-p:text-text-secondary">
      <h3>Исторический контекст</h3>
      <p>{historicalContext}</p>
    </article>
  );
}
