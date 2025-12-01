import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useSettings } from '../context/SettingsContext';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useSettings();
  const theme = useAppTheme();

  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('MainTabs'), 1400);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <View style={styles.logo}> 
        <Text style={[styles.title, { color: theme.colors.primary }]}>{t('splash_title')}</Text>
        <Text style={[styles.tagline, { color: theme.colors.textSecondary }]}>{t('splash_tagline')}</Text>
      </View>
      <ActivityIndicator color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 34, fontWeight: '800' },
  tagline: { marginTop: 8, fontSize: 16, textAlign: 'center' },
});

export default SplashScreen;
