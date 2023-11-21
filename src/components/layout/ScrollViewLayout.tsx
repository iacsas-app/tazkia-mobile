import { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import useWindow from '../../hooks/use-window';
import GlobalStyles from '../../styles/GlobalStyles';

interface Props extends PropsWithChildren {}

export default function ScrollViewLayout(props: Props) {
  const { width } = useWindowDimensions();
  const { paddingHorizontal } = useWindow();

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[
          {
            ...GlobalStyles.center,
            width: width,
            paddingVertical: 15,
            paddingHorizontal,
          },
        ]}
      >
        <Animated.View
          entering={FadeInUp.delay(300).duration(150).springify()}
          exiting={FadeOutDown}
          style={GlobalStyles.center}
        >
          {props.children}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
