import {Text, type TextProps} from 'react-native';

import {useColors} from '../contexts/ColorContext';
import {createStyleSheet, useStyles} from '../hooks/useStyles';

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

  const typeStyleMap = {
    default: styles.default,
    title: styles.title,
    defaultSemiBold: styles.defaultSemiBold,
    subtitle: styles.subtitle,
    link: styles.link,
    caption: styles.caption,
    small: styles.small,
  };

  return (
    <Text
      style={[
        {color: color ?? textColor},
        typeStyleMap[type],
        smallText ? styles.small : undefined,
        style,
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
