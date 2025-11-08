"use client";

import { create } from "zustand";
import type { Performance } from "@/lib/data/types";

interface CompareState {
  performances: Performance[];
  togglePerformance: (performance: Performance) => void;
  removePerformance: (performanceId: string) => void;
  clear: () => void;
}

export const useCompareTray = create<CompareState>((set) => ({
  performances: [],
  togglePerformance: (performance) =>
    set((state) => {
      const exists = state.performances.some((item) => item.id === performance.id);
      if (exists) {
        return {
          performances: state.performances.filter((item) => item.id !== performance.id)
        };
      }
      if (state.performances.length >= 4) {
        const [, ...rest] = state.performances;
        return { performances: [...rest, performance] };
      }

      return { performances: [...state.performances, performance] };
    }),
  removePerformance: (performanceId) =>
    set((state) => ({
      performances: state.performances.filter((performance) => performance.id !== performanceId)
    })),
  clear: () => set({ performances: [] })
}));
