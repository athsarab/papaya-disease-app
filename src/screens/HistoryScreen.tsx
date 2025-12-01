import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { BottomTabScreenProps, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { useHistory } from '../context/HistoryContext';
import { useAppTheme } from '../hooks/useAppTheme';
import { useSettings } from '../context/SettingsContext';
import HistoryListItem from '../components/HistoryListItem';
import EmptyState from '../components/EmptyState';
import type { MainTabParamList, RootStackParamList } from '../navigation/RootNavigator';

type Props = BottomTabScreenProps<MainTabParamList, 'History'>;
type HistoryNav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'History'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const HistoryScreen: React.FC<Props> = () => {
  const { history } = useHistory();
  const theme = useAppTheme();
  const { t } = useSettings();
  const navigation = useNavigation<HistoryNav>();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24 }}
        renderItem={({ item }) => (
          <HistoryListItem item={item} onPress={() => navigation.navigate('HistoryDetail', { item })} />
        )}
        ListEmptyComponent={<EmptyState message={t('history_empty')} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default HistoryScreen;
