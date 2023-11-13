import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
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
import Text from '../../../../components/Text';
import HStack from '../../../../components/stack/HStack';
import VStack from '../../../../components/stack/VStack';
import { SoulPart, SoulPartLevel } from '../../../../domains/purification/Soul';
import { useMessage } from '../../../../hooks/use-message';
import usePurification from '../../../../hooks/use-purification';
import { PurificationStackNavigationProp } from '../../../../navigation/types';
import GlobalStyles from '../../../../styles/GlobalStyles';
import { BACKDROP_COLOR, OVERDRAG } from '../../../invocations/immunization/PeriodChooser';
import LevelChooser from './LevelChooser';
import { hasSubTitle, soulRules } from './data';

const { width: windowWidth } = Dimensions.get('window');

export default function SoulScreen() {
  const { formatMessage, formatNumber } = useMessage();
  const { createSoul, findSoul } = usePurification();
  const navigation = useNavigation<PurificationStackNavigationProp>();

  const parts: string[] = useMemo(() => Object.keys(soulRules), []);
  const [isOpen, setOpen] = useState(false);
  const [part, setPart] = useState<SoulPart>();
  const offset = useSharedValue(0);

  const toggleSheet = () => {
    if (isOpen) {
      setPart(undefined);
    }
    setOpen(!isOpen);
    offset.value = 0;
  };

  function handleSelect(level: SoulPartLevel) {
    if (part) {
      createSoul(part, level);
      toggleSheet();
      navigation.push('Purification');
    }
  }

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;

      const clamp = Math.max(-OVERDRAG, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < 800 / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(800, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  function handlePress(level: SoulPart) {
    setPart(level);
    toggleSheet();
  }

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={GlobalStyles.container}>
        <VStack style={GlobalStyles.container} spacing={8}>
          {parts.map((soulPart, index) => {
            const hasSubtitle = hasSubTitle.find((part) => part.toString() === soulPart) !== undefined;
            const progress = findSoul(soulPart as any);
            const hasProgress = progress !== undefined;

            return (
              <HStack
                index={index + 10}
                key={soulPart}
                style={{ ...styles.part, backgroundColor: hasProgress ? '#66cdaa' : '#f5fffa' }}
                onTouchStart={() => handlePress(soulPart as any)}
              >
                <Avatar.Text
                  size={35}
                  label={formatNumber(Number.parseInt(soulPart))}
                  color="#191970"
                  style={styles.partNumber}
                />
                <VStack center>
                  <Text variant="body1" style={styles.partTitle}>
                    {formatMessage(`purification.soul.${soulPart}.title`)}
                  </Text>
                  {hasSubtitle && (
                    <Text variant="body2" style={styles.partSubTitle}>
                      {formatMessage(`purification.soul.${soulPart}.sub.title`)}
                    </Text>
                  )}
                </VStack>
                {hasProgress && <Icon name="progress-check" style={styles.partProgress} color={'#00fa9a'} />}
              </HStack>
            );
          })}
        </VStack>
      </View>
      {isOpen && (
        <>
          <AnimatedPressable style={styles.backdrop} entering={FadeIn} exiting={FadeOut} onPress={toggleSheet} />
          <GestureDetector gesture={pan}>
            <Animated.View
              style={[styles.sheet, translateY]}
              entering={SlideInDown.springify().damping(15)}
              exiting={SlideOutDown}
            >
              <LevelChooser part={part} onSelect={handleSelect} onToogle={toggleSheet} />
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
    elevation: 6,
    borderRadius: 45,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
    flexBasis: 60,
    width: windowWidth - 15,
  },
  partNumber: { left: 10, position: 'absolute', backgroundColor: '#add8e6' },
  partProgress: { right: 10, position: 'absolute', fontSize: 35 },
  partTitle: { fontSize: 18, fontWeight: '900' },
  partSubTitle: { fontSize: 16, fontWeight: '600', color: 'grey' },
  sheet: {
    backgroundColor: 'white',
    padding: 20,
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
