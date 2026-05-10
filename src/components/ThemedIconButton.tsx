import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgProps} from 'react-native-svg';

import {useColors} from '../contexts/ColorContext';
import {createStyleSheet, useStyles} from '../hooks/useStyles';
import {ThemedText} from './ThemedText';

type Props = {
  Icon: React.FC<SvgProps>;
  action: string;
  onPress?: () => void;
  color?: string;
};
const ThemedIconButton = React.memo(({Icon, action, onPress, color}: Props) => {
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
});

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
