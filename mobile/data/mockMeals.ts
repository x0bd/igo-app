// ─── Dashboard Suggested Meals ────────────────────────────────────────────────

export const DASHBOARD_MEALS = [
  {
    id: '1',
    title: 'Teriyaki Salmon Bowl',
    kcal: 540,
    tags: ['High Protein', 'Omega 3'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400&fit=crop',
  },
  {
    id: '2',
    title: 'Quinoa Power Salad',
    kcal: 420,
    tags: ['Vegan', 'Fiber'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&fit=crop',
  },
  {
    id: '3',
    title: 'Chicken Miso Stew',
    kcal: 480,
    tags: ['Low Carb', 'Warm'],
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=400&fit=crop',
  },
];

// ─── Scan Follow-up Suggestions ───────────────────────────────────────────────

export const SCAN_SUGGESTED_MEALS = [
  {
    id: '1',
    title: 'Avocado Rice Bowl',
    kcal: 520,
    tag: 'Balanced',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&fit=crop',
  },
  {
    id: '2',
    title: 'Grilled Salmon',
    kcal: 460,
    tag: 'High Protein',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400&fit=crop',
  },
  {
    id: '3',
    title: 'Lentil Power Soup',
    kcal: 310,
    tag: 'Low Cal',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=400&fit=crop',
  },
];

export type DashboardMeal = (typeof DASHBOARD_MEALS)[number];
export type ScanSuggestedMeal = (typeof SCAN_SUGGESTED_MEALS)[number];
