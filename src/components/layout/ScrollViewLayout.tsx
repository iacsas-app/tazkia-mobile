import { PropsWithChildren, useMemo } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalStyles from '../../styles/GlobalStyles';

interface Props extends PropsWithChildren {}

export default function ScrollViewLayout(props: Props) {
  const insets = useSafeAreaInsets();
  const paddingHorizontal = useMemo(() => Math.max(15, insets.left + insets.right), []);

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[
          {
            ...GlobalStyles.center,
            maxWidth: 960,
            paddingVertical: 15,
            paddingHorizontal,
          },
        ]}
      >
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
}
