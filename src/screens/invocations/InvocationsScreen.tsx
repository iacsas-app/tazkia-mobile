import { Box, Stack, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Basmalah from '../../components/Basmalah';
import Text from '../../components/Text';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import PeriodChooser, { BACKDROP_COLOR, HEIGHT, OVERDRAG } from './immunization/PeriodChooser';

export default function InvocationsScreen() {
  const { formatMessage } = useMessage();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();

  const [isOpen, setOpen] = useState(false);
  const offset = useSharedValue(0);

  const toggleSheet = () => {
    setOpen(!isOpen);
    offset.value = 0;
  };

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;

      const clamp = Math.max(-OVERDRAG, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(HEIGHT, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const parts = useMemo(
    () => [
      {
        route: 'Immunization',
        name: TKeys.INVOCATION_IMMUNIZATION_TITLE,
      },
      {
        route: 'Jewels',
        name: TKeys.INVOCATION_JEWELS_TITLE,
      },
    ],
    [],
  );

  function handlePress(route: string) {
    if (route === 'Immunization') {
      toggleSheet();
    } else {
      navigation.navigate(route);
    }
  }

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Box style={GlobalStyles.center}>
        <VStack spacing={2} style={{ alignItems: 'center' }}>
          <Basmalah />
          <Stack style={GlobalStyles.container} items="center" spacing={15} mt={13}>
            {parts.map((item, index: number) => (
              <Box
                key={index}
                style={{ ...styles.part, width: width - 120 }}
                onTouchStart={() => handlePress(item.route)}
              >
                <Text variant="bodyLarge" style={{ fontSize: 18, fontWeight: '800' }}>
                  {formatMessage(item.name)}
                </Text>
              </Box>
            ))}
          </Stack>
        </VStack>
      </Box>
      {isOpen && (
        <>
          <AnimatedPressable style={styles.backdrop} entering={FadeIn} exiting={FadeOut} onPress={toggleSheet} />
          <GestureDetector gesture={pan}>
            <Animated.View
              style={[styles.sheet, translateY]}
              entering={SlideInDown.springify().damping(15)}
              exiting={SlideOutDown}
            >
              <PeriodChooser
                onSelect={(period) => {
                  navigation.navigate('Immunization', { period });
                  toggleSheet();
                }}
                onToogle={toggleSheet}
              />
            </Animated.View>
          </GestureDetector>
        </>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0e275',
  },
  part: {
    backgroundColor: '#e9c196',
    elevation: 6,
    borderRadius: 45,
    paddingVertical: 10,
    minHeight: 90,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'justify',
    alignItems: 'center',
  },
  sheet: {
    backgroundColor: 'white',
    padding: 16,
    height: HEIGHT,
    width: '100%',
    position: 'absolute',
    bottom: -OVERDRAG * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BACKDROP_COLOR,
    zIndex: 1,
  },
});
