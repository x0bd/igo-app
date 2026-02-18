export interface NutritionAnalysis {
  meal_name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  health_score: number
  igo_tip: string
}

export interface MealServiceResponse {
  success: boolean
  data?: NutritionAnalysis
  error?: string
}

