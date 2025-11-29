import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mealPlanApi } from '@/src/lib/api';
import type {
  CreateMealPlanRequest,
  UpdateMealPlanRequest,
  AddMealPlanItemRequest,
  UpdateMealPlanItemRequest,
} from '@/src/lib/api';

export const mealPlanKeys = {
  all: ['mealPlans'] as const,
  lists: () => [...mealPlanKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) =>
    [...mealPlanKeys.lists(), filters] as const,
  details: () => [...mealPlanKeys.all, 'detail'] as const,
  detail: (id: string) => [...mealPlanKeys.details(), id] as const,
};

export function useMealPlans() {
  return useQuery({
    queryKey: mealPlanKeys.lists(),
    queryFn: () => mealPlanApi.getMealPlans(),
  });
}

export function useMealPlan(id: string) {
  return useQuery({
    queryKey: mealPlanKeys.detail(id),
    queryFn: () => mealPlanApi.getMealPlan(id),
    enabled: !!id,
  });
}

export function useCreateMealPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMealPlanRequest) => mealPlanApi.createMealPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mealPlanKeys.lists() });
    },
  });
}

export function useUpdateMealPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMealPlanRequest }) =>
      mealPlanApi.updateMealPlan(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: mealPlanKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: mealPlanKeys.lists() });
    },
  });
}

export function useDeleteMealPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mealPlanApi.deleteMealPlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mealPlanKeys.lists() });
    },
  });
}

export function useAddMealPlanItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      mealPlanId,
      data,
    }: {
      mealPlanId: string;
      data: AddMealPlanItemRequest;
    }) => mealPlanApi.addItem(mealPlanId, data),
    onSuccess: (_, { mealPlanId }) => {
      queryClient.invalidateQueries({ queryKey: mealPlanKeys.detail(mealPlanId) });
    },
  });
}

export function useUpdateMealPlanItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      mealPlanId,
      itemId,
      data,
    }: {
      mealPlanId: string;
      itemId: string;
      data: UpdateMealPlanItemRequest;
    }) => mealPlanApi.updateItem(mealPlanId, itemId, data),
    onSuccess: (_, { mealPlanId }) => {
      queryClient.invalidateQueries({ queryKey: mealPlanKeys.detail(mealPlanId) });
    },
  });
}

export function useRemoveMealPlanItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      mealPlanId,
      itemId,
    }: {
      mealPlanId: string;
      itemId: string;
    }) => mealPlanApi.removeItem(mealPlanId, itemId),
    onSuccess: (_, { mealPlanId }) => {
      queryClient.invalidateQueries({ queryKey: mealPlanKeys.detail(mealPlanId) });
    },
  });
}
