import {useMemo} from 'react';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {ThemeColors} from '../constants/Colors';
import {useColors} from '../contexts/ColorContext';

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

export function useStyles<T>(stylesFunc: (colors: ThemeColors) => T): T {
  const {colors} = useColors();
  return useMemo(() => stylesFunc(colors), [stylesFunc, colors]);
}

export function createStyleSheet<
  T extends NamedStyles<T> | NamedStyles<unknown>,
>(stylesFunc: (colors: ThemeColors) => T) {
  return (colors: ThemeColors) => {
    return StyleSheet.create(stylesFunc(colors));
  };
}
