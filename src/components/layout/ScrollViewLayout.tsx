import { PropsWithChildren, useMemo } from 'react';
import { SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalStyles from '../../styles/GlobalStyles';

interface Props extends PropsWithChildren {}

export default function ScrollViewLayout(props: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const paddingHorizontal = useMemo(() => Math.max(15, insets.left + insets.right), []);

  return (
    <SafeAreaView>
      <Animated.View
        entering={FadeInUp.delay(300).duration(150).springify()}
        exiting={FadeOutDown}
        style={GlobalStyles.center}
      >
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
          {props.children}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}
