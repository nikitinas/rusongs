import type { Song } from "@/lib/data/types";
import { ChordTransposer } from "./ChordTransposer";
import { ChordDiagrams } from "./ChordDiagrams";
import { Metronome } from "./Metronome";
import { PrintLayout } from "./PrintLayout";

interface SongToolsProps {
  song: Song;
}

export function SongTools({ song }: SongToolsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChordTransposer chords={song.chords} />
      <Metronome tempo={song.defaultTempo} />
      <ChordDiagrams chords={song.chords} />
      <PrintLayout lyrics={song.lyrics} chords={song.chords} />
    </div>
  );
}
