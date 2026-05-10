import {View, type ViewProps} from 'react-native';

import {useColors} from '../contexts/ColorContext';

export function ThemedView({style, ...otherProps}: ViewProps) {
  const {colors} = useColors();
  const backgroundColor = colors.background.primary;

  return <View style={[{backgroundColor}, style]} {...otherProps} />;
}
