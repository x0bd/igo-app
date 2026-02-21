export interface NutritionAnalysis {
  meal_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  health_score: number;
  igo_tip?: string;
  // Extended AI analysis fields
  image_url?: string;
  ingredients?: string[];
  fiber?: number;
  sugar?: number;
  sodium?: number;
  sat_fat?: number;
  glycemic_index?: 'Low' | 'Medium' | 'High';
  meal_type?: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  ai_confidence?: number;
  verdict?: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  ai_insights?: string[];
  scanned_at?: string;
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

export interface ScanHistoryItem {
  id: string;
  meal_name: string;
  calories: number;
  health_score: number;
  image_url: string;
  scanned_at: string;
  meal_type: string;
}

export interface TodayFoodLogItem {
  id: string;
  meal_name: string;
  calories: number;
  health_score: number;
  image_url: string;
  time: string;
  meal_type: string;
}
