import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Color } from '../../constants/Color';
import GlobalStyles from '../../styles/GlobalStyles';

interface Props extends PropsWithChildren {}

export default function ScreenLayout({ children }: Props) {
  return <View style={{ ...GlobalStyles.container, backgroundColor: Color.backgroundColor }}>{children}</View>;
}
