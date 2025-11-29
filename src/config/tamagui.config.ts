import { createTamagui, createTokens } from '@tamagui/core';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens as defaultTokens } from '@tamagui/themes';
import { createInterFont } from '@tamagui/font-inter';

const interFont = createInterFont();

const tokens = createTokens({
  ...defaultTokens,
  color: {
    ...defaultTokens.color,
    // MonAmiChef brand colors
    primary: '#22c55e',
    primaryLight: '#86efac',
    primaryDark: '#15803d',
    secondary: '#eab308',
    secondaryLight: '#fde047',
    secondaryDark: '#a16207',
    background: '#ffffff',
    backgroundDark: '#111827',
    text: '#111827',
    textLight: '#6b7280',
    textDark: '#f9fafb',
    error: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
});

const config = createTamagui({
  defaultFont: 'body',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: interFont,
    body: interFont,
  },
  themes: {
    ...themes,
    light: {
      ...themes.light,
      background: tokens.color.background,
      color: tokens.color.text,
      primary: tokens.color.primary,
      secondary: tokens.color.secondary,
    },
    dark: {
      ...themes.dark,
      background: tokens.color.backgroundDark,
      color: tokens.color.textDark,
      primary: tokens.color.primary,
      secondary: tokens.color.secondary,
    },
  },
  tokens,
});

export type AppConfig = typeof config;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
