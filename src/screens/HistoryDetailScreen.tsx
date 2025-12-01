import React from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAppTheme } from '../hooks/useAppTheme';
import DiseaseBadge from '../components/DiseaseBadge';
import AdviceCard from '../components/AdviceCard';
import { getAdviceFor } from '../data/advice';
import { useSettings } from '../context/SettingsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'HistoryDetail'>;

const HistoryDetailScreen: React.FC<Props> = ({ route }) => {
  const { item } = route.params;
  const theme = useAppTheme();
  const { showConfidence, t } = useSettings();
  const advice = getAdviceFor(item.result.disease, item.result.severity);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}> 
      {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.preview} />}
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{item.result.disease}</Text>
      <DiseaseBadge severity={item.result.severity} style={{ marginTop: 12 }} />
      {showConfidence && (
        <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>
          {t('result_confidence_label')}: {Math.round(item.result.disease_confidence * 100)}%
        </Text>
      )}
      <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>
        {t('history_timestamp_prefix')}: {new Date(item.capturedAt).toLocaleString()}
      </Text>
      <AdviceCard advice={advice} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 24 },
  preview: { width: '100%', height: 220, borderRadius: 18, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '700' },
});

export default HistoryDetailScreen;
