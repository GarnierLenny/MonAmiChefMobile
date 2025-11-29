import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { supabase, signInWithEmail, signUpWithEmail, signOut } from '@/src/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({
        user: session?.user ?? null,
        session,
        isLoading: false,
        isAuthenticated: !!session,
      });
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState({
        user: session?.user ?? null,
        session,
        isLoading: false,
        isAuthenticated: !!session,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await signInWithEmail(email, password);
      if (error) throw error;
      return data;
    },
    []
  );

  const register = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await signUpWithEmail(email, password);
      if (error) throw error;
      return data;
    },
    []
  );

  const logout = useCallback(async () => {
    const { error } = await signOut();
    if (error) throw error;
    router.replace('/(auth)/login');
  }, [router]);

  return {
    ...authState,
    login,
    register,
    logout,
  };
}
