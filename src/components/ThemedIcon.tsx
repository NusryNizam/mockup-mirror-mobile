import {SvgProps} from 'react-native-svg';

import {useColors} from '../contexts/ColorContext';
import {Svgs} from '../themes/svgs';

type Props = {
  name: keyof typeof Svgs;
} & SvgProps;

const ThemedIcon = ({name, ...rest}: Props) => {
  const {colors} = useColors();

  const Icon = Svgs[name];

  return <Icon fill={colors.foreground.primary} {...rest} />;
};

export default ThemedIcon;
