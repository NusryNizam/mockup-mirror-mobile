import React from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
  } from 'react-native';
  
  import { useThemeColor } from '../hooks/useThemeColor';

  import { ThemedText } from './ThemedText';
  import { Colors } from '../constants/Colors'
  
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
    const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      'tint'
    );

   
  
    return (
      <TouchableOpacity
        style={[
          { backgroundColor },
          type === 'primary' ? styles.primary : undefined,
          type === 'secondary' ? styles.secondary : undefined,
          type === 'ghost' ? styles.ghost : undefined,
          styles.button,
          style,
        ]}
        {...rest}
      >
        <ThemedText
          type="defaultSemiBold"
          darkColor={Colors.dark.background}
          lightColor={Colors.light.text}
          style={styles.buttonText}
        >
          {text}
        </ThemedText>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
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
  });
  