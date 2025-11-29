// User & Auth Types
export interface User {
  id: string;
  email: string;
  display_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: User;
}

// Recipe Types
export interface RecipeContent {
  title: string;
  ingredients: string[];
  instructions: string[];
  tips?: string[];
  servings?: number;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
}

export interface RecipeNutrition {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  rating?: 'A' | 'B' | 'C' | 'D';
}

export interface Recipe {
  id: string;
  title: string;
  content_json: RecipeContent;
  nutrition?: RecipeNutrition;
  tags: string[];
  created_at: string;
}

// Meal Plan Types
export type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type GenerationMethod = 'manual' | 'ai_generated' | 'ai_assisted';

export interface MealPlanItem {
  id: string;
  mealPlanId: string;
  day: number; // 0-6 (Sunday-Saturday)
  mealSlot: MealSlot;
  recipeId?: string;
  createdAt: string;
  recipe?: Recipe;
}

export interface AIPreferences {
  dietary_restrictions?: string[];
  cuisine_preferences?: string[];
  cooking_time_max?: string;
  budget_range?: 'low' | 'moderate' | 'high';
  servings?: number;
  avoid_ingredients?: string[];
}

export interface MealPlan {
  id: string;
  userId: string;
  weekStartDate: string;
  createdAt: string;
  updatedAt: string;
  title?: string;
  generationPrompt?: string;
  generationMethod?: GenerationMethod;
  aiPreferences?: AIPreferences;
  items?: MealPlanItem[];
}

// Grocery List Types
export interface AggregatedIngredient {
  name: string;
  quantity: string;
  recipeIds: string[];
  recipes: string[];
}

export interface CategoryIngredients {
  category: string;
  emoji: string;
  items: AggregatedIngredient[];
}

export interface CustomGroceryItem {
  id: string;
  name: string;
  quantity?: string;
  category?: string;
  checked: boolean;
  createdAt: string;
}

export interface GroceryMeal {
  id: string;
  listId: string;
  mealPlanItemId: string;
  day: number;
  mealSlot: MealSlot;
  addedAt: string;
}

export interface GroceryList {
  id: string;
  userId: string;
  meals: GroceryMeal[];
  customItems: CustomGroceryItem[];
  aggregatedIngredients: CategoryIngredients[];
  createdAt: string;
  updatedAt: string;
}

// Chat Types
export interface Preferences {
  mealType?: string[];
  mealOccasion?: string[];
  cookingEquipment?: string[];
  cookingTime?: string[];
  skillLevel?: string[];
  nutrition?: string[];
  cuisine?: string[];
  spiceLevel?: string[];
  meat?: string[];
  vegetables?: string[];
  servings?: number | null;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  messages?: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
  conversationId: string | null;
}

// Health Tracking Types
export interface HealthMetric {
  id: string;
  profile_id: string;
  weight?: number;
  body_fat?: number;
  recorded_at: string;
  created_at: string;
}

export interface UserGoals {
  id: string;
  profile_id: string;
  target_weight?: number;
  target_body_fat?: number;
  daily_protein_goal?: number;
  daily_carbs_goal?: number;
  daily_fat_goal?: number;
  daily_calories_goal?: number;
  created_at: string;
  updated_at: string;
}

export interface MacroProgress {
  current: number;
  goal?: number;
}

export interface DashboardData {
  currentStats: {
    weight?: number;
    bodyFat?: number;
    weightChange?: number;
    bodyFatChange?: number;
  };
  todayMacros: {
    protein: MacroProgress;
    carbs: MacroProgress;
    fat: MacroProgress;
    calories: MacroProgress;
  };
  chartData: {
    weightProgress: Array<{ date: string; weight: number }>;
    bodyFatProgress: Array<{ date: string; bodyFat: number }>;
    caloriesWeek: Array<{ day: string; calories: number }>;
  };
  goals?: UserGoals;
}

// API Error Types
export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  path?: string;
  details?: unknown;
}
