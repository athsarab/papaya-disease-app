import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  NavigationContainer,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { SettingsProvider, useSettings } from './src/context/SettingsContext';
import { HistoryProvider } from './src/context/HistoryContext';
import { getTheme } from './src/styles/theme';
 
const AppContainer = () => {  
  const { resolvedTheme } = useSettings();
  const appTheme = getTheme(resolvedTheme);
  const navTheme: NavigationTheme = {
    ...(resolvedTheme === 'dark' ? NavigationDarkTheme : NavigationLightTheme),
    colors: {
      ...(resolvedTheme === 'dark'
        ? NavigationDarkTheme.colors 
        : NavigationLightTheme.colors),
      primary: appTheme.colors.primary,
      background: appTheme.colors.background,
      card: appTheme.colors.surface,
      text: appTheme.colors.textPrimary,
      border: appTheme.colors.border,
      notification: appTheme.colors.secondary,
    },
  };

  return (
    <>
      <NavigationContainer theme={navTheme}>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
};

const App = () => (
  <SettingsProvider>
    <HistoryProvider>
      <AppContainer />
    </HistoryProvider>
  </SettingsProvider>
);

export default App;
