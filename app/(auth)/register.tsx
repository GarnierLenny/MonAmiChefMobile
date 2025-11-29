import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/src/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '@/src/lib/validations/auth';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await register(data.email, data.password);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <View className="flex-1 bg-white justify-center px-6">
        <View className="items-center">
          <View className="bg-green-100 rounded-full p-4 mb-4">
            <Text className="text-4xl">✓</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Inscription réussie !
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            Vérifiez votre email pour confirmer votre compte.
          </Text>
          <Link href="/(auth)/login">
            <Text className="text-primary-600 font-semibold text-lg">
              Retour à la connexion
            </Text>
          </Link>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
      testID="register-screen"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="px-6"
      >
        {/* Logo / Header */}
        <View className="items-center mb-10">
          <Text className="text-4xl font-bold text-primary-600">MonAmiChef</Text>
          <Text className="text-gray-500 mt-2">Créer un compte</Text>
        </View>

        {/* Error Message */}
        {error && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <Text className="text-red-600 text-center">{error}</Text>
          </View>
        )}

        {/* Register Form */}
        <View className="space-y-4">
          {/* Email Field */}
          <View>
            <Text className="text-gray-700 font-medium mb-2">Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  testID="email-input"
                  className={`border rounded-lg px-4 py-3 text-base ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="votre@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </Text>
            )}
          </View>

          {/* Password Field */}
          <View className="mt-4">
            <Text className="text-gray-700 font-medium mb-2">Mot de passe</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  testID="password-input"
                  className={`border rounded-lg px-4 py-3 text-base ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Minimum 8 caractères"
                  secureTextEntry
                  autoComplete="new-password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>

          {/* Confirm Password Field */}
          <View className="mt-4">
            <Text className="text-gray-700 font-medium mb-2">
              Confirmer le mot de passe
            </Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  testID="confirm-password-input"
                  className={`border rounded-lg px-4 py-3 text-base ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirmez votre mot de passe"
                  secureTextEntry
                  autoComplete="new-password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            testID="register-button"
            className={`mt-6 rounded-lg py-4 ${
              isSubmitting ? 'bg-primary-400' : 'bg-primary-600'
            }`}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg">
                S'inscrire
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View className="flex-row justify-center mt-8 mb-8">
          <Text className="text-gray-600">Déjà un compte ? </Text>
          <Link href="/(auth)/login" testID="login-link">
            <Text className="text-primary-600 font-semibold">Se connecter</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
