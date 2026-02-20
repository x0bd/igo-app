export interface NutritionAnalysis {
  meal_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  health_score: number;
  igo_tip?: string;
  ingredients?: string[];
}

export interface MacroSummary {
  current: number;
  target: number;
  percentage: number;
}

export interface DailyNutrition {
  date: string;
  totalCalories: number;
  targetCalories: number;
  protein: MacroSummary;
  carbs: MacroSummary;
  fat: MacroSummary;
  healthScore: number;
}
