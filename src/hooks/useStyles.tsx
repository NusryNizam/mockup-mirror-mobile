import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useColors} from '../contexts/ColorContext';
import {ThemeColors} from '../constants/Colors';

export function useStyles<T>(stylesFunc: (colors: ThemeColors) => T): T {
  const {colors} = useColors();
  return useMemo(() => stylesFunc(colors), [stylesFunc, colors]);
}

export function createStyleSheet<T extends StyleSheet.NamedStyles<any>>(
  stylesFunc: (colors: ThemeColors) => T,
) {
  return (colors: ThemeColors) => {
    return StyleSheet.create(stylesFunc(colors));
  };
}
