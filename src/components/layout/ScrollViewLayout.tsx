import { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';

interface Props extends PropsWithChildren {}

export default function ScrollViewLayout(props: Props) {
  return (
    <SafeAreaView
      style={{
        paddingVertical: 15,
      }}
    >
      <ScrollView contentContainerStyle={GlobalStyles.center}>{props.children}</ScrollView>
    </SafeAreaView>
  );
}
