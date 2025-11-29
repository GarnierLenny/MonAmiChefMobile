export { recipeApi } from './recipes';
export { mealPlanApi } from './mealPlans';
export { groceryListApi } from './groceryList';
export { healthApi } from './health';
export { chatApi } from './chat';

// Re-export types
export type { GenerateMealRecipeRequest } from './recipes';
export type {
  CreateMealPlanRequest,
  UpdateMealPlanRequest,
  AddMealPlanItemRequest,
  UpdateMealPlanItemRequest,
} from './mealPlans';
export type {
  AddCustomItemRequest,
  UpdateCustomItemRequest,
} from './groceryList';
export type {
  LogMetricRequest,
  UpdateGoalsRequest,
  GetMetricsParams,
} from './health';
export type { SendMessageRequest, CreateConversationRequest } from './chat';
