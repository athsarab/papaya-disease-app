import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import ResultScreen from '../screens/ResultScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HistoryDetailScreen from '../screens/HistoryDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { PapayaResult, HistoryItem } from '../types';
import { useAppTheme } from '../hooks/useAppTheme';
import { useSettings } from '../context/SettingsContext';

export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
  Scan: undefined;
  Result: { result: PapayaResult; imageUri?: string; fromHistory?: boolean };
  HistoryDetail: { item: HistoryItem };
};

export type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  const theme = useAppTheme();
  const { t } = useSettings();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<keyof MainTabParamList, keyof typeof Feather.glyphMap> = {
            Home: 'home',
            History: 'clock',
            Settings: 'settings',
          };
          return (
            <Feather
              name={iconMap[route.name as keyof MainTabParamList]}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('home_scan_button') }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: t('history_title') }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: t('settings_title') }} />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const theme = useAppTheme();
  const { t } = useSettings();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerShadowVisible: false,
        headerTintColor: theme.colors.textPrimary,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Scan" component={ScanScreen} options={{ title: t('scan_title') }} />
      <Stack.Screen name="Result" component={ResultScreen} options={{ title: t('result_title') }} />
      <Stack.Screen
        name="HistoryDetail"
        component={HistoryDetailScreen}
        options={{ title: t('history_detail_header') }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
