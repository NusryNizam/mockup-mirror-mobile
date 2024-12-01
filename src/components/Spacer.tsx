import {Text, View} from 'react-native';
import {createStyleSheet, useStyles} from '../hooks/useStyles';

type Props = {
  height: number;
};
const Spacer = ({height}: Props) => {
  const styles = useStyles(stylesFn);

  return <View style={{...styles.spacer, height}}></View>;
};

export default Spacer;

const stylesFn = createStyleSheet(() => ({
  spacer: {
    aspectRatio: 1,
  },
}));
