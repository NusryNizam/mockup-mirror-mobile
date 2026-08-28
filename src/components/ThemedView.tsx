import {useMemo} from 'react';
import {View, type ViewProps} from 'react-native';

import {useColors} from '../contexts/ColorContext';

type BackgroundLevel = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

export type ThemedViewProps = ViewProps & {
  /**
   * Which `colors.background.*` shade to paint. Defaults to `'primary'`.
   * Pass `'none'` for a transparent view (spacers, rows, nested wrappers,
   * overlays) that should not introduce a new opaque surface.
   */
  level?: BackgroundLevel | 'none';
};

export function ThemedView({
  style,
  level = 'primary',
  ...otherProps
}: ThemedViewProps) {
  const {colors} = useColors();

  const backgroundStyle = useMemo(
    () =>
      level === 'none' ? null : {backgroundColor: colors.background[level]},
    [colors.background, level],
  );

  return <View {...otherProps} style={[backgroundStyle, style]} />;
}
