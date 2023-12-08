import { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { SCREEN_WIDTH } from '../../constants/Screen';
import useWindow from '../../hooks/use-window';
import GlobalStyles from '../../styles/GlobalStyles';

interface Props extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

export default function ScrollViewLayout(props: Props) {
  const { paddingHorizontal } = useWindow();

  return (
    <SafeAreaView style={props.style}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[
          {
            ...GlobalStyles.center,
            width: SCREEN_WIDTH,
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
