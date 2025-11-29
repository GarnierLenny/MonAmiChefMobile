import { api } from '../apiClient';
import type { Recipe } from '@/src/types';

export interface GenerateMealRecipeRequest {
  mealPlanItemId: string;
  preferences?: {
    dietary_restrictions?: string[];
    cuisine_preferences?: string[];
  };
}

export const recipeApi = {
  getRecipe: (id: string) => api.get<Recipe>(`/recipes/${id}`),

  getSavedRecipes: () => api.get<Recipe[]>('/recipes/saved'),

  saveRecipe: (recipeId: string) =>
    api.post<{ success: boolean }>(`/recipes/${recipeId}/save`),

  unsaveRecipe: (recipeId: string) =>
    api.delete<{ success: boolean }>(`/recipes/${recipeId}/save`),

  generateMealRecipe: (data: GenerateMealRecipeRequest) =>
    api.post<Recipe>('/chat/generate-meal-recipe', data),
};
