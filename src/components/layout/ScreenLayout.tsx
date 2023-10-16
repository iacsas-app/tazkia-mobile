import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';

interface Props extends PropsWithChildren {}

export default function ScreenLayout({ children }: Props) {
  return <View style={{ ...GlobalStyles.container, backgroundColor: '#d5f3e378' }}>{children}</View>;
}
