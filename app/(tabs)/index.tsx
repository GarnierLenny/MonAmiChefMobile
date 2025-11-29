import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useMealPlans } from '@/src/hooks/useMealPlans';
import { useAuth } from '@/src/hooks/useAuth';
import { Calendar, ShoppingCart, UtensilsCrossed } from '@tamagui/lucide-icons';
import type { MealPlan } from '@/src/types';

function MealPlanCard({ mealPlan }: { mealPlan: MealPlan }) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100"
      onPress={() => router.push(`/meal-plan/${mealPlan.id}`)}
    >
      <Text className="text-lg font-semibold text-gray-800">
        {mealPlan.title || 'Meal Plan'}
      </Text>
      <Text className="text-gray-500 mt-1">
        Semaine du {formatDate(mealPlan.weekStartDate)}
      </Text>
      <View className="flex-row mt-3">
        <View className="bg-primary-100 px-3 py-1 rounded-full">
          <Text className="text-primary-700 text-sm">
            {mealPlan.items?.length || 0} repas
          </Text>
        </View>
        {mealPlan.generationMethod === 'ai_generated' && (
          <View className="bg-secondary-100 px-3 py-1 rounded-full ml-2">
            <Text className="text-secondary-700 text-sm">IA</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { data: mealPlans, isLoading, isError, error, refetch } = useMealPlans();

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-primary-600 pt-14 pb-6 px-6">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-lg">Bonjour,</Text>
            <Text className="text-white text-2xl font-bold">
              {user?.email?.split('@')[0] || 'Chef'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={logout}
            className="bg-white/20 px-4 py-2 rounded-full"
          >
            <Text className="text-white">Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {/* Quick Actions */}
        <View className="flex-row mb-6">
          <TouchableOpacity className="flex-1 bg-white rounded-xl p-4 mr-2 shadow-sm border border-gray-100">
            <Calendar size={28} color="#ea580c" style={{ marginBottom: 8 }} />
            <Text className="font-semibold text-gray-800">Nouveau Plan</Text>
            <Text className="text-gray-500 text-sm">Créer un menu</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-white rounded-xl p-4 ml-2 shadow-sm border border-gray-100">
            <ShoppingCart size={28} color="#ea580c" style={{ marginBottom: 8 }} />
            <Text className="font-semibold text-gray-800">Liste Courses</Text>
            <Text className="text-gray-500 text-sm">Voir ma liste</Text>
          </TouchableOpacity>
        </View>

        {/* Meal Plans Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Mes Plans Repas
          </Text>

          {isLoading && (
            <View className="bg-white rounded-xl p-8 items-center">
              <Text className="text-gray-500">Chargement...</Text>
            </View>
          )}

          {isError && (
            <View className="bg-red-50 rounded-xl p-4">
              <Text className="text-red-600 text-center">
                Erreur: {error instanceof Error ? error.message : 'Erreur inconnue'}
              </Text>
              <TouchableOpacity
                onPress={() => refetch()}
                className="mt-2 bg-red-100 py-2 rounded-lg"
              >
                <Text className="text-red-600 text-center">Réessayer</Text>
              </TouchableOpacity>
            </View>
          )}

          {!isLoading && !isError && mealPlans?.length === 0 && (
            <View className="bg-white rounded-xl p-8 items-center">
              <UtensilsCrossed size={40} color="#9ca3af" style={{ marginBottom: 16 }} />
              <Text className="text-gray-600 text-center">
                Aucun plan repas pour le moment
              </Text>
              <TouchableOpacity className="mt-4 bg-primary-600 px-6 py-3 rounded-full">
                <Text className="text-white font-semibold">
                  Créer mon premier plan
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {!isLoading &&
            !isError &&
            mealPlans?.map((mealPlan) => (
              <MealPlanCard key={mealPlan.id} mealPlan={mealPlan} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
