import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import { useAppTheme } from '../hooks/useAppTheme';
import { useSettings } from '../context/SettingsContext';

export interface AdviceContent {
  title: string;
  description: string;
  actions: string[];
}

const AdviceCard = ({ advice }: { advice?: AdviceContent }) => {
  const theme = useAppTheme();
  const { t } = useSettings();

  if (!advice) {
    return (
      <Card>
        <Text style={{ color: theme.colors.textSecondary }}>{t('advice_no_data')}</Text>
      </Card>
    );
  }

  return (
    <Card>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{advice.title}</Text>
      <Text style={{ color: theme.colors.textSecondary, marginTop: 6 }}>{advice.description}</Text>
      {advice.actions.length > 0 && (
        <View style={{ marginTop: 14 }}>
          <Text style={{ color: theme.colors.textPrimary, fontWeight: '600', marginBottom: 6 }}>
            {t('advice_actions_label')}
          </Text>
          {advice.actions.map((action) => (
            <View key={action} style={styles.actionRow}>
              <View style={[styles.bullet, { backgroundColor: theme.colors.primary }]} />
              <Text style={{ color: theme.colors.textSecondary, flex: 1 }}>{action}</Text>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 10,
  },
});

export default AdviceCard;
