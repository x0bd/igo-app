import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NutritionAnalysis } from '../types/nutrition';
import { MOCK_USER, MockUser } from '../data/mockUser';
import {
  WEEKLY_SUMMARY,
  AT_A_GLANCE,
  DAILY_BARS,
  MACROS,
  HEALTH_SCORE,
  WEEKLY_INSIGHTS,
} from '../data/mockNutrition';
import { DAILY_GOALS } from '../data/mockGoals';

// ─── Shape ────────────────────────────────────────────────────────────────────

interface AppState {
  // User
  user: MockUser;

  // Scan
  scanResult: NutritionAnalysis | null;
  setScanResult: (result: NutritionAnalysis | null) => void;

  // Weekly stats (read-only mock)
  weeklySummary: typeof WEEKLY_SUMMARY;
  atAGlance: typeof AT_A_GLANCE;
  dailyBars: typeof DAILY_BARS;
  macros: typeof MACROS;
  healthScore: number;
  weeklyInsights: typeof WEEKLY_INSIGHTS;

  // Goals
  dailyGoals: typeof DAILY_GOALS;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AppContext = createContext<AppState | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  const [scanResult, setScanResult] = useState<NutritionAnalysis | null>(null);

  const value: AppState = {
    user: MOCK_USER,
    scanResult,
    setScanResult,
    weeklySummary: WEEKLY_SUMMARY,
    atAGlance: AT_A_GLANCE,
    dailyBars: DAILY_BARS,
    macros: MACROS,
    healthScore: HEALTH_SCORE,
    weeklyInsights: WEEKLY_INSIGHTS,
    dailyGoals: DAILY_GOALS,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAppContext(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within <AppProvider>');
  return ctx;
}
