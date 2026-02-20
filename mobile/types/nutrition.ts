/**
 * Nutrition Analysis types for meal scanning and analysis
 */

export interface NutritionAnalysis {
  meal_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  health_score: number; // 1-100
  igo_tip: string;
}

export interface MacroNutrients {
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailyNutrition {
  date: string;
  total_calories: number;
  macros: MacroNutrients;
  meals: NutritionAnalysis[];
  average_health_score: number;
}

