import { NutritionAnalysis, ScanHistoryItem, TodayFoodLogItem } from '../types/nutrition';

// ─── Scan Results (rotated by mock service) ───────────────────────────────────

export const MOCK_SCAN_RESULTS: NutritionAnalysis[] = [
  {
    meal_name: 'Grilled Chicken Salad',
    calories: 480,
    protein: 42,
    carbs: 28,
    fat: 18,
    sat_fat: 3.8,
    health_score: 87,
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&fit=crop',
    ingredients: [
      'Grilled Chicken',
      'Romaine Lettuce',
      'Cherry Tomatoes',
      'Cucumber',
      'Feta Cheese',
      'Olive Oil',
      'Lemon',
      'Black Pepper',
    ],
    fiber: 6.2,
    sugar: 5.4,
    sodium: 380,
    glycemic_index: 'Low',
    meal_type: 'Lunch',
    ai_confidence: 94,
    verdict: 'Excellent',
    ai_insights: [
      "You're 40g short of today's protein goal — this meal closes 28% of the gap.",
      'Low glycemic index: blood sugar stays stable for the next 3–4 hours.',
      "Feta adds calcium but watch sodium — you're now at 62% of your daily limit.",
    ],
    igo_tip:
      'Great choice! This meal is rich in lean protein which supports muscle recovery. Pair it with a glass of water to stay on track with your Cimas iGo hydration goal.',
    scanned_at: '12:34 PM',
  },
  {
    meal_name: 'Teriyaki Salmon Bowl',
    calories: 620,
    protein: 48,
    carbs: 72,
    fat: 16,
    sat_fat: 3.2,
    health_score: 91,
    image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&fit=crop',
    ingredients: [
      'Atlantic Salmon',
      'Brown Rice',
      'Edamame',
      'Avocado',
      'Sesame Seeds',
      'Teriyaki Sauce',
      'Spring Onion',
      'Nori',
    ],
    fiber: 8.1,
    sugar: 12.3,
    sodium: 520,
    glycemic_index: 'Medium',
    meal_type: 'Dinner',
    ai_confidence: 97,
    verdict: 'Excellent',
    ai_insights: [
      'Omega-3 powerhouse — salmon provides 2.2g EPA/DHA, supporting heart health.',
      'Brown rice gives sustained energy: ideal post-workout carb source.',
      'Slightly high sodium from teriyaki sauce — drink 400ml water after this meal.',
    ],
    igo_tip:
      "Outstanding nutritional profile! The omega-3 fatty acids in salmon align perfectly with Cimas iGo's heart health goals. This is a benchmark meal for your log.",
    scanned_at: '6:58 PM',
  },
  {
    meal_name: 'Beef & Cheese Burger',
    calories: 780,
    protein: 38,
    carbs: 68,
    fat: 42,
    sat_fat: 18.4,
    health_score: 54,
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&fit=crop',
    ingredients: [
      'Beef Patty 200g',
      'Brioche Bun',
      'Cheddar Cheese',
      'Lettuce',
      'Tomato',
      'Onion',
      'Special Sauce',
      'Pickles',
    ],
    fiber: 2.4,
    sugar: 14.6,
    sodium: 980,
    glycemic_index: 'High',
    meal_type: 'Lunch',
    ai_confidence: 91,
    verdict: 'Fair',
    ai_insights: [
      'High saturated fat (18g) — balance with a low-fat dinner to stay within weekly limits.',
      'Sodium is at 98% of daily intake limit — avoid salty snacks for the rest of today.',
      'Good protein at 38g, but add a side salad to boost fiber and vitamins.',
    ],
    igo_tip:
      'This is a high-calorie meal — balance it with a lighter dinner and try to hit 8,000+ steps today to stay in your Cimas iGo calorie range.',
    scanned_at: '1:15 PM',
  },
  {
    meal_name: 'Acai Smoothie Bowl',
    calories: 340,
    protein: 8,
    carbs: 62,
    fat: 10,
    sat_fat: 5.1,
    health_score: 72,
    image_url: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=800&fit=crop',
    ingredients: [
      'Acai Puree',
      'Frozen Banana',
      'Blueberries',
      'Granola',
      'Coconut Flakes',
      'Honey',
      'Chia Seeds',
      'Almond Milk',
    ],
    fiber: 11.4,
    sugar: 38.2,
    sodium: 95,
    glycemic_index: 'Medium',
    meal_type: 'Breakfast',
    ai_confidence: 89,
    verdict: 'Good',
    ai_insights: [
      'Very high fiber (11.4g) — excellent for gut health and will keep you full until lunch.',
      'Sugar at 38g is elevated — mainly natural fructose, but monitor if pre-diabetic.',
      'Protein is low at 8g. Add Greek yogurt or 2 eggs to hit your morning protein goal.',
    ],
    igo_tip:
      'Great antioxidant boost from acai and blueberries! Consider adding a protein source alongside to ensure balanced macros for your morning.',
    scanned_at: '8:20 AM',
  },
];

// First result is the default (backward compat)
export const MOCK_SCAN_RESULT = MOCK_SCAN_RESULTS[0];

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

// ─── Scan History (previous sessions) ────────────────────────────────────────

export const SCAN_HISTORY: ScanHistoryItem[] = [
  {
    id: '1',
    meal_name: 'Teriyaki Salmon Bowl',
    calories: 620,
    health_score: 91,
    image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400&fit=crop',
    scanned_at: 'Yesterday 7 PM',
    meal_type: 'Dinner',
  },
  {
    id: '2',
    meal_name: 'Acai Smoothie Bowl',
    calories: 340,
    health_score: 72,
    image_url: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=400&fit=crop',
    scanned_at: 'Yesterday 8 AM',
    meal_type: 'Breakfast',
  },
  {
    id: '3',
    meal_name: 'Quinoa Power Salad',
    calories: 420,
    health_score: 82,
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&fit=crop',
    scanned_at: 'Mon 12 PM',
    meal_type: 'Lunch',
  },
  {
    id: '4',
    meal_name: 'Beef & Cheese Burger',
    calories: 780,
    health_score: 54,
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&fit=crop',
    scanned_at: 'Mon 1 PM',
    meal_type: 'Lunch',
  },
];

// ─── Today's Food Log (Dashboard section) ────────────────────────────────────

export const TODAY_FOOD_LOG: TodayFoodLogItem[] = [
  {
    id: '1',
    meal_name: 'Acai Smoothie Bowl',
    calories: 340,
    health_score: 72,
    image_url: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=400&fit=crop',
    time: '8:20 AM',
    meal_type: 'Breakfast',
  },
  {
    id: '2',
    meal_name: 'Grilled Chicken Salad',
    calories: 480,
    health_score: 87,
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&fit=crop',
    time: '12:34 PM',
    meal_type: 'Lunch',
  },
];
