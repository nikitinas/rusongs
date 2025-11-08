"use client";

import { useMemo, useState } from "react";

type Tone = "sharp" | "flat";

const NOTES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const ENHARMONIC: Record<string, string> = {
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#"
};

function normalize(note: string) {
  return ENHARMONIC[note] ?? note;
}

function transposeToken(token: string, steps: number, tone: Tone) {
  const match = token.match(/^([A-G][b#]?)(.*)$/);
  if (!match) return token;
  const [, root, suffix] = match;
  const normalized = normalize(root);
  const index = NOTES_SHARP.indexOf(normalized);
  if (index === -1) return token;
  const newIndex = (index + steps + NOTES_SHARP.length) % NOTES_SHARP.length;
  const newRootSharp = NOTES_SHARP[newIndex];

  if (tone === "flat") {
    const sharpToFlat: Record<string, string> = {
      "C#": "Db",
      "D#": "Eb",
      "F#": "Gb",
      "G#": "Ab",
      "A#": "Bb"
    };
    if (sharpToFlat[newRootSharp]) {
      return `${sharpToFlat[newRootSharp]}${suffix}`;
    }
  }

  return `${newRootSharp}${suffix}`;
}

function transposeSequence(sequence: string, steps: number, tone: Tone) {
  return sequence
    .split(/(\s+|\||\/)/)
    .map((token) => {
      if (token.trim() === "" || token === "|" || token === "/") {
        return token;
      }
      return transposeToken(token, steps, tone);
    })
    .join("");
}

interface ChordTransposerProps {
  chords: string;
}

export function ChordTransposer({ chords }: ChordTransposerProps) {
  const [steps, setSteps] = useState(0);
  const [tone, setTone] = useState<Tone>("sharp");

  const transposed = useMemo(() => transposeSequence(chords, steps, tone), [chords, steps, tone]);

  const stepOptions = Array.from({ length: 12 }, (_, index) => index - 5); // -5 .. +6

  return (
    <div className="space-y-4 rounded-2xl border border-primary/20 bg-white/80 p-5">
      <div>
        <h3 className="font-display text-lg text-text-primary">Транспонирование аккордов</h3>
        <p className="text-sm text-text-secondary">
          Сдвиньте аккорды в удобную тональность для исполнения.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {stepOptions.map((option) => (
          <button
            key={option}
            type="button"
            className={`rounded-full px-3 py-1 text-sm transition ${
              option === steps
                ? "bg-primary text-white"
                : "border border-primary/20 text-primary hover:border-primary/40 hover:bg-primary/5"
            }`}
            onClick={() => setSteps(option)}
          >
            {option > 0 ? `+${option}` : option}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 text-sm text-text-secondary">
        <span>Нотация:</span>
        <button
          type="button"
          onClick={() => setTone("sharp")}
          className={`rounded-full px-3 py-1 ${tone === "sharp" ? "bg-accent text-white" : "border border-accent/30"}`}
        >
          #
        </button>
        <button
          type="button"
          onClick={() => setTone("flat")}
          className={`rounded-full px-3 py-1 ${tone === "flat" ? "bg-accent text-white" : "border border-accent/30"}`}
        >
          b
        </button>
      </div>
      <pre className="whitespace-pre-wrap rounded-2xl bg-primary/5 p-4 font-mono text-sm leading-relaxed text-text-primary">
        {transposed}
      </pre>
    </div>
  );
}
