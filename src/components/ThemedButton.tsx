import React, {useMemo} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import {ThemedText} from './ThemedText';
import {createStyleSheet, useStyles} from '../hooks/useStyles';
import {useColors} from '../contexts/ColorContext';

export type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'primary' | 'secondary' | 'ghost';
  text: string;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
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
  }, []);

  return (
    <TouchableOpacity
      style={[
        mainStyle,
        type === 'primary' ? styles.primary : undefined,
        type === 'secondary' ? styles.secondary : undefined,
        type === 'ghost' ? styles.ghost : undefined,
        styles.button,
        style,
      ]}
      {...rest}>
      <ThemedText type="defaultSemiBold" style={styles.buttonText} color={mainStyle.color}>
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
}

// const styles = StyleSheet.create({
//   button: {
//     paddingBlock: 4,
//     borderRadius: 4,
//     minHeight: 40,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     textAlign: "center",
//     textTransform: "uppercase",
//   },
//   primary: {},
//   secondary: {
//     // fontSize: 16,
//     // lineHeight: 24,
//     // fontWeight: '600',
//   },
//   ghost: {
//     // fontSize: 32,
//     // fontWeight: 'bold',
//     // lineHeight: 32,
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   link: {
//     lineHeight: 30,
//     fontSize: 16,
//     color: "#0a7ea4",
//   },
// });

const stylesFn = createStyleSheet(colors => ({
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
  primary: {},
  secondary: {
    // fontSize: 16,
    // lineHeight: 24,
    // fontWeight: '600',
  },
  ghost: {
    // fontSize: 32,
    // fontWeight: 'bold',
    // lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
}));
