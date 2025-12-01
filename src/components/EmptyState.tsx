import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

const EmptyState = ({ message }: { message: string }) => {
  const theme = useAppTheme();
  return (
    <View style={[styles.container, { borderColor: theme.colors.border }]}> 
      <Text style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 24,
    marginTop: 20,
  },
});

export default EmptyState;
