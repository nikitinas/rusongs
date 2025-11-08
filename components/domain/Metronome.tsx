"use client";

import { useEffect, useRef, useState } from "react";

interface MetronomeProps {
  tempo: number;
}

export function Metronome({ tempo }: MetronomeProps) {
  const [isActive, setIsActive] = useState(false);
  const [bpm, setBpm] = useState(tempo);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setBpm(tempo);
  }, [tempo]);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const playTick = () => {
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "square";
      oscillator.frequency.value = 880;
      gain.gain.value = 0.2;
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.1);
    };

    playTick();
    intervalRef.current = setInterval(playTick, (60_000 / bpm) | 0);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, bpm]);

  return (
    <div className="space-y-4 rounded-2xl border border-primary/20 bg-white/80 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-text-primary">Метроном</h3>
          <p className="text-sm text-text-secondary">Подберите темп исполнения</p>
        </div>
        <div className="text-2xl font-semibold text-primary">{bpm} BPM</div>
      </div>
      <input
        type="range"
        min={40}
        max={200}
        value={bpm}
        onChange={(event) => setBpm(Number(event.target.value))}
        className="w-full"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setIsActive(true)}
          className="flex-1 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
        >
          Старт
        </button>
        <button
          type="button"
          onClick={() => setIsActive(false)}
          className="flex-1 rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-primary transition hover:border-primary/40 hover:bg-primary/5"
        >
          Стоп
        </button>
      </div>
    </div>
  );
}
