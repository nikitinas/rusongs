"use client";

import { useState } from "react";
import type { Song } from "@/lib/data/types";
import { PerformanceList } from "./PerformanceList";
import { CompareTray } from "./CompareTray";
import { LyricsWithChords } from "./LyricsWithChords";
import { SongTools } from "./SongTools";
import { SongHistory } from "./SongHistory";
import { CommentsSection } from "./CommentsSection";

const TABS = [
  { id: "performances", label: "Исполнения" },
  { id: "chords", label: "Текст и аккорды" },
  { id: "history", label: "История и обсуждение" }
] as const;

type TabId = (typeof TABS)[number]["id"];

interface SongTabsProps {
  song: Song;
}

export function SongTabs({ song }: SongTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("performances");

  return (
    <section className="mt-12 space-y-6">
      <div className="inline-flex rounded-full border border-primary/20 bg-white/80 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id ? "rounded-full bg-primary text-white" : "rounded-full text-primary hover:bg-primary/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "performances" ? (
        <div className="grid gap-6 lg:grid-cols-[3fr,2fr]">
          <PerformanceList performances={song.performances} />
          <CompareTray />
        </div>
      ) : null}

      {activeTab === "chords" ? (
        <div className="space-y-6">
          <LyricsWithChords lyrics={song.lyrics} chords={song.chords} />
          <SongTools song={song} />
        </div>
      ) : null}

      {activeTab === "history" ? (
        <div className="grid gap-6 lg:grid-cols-[2fr,3fr]">
          <SongHistory historicalContext={song.historicalContext} />
          <CommentsSection songId={song.id} />
        </div>
      ) : null}
    </section>
  );
}
