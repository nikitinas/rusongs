interface LyricsWithChordsProps {
  lyrics: string;
  chords: string;
}

export function LyricsWithChords({ lyrics, chords }: LyricsWithChordsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-2xl border border-primary/20 bg-white/80 p-5">
        <h3 className="font-display text-lg text-text-primary">Аккорды</h3>
        <pre className="whitespace-pre-wrap font-mono text-sm text-text-primary">{chords}</pre>
      </div>
      <div className="space-y-4 rounded-2xl border border-primary/20 bg-white/80 p-5">
        <h3 className="font-display text-lg text-text-primary">Текст</h3>
        <pre className="whitespace-pre-wrap font-body text-base leading-relaxed text-text-primary">{lyrics}</pre>
      </div>
    </div>
  );
}
