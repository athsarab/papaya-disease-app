import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { useAppTheme } from '../hooks/useAppTheme';

interface Props {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

const ErrorState: React.FC<Props> = ({ message, actionLabel, onAction }) => {
  const theme = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: `${theme.colors.danger}10` }]}> 
      <Text style={[styles.text, { color: theme.colors.danger }]}>{message}</Text>
      {actionLabel && onAction && (
        <PrimaryButton
          label={actionLabel}
          onPress={onAction}
          style={{ marginTop: 12, backgroundColor: theme.colors.danger }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 16,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ErrorState;
