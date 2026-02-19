import axios from 'axios'
import { NutritionAnalysis, MealServiceResponse } from '../types/nutrition'

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000'

export class MealService {
  static async analyzeMeal(imageUri: string): Promise<MealServiceResponse> {
    try {
      // Convert image URI to FormData
      const formData = new FormData()
      
      // Extract filename from URI
      const filename = imageUri.split('/').pop() || 'meal.jpg'
      const match = /\.(\w+)$/.exec(filename)
      const type = match ? `image/${match[1]}` : 'image/jpeg'

      formData.append('file', {
        uri: imageUri,
        name: filename,
        type,
      } as any)

      const response = await axios.post<NutritionAnalysis>(
        `${API_URL}/analyze`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000, // 30 second timeout
        }
      )

      return {
        success: true,
        data: response.data,
      }
    } catch (error: any) {
      console.error('Meal analysis error:', error)
      return {
        success: false,
        error: error.response?.data?.detail || error.message || 'Failed to analyze meal',
      }
    }
  }
}


