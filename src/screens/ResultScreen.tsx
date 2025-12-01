import React, { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import Card from '../components/Card';
import DiseaseBadge from '../components/DiseaseBadge';
import AdviceCard from '../components/AdviceCard';
import { useSettings } from '../context/SettingsContext';
import { useAppTheme } from '../hooks/useAppTheme';
import { useHistory } from '../context/HistoryContext';
import { RootStackParamList } from '../navigation/RootNavigator';
import { getAdviceFor } from '../data/advice';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

const ResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const { result, imageUri, fromHistory } = route.params;
  const { disease, severity, disease_confidence, severity_confidence } = result;
  const { t, showConfidence } = useSettings();
  const theme = useAppTheme();
  const { addEntry } = useHistory();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(Boolean(fromHistory));

  const advice = useMemo(() => getAdviceFor(result.disease, result.severity), [result]);

  const handleSave = async () => {
    if (saved) return;
    setSaving(true);
    try {
      await addEntry({ result, imageUri });
      setSaved(true);
    } catch (error) {
      console.warn(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}> 
      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}
      <Card style={{ marginTop: 20 }}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{disease}</Text>
        <DiseaseBadge severity={severity} style={{ marginTop: 12 }} />
        {showConfidence && (
          <Text style={[styles.confidence, { color: theme.colors.textSecondary }]}>
            {t('result_confidence_label')}: {Math.round(disease_confidence * 100)}% •
            {` ${Math.round(severity_confidence * 100)}%`}
          </Text>
        )}
        {(disease === 'NotPapaya' || disease_confidence < 0.4) && (
          <Text style={[styles.alertText, { color: theme.colors.warning }]}>
            {disease === 'NotPapaya' ? t('result_not_papaya') : t('result_low_confidence')}
          </Text>
        )}
      </Card>

      <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>{t('result_advice_title')}</Text>
      <AdviceCard advice={advice} />
      <Text style={[styles.disclaimer, { color: theme.colors.textSecondary }]}>{t('result_disclaimer')}</Text>

      {!fromHistory && (
        <PrimaryButton
          label={saved ? t('result_saved') : t('result_save')}
          icon={saved ? 'check' : 'save'}
          onPress={handleSave}
          loading={saving}
          disabled={saved}
          style={{ marginTop: 20 }}
        />
      )}
      <SecondaryButton
        label={t('result_back_home')}
        onPress={() => navigation.popToTop()}
        style={{ marginTop: 12, marginBottom: 24 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 24 },
  preview: { width: '100%', height: 240, borderRadius: 20 },
  title: { fontSize: 24, fontWeight: '700' },
  confidence: { marginTop: 12, fontSize: 13 },
  alertText: { marginTop: 16, fontWeight: '600' },
  sectionTitle: { marginTop: 24, marginBottom: 12, fontSize: 18, fontWeight: '700' },
  disclaimer: { marginTop: 12, fontSize: 12 },
});

export default ResultScreen;
