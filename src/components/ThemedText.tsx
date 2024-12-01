import {Text, type TextProps, StyleSheet} from 'react-native';
import React from 'react';

import {createStyleSheet, useStyles} from '../hooks/useStyles';
import {useColors} from '../contexts/ColorContext';

export type ThemedTextProps = TextProps & {
  color?: string;
  type?:
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    | 'caption'
    | 'small';
  smallText?: boolean;
};

export function ThemedText({
  style,
  color,
  type = 'default',
  smallText = false,
  ...rest
}: ThemedTextProps) {
  const styles = useStyles(stylesFn);
  const {colors} = useColors();
  const textColor = colors.foreground.primary;

  return (
    <Text
      style={[
        {color: color ?? textColor},
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'caption' ? styles.caption : undefined,
        type === 'small' ? styles.small : undefined,
        style,
        smallText ? styles.small : undefined,
      ]}
      {...rest}
    />
  );
}

const stylesFn = createStyleSheet(color => ({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: color.status.info500,
  },
  caption: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.5,
  },
  small: {
    fontSize: 12,
  },
}));
