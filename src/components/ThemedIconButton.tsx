import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {SvgProps} from 'react-native-svg';
import {ThemedText} from './ThemedText';
import {useColors} from '../contexts/ColorContext';
import {createStyleSheet, useStyles} from '../hooks/useStyles';

type Props = {
  Icon: React.FC<SvgProps>;
  action: string;
  onPress?: () => void;
  color?: string;
};
const ThemedIconButton = ({Icon, action, onPress, color}: Props) => {
  const styles = useStyles(stylesFn);
  const {colors} = useColors();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon fill={color ?? colors.app.white} />
      <ThemedText type="small" color={color ?? colors.app.white}>
        {action}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default ThemedIconButton;

const stylesFn = createStyleSheet(() => ({
  container: {
    padding: 8,
    height: 84,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
}));
