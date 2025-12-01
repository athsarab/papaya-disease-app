import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageCode, ThemePreference } from '../types';
import en from '../i18n/en';
import si from '../i18n/si';
import { TranslationKey, Translations } from '../i18n/types';

const STORAGE_KEY = '@papayapulse.settings';

interface StoredSettings {
  language: LanguageCode;
  showConfidence: boolean;
  themePreference: ThemePreference;
}

interface SettingsContextValue extends StoredSettings {
  resolvedTheme: 'light' | 'dark';
  setLanguage: (language: LanguageCode) => void;
  toggleShowConfidence: () => void;
  setThemePreference: (pref: ThemePreference) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const dictionaries: Record<LanguageCode, Translations> = { en, si };

const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme();
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<StoredSettings>({
    language: 'en',
    showConfidence: true,
    themePreference: 'system',
  });

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setState(JSON.parse(raw));
        }
      } catch (error) {
        console.warn('Failed to load settings', error);
      } finally {
        setHydrated(true);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch((error: unknown) =>
      console.warn('Failed to persist settings', error),
    );
  }, [state, hydrated]);

  const resolvedTheme: 'light' | 'dark' =
    state.themePreference === 'system'
      ? (systemScheme ?? 'light')
      : state.themePreference;

  const setLanguage = useCallback(
    (language: LanguageCode) => setState((prev) => ({ ...prev, language })),
    [],
  );

  const toggleShowConfidence = useCallback(
    () => setState((prev) => ({ ...prev, showConfidence: !prev.showConfidence })),
    [],
  );

  const setThemePreference = useCallback(
    (pref: ThemePreference) => setState((prev) => ({ ...prev, themePreference: pref })),
    [],
  );

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      const template = dictionaries[state.language][key] ?? key;
      if (!vars) return template;
      return template.replace(/\{\{(.*?)\}\}/g, (_, group: string) =>
        String(vars[group.trim()] ?? ''),
      );
    },
    [state.language],
  );

  const value = useMemo<SettingsContextValue>(
    () => ({
      ...state,
      resolvedTheme,
      setLanguage,
      toggleShowConfidence,
      setThemePreference,
      t,
    }),
    [state, resolvedTheme, setLanguage, toggleShowConfidence, setThemePreference, t],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
};
