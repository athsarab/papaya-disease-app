import React from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { useAppTheme } from '../hooks/useAppTheme';
import { LanguageCode, ThemePreference } from '../types';

const SettingsScreen: React.FC = () => {
  const {
    language,
    setLanguage,
    showConfidence,
    toggleShowConfidence,
    themePreference,
    setThemePreference,
    t,
  } = useSettings();
  const theme = useAppTheme();

  const languageOptions: { label: string; value: LanguageCode }[] = [
    { label: t('settings_language_en'), value: 'en' },
    { label: t('settings_language_si'), value: 'si' },
  ];

  const themeOptions: { label: string; value: ThemePreference }[] = [
    { label: t('settings_theme_system'), value: 'system' },
    { label: t('settings_theme_light'), value: 'light' },
    { label: t('settings_theme_dark'), value: 'dark' },
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <View style={styles.section}> 
        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>{t('settings_language')}</Text>
        <View style={styles.row}>
          {languageOptions.map((option) => (
            <Pressable
              key={option.value}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    language === option.value ? theme.colors.primary : theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => setLanguage(option.value)}
            >
              <Text
                style={{
                  color: language === option.value ? '#fff' : theme.colors.textPrimary,
                  fontWeight: '600',
                }}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}> 
        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>{t('settings_theme')}</Text>
        <View style={styles.row}>
          {themeOptions.map((option) => (
            <Pressable
              key={option.value}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    themePreference === option.value
                      ? theme.colors.secondary
                      : theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => setThemePreference(option.value)}
            >
              <Text
                style={{
                  color: themePreference === option.value ? '#000' : theme.colors.textPrimary,
                  fontWeight: '600',
                }}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}> 
        <View style={styles.toggleRow}>
          <View>
            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
              {t('settings_confidence_toggle')}
            </Text>
            <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>
              {t('settings_confidence_hint')}
            </Text>
          </View>
          <Switch
            value={showConfidence}
            onValueChange={toggleShowConfidence}
            thumbColor={showConfidence ? theme.colors.primary : theme.colors.border}
            trackColor={{ true: `${theme.colors.primary}60`, false: theme.colors.border }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 24 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 12,
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SettingsScreen;
