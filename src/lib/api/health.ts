import { api } from '../apiClient';
import type { HealthMetric, UserGoals, DashboardData } from '@/src/types';

export interface LogMetricRequest {
  weight?: number;
  body_fat?: number;
  recorded_at?: string;
}

export interface UpdateGoalsRequest {
  target_weight?: number;
  target_body_fat?: number;
  daily_protein_goal?: number;
  daily_carbs_goal?: number;
  daily_fat_goal?: number;
  daily_calories_goal?: number;
}

export interface GetMetricsParams {
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export const healthApi = {
  getMetrics: (params?: GetMetricsParams) => {
    const searchParams = new URLSearchParams();
    if (params?.startDate) searchParams.set('startDate', params.startDate);
    if (params?.endDate) searchParams.set('endDate', params.endDate);
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const query = searchParams.toString();
    return api.get<HealthMetric[]>(`/user-health/metrics${query ? `?${query}` : ''}`);
  },

  logMetric: (data: LogMetricRequest) =>
    api.post<HealthMetric>('/user-health/metrics', data),

  getGoals: () => api.get<UserGoals>('/user-health/goals'),

  updateGoals: (data: UpdateGoalsRequest) =>
    api.put<UserGoals>('/user-health/goals', data),

  getDashboard: () => api.get<DashboardData>('/user-health/dashboard'),
};
