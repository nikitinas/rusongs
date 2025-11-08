"use client";

interface ChordDiagramsProps {
  chords: string;
}

function extractUniqueChords(source: string) {
  const cleaned = source.replace(/\|/g, " ");
  const tokens = cleaned.split(/\s+/).map((token) => token.trim()).filter(Boolean);
  const unique = Array.from(new Set(tokens));
  return unique.slice(0, 12);
}

export function ChordDiagrams({ chords }: ChordDiagramsProps) {
  const unique = extractUniqueChords(chords);

  return (
    <div className="space-y-4 rounded-2xl border border-primary/20 bg-white/80 p-5">
      <div>
        <h3 className="font-display text-lg text-text-primary">Диаграммы аккордов</h3>
        <p className="text-sm text-text-secondary">Основные аккорды, встречающиеся в песне.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {unique.map((chord) => (
          <div key={chord} className="flex h-28 flex-col items-center justify-center rounded-xl bg-primary/5 text-center">
            <div className="text-2xl font-semibold text-primary">{chord}</div>
            <div className="mt-2 text-xs uppercase tracking-wide text-text-secondary">Гитарный лад</div>
          </div>
        ))}
      </div>
    </div>
  );
}
