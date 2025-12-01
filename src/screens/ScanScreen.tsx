import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import ErrorState from '../components/ErrorState';
import { analyzeLeafImage } from '../services/papayaService';
import { useSettings } from '../context/SettingsContext';
import { useAppTheme } from '../hooks/useAppTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Scan'>;

const ScanScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useSettings();
  const theme = useAppTheme();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePick = async () => {
    setError(null);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t('scan_permission_denied'));
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.8,
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0]?.uri ?? null);
    }
  };

  const handleCapture = async () => {
    setError(null);
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t('scan_permission_denied'));
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8, allowsEditing: true });
    if (!result.canceled) {
      setImageUri(result.assets[0]?.uri ?? null);
    }
  };

  const handleAnalyze = async () => {
    if (!imageUri) {
      Alert.alert(t('scan_select_image_first'));
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeLeafImage(imageUri);
      navigation.navigate('Result', { result, imageUri });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('scan_error_generic'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.hint, { color: theme.colors.textSecondary }]}>{t('scan_hint')}</Text>

      <PrimaryButton
        label={t('scan_camera')}
        icon="camera"
        onPress={handleCapture}
        style={{ marginTop: 20 }}
        disabled={isAnalyzing}
      />
      <SecondaryButton
        label={t('scan_gallery')}
        onPress={handlePick}
        style={{ marginTop: 12 }}
        disabled={isAnalyzing}
      />

      {imageUri && (
        <View style={[styles.previewWrapper, { borderColor: theme.colors.border }]}> 
          <Image source={{ uri: imageUri }} style={styles.preview} />
        </View>
      )}

      {error && (
        <ErrorState message={error} actionLabel={t('scan_retry')} onAction={handleAnalyze} />
      )}

      <PrimaryButton
        label={isAnalyzing ? t('scan_analyzing') : t('scan_analyze')}
        icon="activity"
        loading={isAnalyzing}
        onPress={handleAnalyze}
        style={{ marginTop: 20 }}
      />

      {isAnalyzing && (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={theme.colors.primary} />
          <Text style={{ marginLeft: 12, color: theme.colors.textSecondary }}>
            {t('scan_analyzing')}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24 },
  hint: { fontSize: 14, textAlign: 'center' },
  previewWrapper: {
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
    overflow: 'hidden',
  },
  preview: { width: '100%', height: 260 },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'center',
  },
});

export default ScanScreen;
