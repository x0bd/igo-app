import { NutritionAnalysis } from '../types/nutrition';

// ─── Scan Result ──────────────────────────────────────────────────────────────

export const MOCK_SCAN_RESULT: NutritionAnalysis = {
  meal_name: 'Grilled Chicken Salad',
  calories: 480,
  protein: 42,
  carbs: 28,
  fat: 18,
  health_score: 87,
  igo_tip:
    'Great choice! This meal is rich in lean protein which supports muscle recovery. Pair it with a glass of water to stay on track with your Cimas iGo hydration goal.',
};

// ─── Weekly Summary ───────────────────────────────────────────────────────────

export const WEEKLY_SUMMARY = {
  avgKcal: 2180,
  bestScore: 91,
  consistency: 'A',
};

// ─── At-a-Glance Stats ────────────────────────────────────────────────────────

export const AT_A_GLANCE = [
  {
    id: 'calories',
    label: 'Avg Calories',
    value: '2,180',
    unit: 'kcal',
    trend: +6.2,
    icon: 'flame',
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
  },
  {
    id: 'protein',
    label: 'Avg Protein',
    value: '118',
    unit: 'g',
    trend: +12.1,
    icon: 'barbell',
    iconBg: '#F3E8FF',
    iconColor: '#9333EA',
  },
  {
    id: 'carbs',
    label: 'Avg Carbs',
    value: '241',
    unit: 'g',
    trend: -3.4,
    icon: 'leaf',
    iconBg: '#FFF7ED',
    iconColor: '#EA580C',
  },
  {
    id: 'health_score',
    label: 'Avg Health Score',
    value: '78',
    unit: '/100',
    trend: +5.0,
    icon: 'heart',
    iconBg: '#EEF3FF',
    iconColor: '#003399',
  },
];

// ─── Weekly AI Insights ───────────────────────────────────────────────────────

export const WEEKLY_INSIGHTS = [
  {
    id: '1',
    dot: '#003399',
    title: 'Protein Streak',
    body: "You've hit your protein goal 5 days in a row. Keep it up for muscle recovery!",
  },
  {
    id: '2',
    dot: '#FFD600',
    title: 'Calorie Dip',
    body: 'Tuesday was 400 kcal below target. Consider a larger lunch to compensate.',
  },
  {
    id: '3',
    dot: '#AF52DE',
    title: 'Top Meal',
    body: 'Your grilled salmon bowl scored 91 — highest of the week. Repeat it!',
  },
];

// ─── Daily Bar Chart Data (6 time slots) ─────────────────────────────────────

export const DAILY_BARS = [
  { label: '6a', kcal: 320, color: '#CBD5E1' },
  { label: '9a', kcal: 480, color: '#CBD5E1' },
  { label: '12p', kcal: 740, color: '#AF52DE' },
  { label: '3p', kcal: 290, color: '#CBD5E1' },
  { label: '6p', kcal: 610, color: '#FF9500' },
  { label: '9p', kcal: 190, color: '#CBD5E1' },
];

// ─── Macro Targets ────────────────────────────────────────────────────────────

export const MACROS = [
  { label: 'Protein', current: 118, target: 150, color: '#AF52DE', trackBg: '#F3E8FF' },
  { label: 'Carbs', current: 241, target: 280, color: '#FF9500', trackBg: '#FFF7ED' },
  { label: 'Fat', current: 62, target: 80, color: '#34C759', trackBg: '#EDFAF1' },
];

export const HEALTH_SCORE = 78;
