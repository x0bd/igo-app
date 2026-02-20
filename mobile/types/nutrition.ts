export interface NutritionAnalysis {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  healthScore: number;
  ingredients?: string[];
  tips?: string[];
  mealName?: string;
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
