# MonAmiChef Mobile

Application mobile React Native pour MonAmiChef - assistant culinaire avec IA.

## Stack Technique

- **Framework**: React Native via Expo SDK 54
- **Navigation**: Expo Router (file-based routing)
- **State Management**: TanStack Query (React Query)
- **Authentication**: Supabase Auth
- **Styling**: NativeWind (Tailwind CSS) + Tamagui
- **Forms**: react-hook-form + Zod
- **Tests**: Jest + React Native Testing Library + Detox

## Structure du Projet

```
MonAmiChefMobile/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Auth screens (login, register)
│   ├── (tabs)/            # Main app tabs
│   └── _layout.tsx        # Root layout
├── src/
│   ├── config/            # Configuration (env, tamagui)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Libraries (api, supabase, validations)
│   │   └── api/          # API modules par domaine
│   ├── stores/            # State stores (si besoin)
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── components/            # Composants réutilisables
├── assets/               # Images, fonts
└── e2e/                  # Tests E2E Detox
```

## Configuration Environnement

Créer un fichier `.env` basé sur `.env.example`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://mncenpjkcbzvyazetyjr.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_API_URL=http://localhost:8888
```

## Commandes

```bash
# Développement
npm start           # Démarrer Expo
npm run android     # Android
npm run ios         # iOS
npm run web         # Web

# Tests
npm test            # Tests unitaires
npm run test:watch  # Tests en watch mode
npm run test:coverage # Coverage

# Tests E2E
npm run test:e2e:build:ios    # Build iOS pour E2E
npm run test:e2e:ios          # Run tests iOS
npm run test:e2e:build:android # Build Android
npm run test:e2e:android      # Run tests Android

# Qualité
npm run lint       # ESLint
npm run typecheck  # TypeScript check
```

## API Backend

L'app consomme l'API REST de MonAmiChef:

- **Dev**: `http://localhost:8888`
- **Prod**: `https://api.monamichef.com`

### Endpoints Principaux

- `/auth/*` - Authentification
- `/meal-plans/*` - Plans de repas
- `/recipes/*` - Recettes
- `/grocery-list/*` - Liste de courses
- `/chat/*` - Chat IA
- `/user-health/*` - Suivi santé

## Patterns et Conventions

### API Calls avec TanStack Query

```typescript
// Hook pour fetch
const { data, isLoading, error } = useMealPlans();

// Hook pour mutation
const { mutate } = useCreateMealPlan();
mutate({ weekStartDate: '2024-01-01' });
```

### Validation avec Zod

```typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

### Styling avec NativeWind

```tsx
<View className="flex-1 bg-white p-4">
  <Text className="text-xl font-bold text-primary-600">
    Hello
  </Text>
</View>
```

## Auth Flow

1. L'app vérifie la session Supabase au démarrage
2. Si non authentifié → redirect vers `/(auth)/login`
3. Si authentifié → redirect vers `/(tabs)`
4. Les tokens sont stockés de manière sécurisée via `expo-secure-store`
