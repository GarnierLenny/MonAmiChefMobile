import { api } from '../apiClient';
import type { GroceryList, CustomGroceryItem } from '@/src/types';

export interface AddCustomItemRequest {
  name: string;
  quantity?: string;
  category?: string;
}

export interface UpdateCustomItemRequest {
  name?: string;
  quantity?: string;
  category?: string;
  checked?: boolean;
}

export const groceryListApi = {
  getGroceryList: () => api.get<GroceryList>('/grocery-list'),

  addMeals: (mealPlanItemIds: string[]) =>
    api.post<GroceryList>('/grocery-list/meals', { mealPlanItemIds }),

  removeMeal: (mealId: string) =>
    api.delete<GroceryList>(`/grocery-list/meals/${mealId}`),

  addCustomItem: (data: AddCustomItemRequest) =>
    api.post<CustomGroceryItem>('/grocery-list/items', data),

  updateCustomItem: (itemId: string, data: UpdateCustomItemRequest) =>
    api.patch<CustomGroceryItem>(`/grocery-list/items/${itemId}`, data),

  deleteCustomItem: (itemId: string) =>
    api.delete<{ success: boolean }>(`/grocery-list/items/${itemId}`),

  toggleItemChecked: (itemId: string) =>
    api.delete<{ checked: boolean }>(`/grocery-list/items/${itemId}/check`),
};
