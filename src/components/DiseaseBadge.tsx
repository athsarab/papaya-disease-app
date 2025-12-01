import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { PapayaSeverity } from '../types';
import { useAppTheme } from '../hooks/useAppTheme';
import { useSettings } from '../context/SettingsContext';
import { TranslationKey } from '../i18n/types';

const severityKeyMap: Record<PapayaSeverity, TranslationKey> = {
  mild: 'severity_mild',
  moderate: 'severity_moderate',
  severe: 'severity_severe',
  unknown: 'severity_unknown',
};

const DiseaseBadge = ({ severity, style }: { severity: PapayaSeverity; style?: ViewStyle }) => {
  const theme = useAppTheme();
  const { t } = useSettings();

  const backgroundMap: Record<PapayaSeverity, string> = {
    mild: theme.colors.success,
    moderate: theme.colors.warning,
    severe: theme.colors.danger,
    unknown: theme.colors.muted,
  };

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: `${backgroundMap[severity]}22`,
          borderColor: backgroundMap[severity],
        },
        style,
      ]}
    >
      <Text style={[styles.label, { color: backgroundMap[severity] }]}>
        {t(severityKeyMap[severity])}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
  },
  label: {
    fontWeight: '600',
    fontSize: 13,
    textTransform: 'capitalize',
  },
});

export default DiseaseBadge;
