import { NutritionAnalysis } from '../types/nutrition';
import { MOCK_SCAN_RESULTS } from '../data/mockNutrition';

const SIMULATED_DELAY_MS = 2400;

// Rotates through all mock scan results so each "scan" returns a different meal
let _callCount = 0;

/**
 * Simulates an AI meal analysis API call.
 * Rotates through MOCK_SCAN_RESULTS for variety during testing.
 * Replace with a real API call when the backend is ready.
 */
export async function analyzeMeal(_imageUri?: string): Promise<NutritionAnalysis> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = MOCK_SCAN_RESULTS[_callCount % MOCK_SCAN_RESULTS.length];
      _callCount++;
      resolve(result);
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
