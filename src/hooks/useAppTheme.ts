import { useMemo } from 'react';
import { getTheme } from '../styles/theme';
import { useSettings } from '../context/SettingsContext';

export const useAppTheme = () => {
  const { resolvedTheme } = useSettings();
  return useMemo(() => getTheme(resolvedTheme), [resolvedTheme]);
};
