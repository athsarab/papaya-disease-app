import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import type {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { useAppTheme } from '../hooks/useAppTheme';
import { useSettings } from '../context/SettingsContext';
import type { MainTabParamList, RootStackParamList } from '../navigation/RootNavigator';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;
type HomeNavigation = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const HomeScreen: React.FC<Props> = () => {
  const theme = useAppTheme();
  const { t } = useSettings();
  const navigation = useNavigation<HomeNavigation>();
  const wallpaper = require('../../assets/images/wallpeper papya.png');
  const overlayColor = theme.mode === 'dark' ? 'rgba(11,28,18,0.9)' : 'rgba(255,255,255,0.92)';

  return (
    <ImageBackground source={wallpaper} style={styles.background} resizeMode="cover" blurRadius={4}>
      <View style={[styles.overlay, { backgroundColor: overlayColor }]}> 
        <View
          style={[
            styles.hero,
            {
              borderColor: theme.colors.border,
              backgroundColor:
                theme.mode === 'dark' ? 'rgba(20,36,25,0.9)' : 'rgba(255,255,255,0.92)',
            },
          ]}
        > 
          <Text style={[styles.headline, { color: theme.colors.textPrimary }]}>{t('home_headline')}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>{t('home_subtitle')}</Text>
        </View>

        <PrimaryButton
          label={t('home_scan_button')}
          icon="camera"
          onPress={() => navigation.navigate('Scan')}
          style={{ marginBottom: theme.spacing.md }}
        />
        <SecondaryButton label={t('home_history_button')} onPress={() => navigation.navigate('History')} />

        <Text style={[styles.notice, { color: theme.colors.textSecondary }]}>{t('home_offline_notice')}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, padding: 24, justifyContent: 'center' },
  hero: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 24,
    marginBottom: 32,
  },
  headline: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
  notice: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 14,
  },
});

export default HomeScreen;
