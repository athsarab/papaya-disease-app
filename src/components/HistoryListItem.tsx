import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HistoryItem } from '../types';
import { useAppTheme } from '../hooks/useAppTheme';
import DiseaseBadge from './DiseaseBadge';
import { useSettings } from '../context/SettingsContext';

interface Props {
  item: HistoryItem;
  onPress: () => void;
}

const HistoryListItem: React.FC<Props> = ({ item, onPress }) => {
  const theme = useAppTheme();
  const { t, showConfidence } = useSettings();

  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: theme.colors.border }]}
      onPress={onPress}
    >
      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, { backgroundColor: theme.colors.muted }]} />
      )}
      <View style={styles.meta}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{item.result.disease}</Text>
        <DiseaseBadge severity={item.result.severity} style={{ marginVertical: 4 }} />
        <Text style={{ color: theme.colors.textSecondary, fontSize: 13 }}>
          {t('history_timestamp_prefix')} • {new Date(item.capturedAt).toLocaleString()}
        </Text>
        {showConfidence && (
          <Text style={{ color: theme.colors.textSecondary, fontSize: 13 }}>
            {t('result_confidence_label')}: {Math.round(item.result.disease_confidence * 100)}%
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#dfe3dd',
  },
  meta: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HistoryListItem;
