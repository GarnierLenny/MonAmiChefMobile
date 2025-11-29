import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recipeApi } from '@/src/lib/api';
import type { GenerateMealRecipeRequest } from '@/src/lib/api';

export const recipeKeys = {
  all: ['recipes'] as const,
  saved: () => [...recipeKeys.all, 'saved'] as const,
  details: () => [...recipeKeys.all, 'detail'] as const,
  detail: (id: string) => [...recipeKeys.details(), id] as const,
};

export function useRecipe(id: string) {
  return useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => recipeApi.getRecipe(id),
    enabled: !!id,
  });
}

export function useSavedRecipes() {
  return useQuery({
    queryKey: recipeKeys.saved(),
    queryFn: () => recipeApi.getSavedRecipes(),
  });
}

export function useSaveRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: string) => recipeApi.saveRecipe(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.saved() });
    },
  });
}

export function useUnsaveRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: string) => recipeApi.unsaveRecipe(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.saved() });
    },
  });
}

export function useGenerateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GenerateMealRecipeRequest) =>
      recipeApi.generateMealRecipe(data),
    onSuccess: (recipe) => {
      queryClient.setQueryData(recipeKeys.detail(recipe.id), recipe);
    },
  });
}
