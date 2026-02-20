import { NutritionAnalysis } from '../types/nutrition';
import { MOCK_SCAN_RESULT } from '../data/mockNutrition';

const SIMULATED_DELAY_MS = 2400;

/**
 * Simulates an AI meal analysis API call.
 * Returns mock NutritionAnalysis after a realistic delay.
 * Replace this with a real API call when the backend is ready.
 */
export async function analyzeMeal(_imageUri?: string): Promise<NutritionAnalysis> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_SCAN_RESULT);
    }, SIMULATED_DELAY_MS);
  });
}

/**
 * Simulates an error scenario — useful for testing error states.
 */
export async function analyzeMealWithError(_imageUri?: string): Promise<NutritionAnalysis> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Failed to analyse meal. Please try again.'));
    }, SIMULATED_DELAY_MS);
  });
}
