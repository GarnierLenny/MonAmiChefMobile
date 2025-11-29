import Constants from 'expo-constants';

interface Environment {
  apiUrl: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
}

const ENV: Record<string, Environment> = {
  development: {
    apiUrl: 'http://localhost:8888',
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  },
  production: {
    apiUrl: 'https://api.monamichef.com',
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  },
};

function getEnvVars(): Environment {
  const releaseChannel = Constants.expoConfig?.extra?.releaseChannel ?? 'development';

  if (releaseChannel.indexOf('prod') !== -1) {
    return ENV.production;
  }

  return ENV.development;
}

export const env = getEnvVars();
