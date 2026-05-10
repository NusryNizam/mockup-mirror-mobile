import {useMemo} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

import {useColors} from '../contexts/ColorContext';
import {createStyleSheet, useStyles} from '../hooks/useStyles';
import {ThemedText} from './ThemedText';

export type ThemedButtonProps = TouchableOpacityProps & {
  type?: 'primary' | 'secondary' | 'ghost';
  text: string;
};

export function ThemedButton({
  style,
  type = 'primary',
  text,
  ...rest
}: ThemedButtonProps) {
  const styles = useStyles(stylesFn);
  const {colors} = useColors();

  const mainStyle = useMemo(() => {
    switch (type) {
      case 'primary': {
        return {
          backgroundColor: colors.accent.primary,
          color: colors.background.primary,
        };
      }

      case 'secondary': {
        return {
          backgroundColor: colors.background.tertiary,
          color: colors.foreground.secondary,
        };
      }

      case 'ghost': {
        return {
          backgroundColor: 'transparent',
          color: colors.foreground.primary,
        };
      }

      default: {
        return {
          backgroundColor: colors.accent.primary,
          color: colors.background.primary,
        };
      }
    }
  }, [
    colors.accent.primary,
    colors.background.primary,
    colors.background.tertiary,
    colors.foreground.primary,
    colors.foreground.secondary,
    type,
  ]);

  return (
    <TouchableOpacity style={[mainStyle, styles.button, style]} {...rest}>
      <ThemedText
        type="defaultSemiBold"
        style={styles.buttonText}
        color={mainStyle.color}>
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
}

const stylesFn = createStyleSheet(_colors => ({
  button: {
    paddingBlock: 4,
    borderRadius: 4,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
}));
