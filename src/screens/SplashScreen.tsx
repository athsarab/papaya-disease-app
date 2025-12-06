
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useSettings } from '../context/SettingsContext';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const splashBackground = require('../../assets/images/splash screen.png');

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useSettings();
  const theme = useAppTheme();

  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('MainTabs'), 1400);
    return () => clearTimeout(timer);
  }, [navigation]);

  const overlayColor = theme.mode === 'dark' ? 'rgba(11,28,18,0.85)' : 'rgba(255,255,255,0.92)';

  return (
    <ImageBackground
      source={splashBackground}
      style={styles.background}
      resizeMode="cover"
      blurRadius={theme.mode === 'dark' ? 1 : 0}
    >
      <View style={[styles.container, { backgroundColor: overlayColor }]}> 
        <View style={styles.logo}> 
          <Text style={[styles.title, { color: theme.colors.primary }]}>{t('splash_title')}</Text>
          <Text style={[styles.tagline, { color: theme.colors.textSecondary }]}>{t('splash_tagline')}</Text>
        </View>
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  logo: { alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 34, fontWeight: '800' },
  tagline: { marginTop: 8, fontSize: 16, textAlign: 'center' },
});

export default SplashScreen;
