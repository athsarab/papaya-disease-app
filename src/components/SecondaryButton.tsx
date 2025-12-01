import React from 'react';
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

interface Props {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const SecondaryButton: React.FC<Props> = ({ label, onPress, style, textStyle, disabled }) => {
  const theme = useAppTheme();

  return (
    <Pressable
      style={[
        styles.button,
        {
          borderColor: theme.colors.border,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.label,
          {
            color: theme.colors.textPrimary,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default SecondaryButton;
