import { api } from '../apiClient';
import type { MealPlan, MealPlanItem, AIPreferences, MealSlot } from '@/src/types';

export interface CreateMealPlanRequest {
  weekStartDate: string;
  title?: string;
  generationPrompt?: string;
  aiPreferences?: AIPreferences;
}

export interface UpdateMealPlanRequest {
  title?: string;
  generationPrompt?: string;
  aiPreferences?: AIPreferences;
}

export interface AddMealPlanItemRequest {
  day: number;
  mealSlot: MealSlot;
  recipeId?: string;
}

export interface UpdateMealPlanItemRequest {
  day?: number;
  mealSlot?: MealSlot;
  recipeId?: string;
}

export const mealPlanApi = {
  getMealPlans: () => api.get<MealPlan[]>('/meal-plans'),

  getMealPlan: (id: string) => api.get<MealPlan>(`/meal-plans/${id}`),

  createMealPlan: (data: CreateMealPlanRequest) =>
    api.post<MealPlan>('/meal-plans', data),

  updateMealPlan: (id: string, data: UpdateMealPlanRequest) =>
    api.put<MealPlan>(`/meal-plans/${id}`, data),

  deleteMealPlan: (id: string) =>
    api.delete<{ success: boolean }>(`/meal-plans/${id}`),

  addItem: (mealPlanId: string, data: AddMealPlanItemRequest) =>
    api.post<MealPlanItem>(`/meal-plans/${mealPlanId}/items`, data),

  updateItem: (
    mealPlanId: string,
    itemId: string,
    data: UpdateMealPlanItemRequest
  ) => api.put<MealPlanItem>(`/meal-plans/${mealPlanId}/items/${itemId}`, data),

  removeItem: (mealPlanId: string, itemId: string) =>
    api.delete<{ success: boolean }>(`/meal-plans/${mealPlanId}/items/${itemId}`),
};
