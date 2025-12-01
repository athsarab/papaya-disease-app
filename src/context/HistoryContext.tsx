import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryItem, PapayaResult } from '../types';

const STORAGE_KEY = '@papayapulse.history';

interface HistoryContextValue {
  history: HistoryItem[];
  isLoading: boolean;
  addEntry: (payload: { result: PapayaResult; imageUri?: string }) => Promise<HistoryItem>;
  clearHistory: () => Promise<void>;
}

const HistoryContext = createContext<HistoryContextValue | null>(null);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setHistory(JSON.parse(raw));
        }
      } catch (error) {
        console.warn('Failed to read history', error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const persist = async (items: HistoryItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.warn('Failed to persist history', error);
    }
  };

  const addEntry = useCallback<HistoryContextValue['addEntry']>(
    async ({ result, imageUri }) => {
      const entry: HistoryItem = {
        id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        capturedAt: new Date().toISOString(),
        imageUri,
        result,
      };
      setHistory((prev) => {
        const updated = [entry, ...prev];
        persist(updated);
        return updated;
      });
      return entry;
    },
    [],
  );

  const clearHistory = useCallback(async () => {
    setHistory([]);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear history', error);
    }
  }, []);

  const value = useMemo(
    () => ({ history, isLoading, addEntry, clearHistory }),
    [history, isLoading, addEntry, clearHistory],
  );

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};

export const useHistory = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error('useHistory must be used within HistoryProvider');
  return ctx;
};
