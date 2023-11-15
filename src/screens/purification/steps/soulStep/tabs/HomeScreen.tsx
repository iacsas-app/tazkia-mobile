import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Text from '../../../../../components/Text';
import HStack from '../../../../../components/stack/HStack';
import VStack from '../../../../../components/stack/VStack';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import { SoulPart, SoulPartLevel } from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import usePurification from '../../../../../hooks/use-purification';
import { PURIFICATION_MAX_DAYS, progressPercentage2 } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { BACKDROP_COLOR, OVERDRAG } from '../../../../invocations/immunization/PeriodChooser';
import LevelChooser from '../helpers/LevelChooser';
import { hasSubTitle, soulRules } from '../helpers/data';
import SegmentedSoulProgress from '../progress/SegmentedSoulProgress';

export default function HomeScreen() {
  const { formatMessage, formatNumber } = useMessage();
  const { createSoul, findSoul, evaluateSoul } = usePurification();

  const parts: string[] = useMemo(() => Object.keys(soulRules), []);
  const levels: number[] = useMemo(() => Object.values(soulRules).map((item) => item.length), []);
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

  const handleEvaluate = useCallback((part: SoulPart, level: SoulPartLevel, checked: boolean) => {
    evaluateSoul(part, level, checked);
  }, []);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={GlobalStyles.container}>
        <VStack style={GlobalStyles.container} spacing={8}>
          {parts.map((soulPart, index) => {
            const hasSubtitle = hasSubTitle.find((part) => part.toString() === soulPart) !== undefined;
            const progress = findSoul(soulPart as any);
            const hasProgress = progress !== undefined;
            const idx = index + 1;
            const size = progress ? levels[progress.part - 1] : 0;
            const sum = progress
              ? progress.partProgress
                  .map((i) => progressPercentage2(i.progress, PURIFICATION_MAX_DAYS))
                  .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
              : 0;
            const percentage = sum / size;
            const completed = percentage === 100;

            return (
              <Animated.View key={index + 1} entering={FadeInUp.delay(200 * idx)}>
                <HStack
                  index={index + 10}
                  key={soulPart}
                  style={{
                    ...styles.part,
                    backgroundColor: hasProgress ? (completed ? '#8de0b6' : '#dbf6e8') : '#f5fffa',
                  }}
                  onTouchStart={() => handlePress(soulPart as any)}
                >
                  <Avatar.Text
                    size={30}
                    label={formatNumber(Number.parseInt(soulPart))}
                    color="#191970"
                    style={{ ...styles.partNumber, backgroundColor: completed ? '#dffcef' : '#add8e6' }}
                  />
                  <VStack>
                    <VStack center>
                      <Text variant="bodyLarge" style={{ ...styles.partTitle, paddingBottom: hasSubtitle ? 0 : 2 }}>
                        {formatMessage(`purification.soul.${soulPart}.title`)}
                      </Text>
                      {hasSubtitle && (
                        <Animated.Text entering={FadeInDown.delay(270 * idx)} style={styles.partSubTitle}>
                          {formatMessage(`purification.soul.${soulPart}.sub.title`)}
                        </Animated.Text>
                      )}
                    </VStack>
                    {progress && <SegmentedSoulProgress progress={progress.partProgress} />}
                  </VStack>
                  {hasProgress && (
                    <Animated.View
                      entering={FadeInLeft.delay(400).duration(300).springify().stiffness(300)}
                      style={styles.partProgress}
                    >
                      {completed ? (
                        <Icon name="check-all" size={25} color="green" />
                      ) : (
                        <CircularProgress
                          value={percentage}
                          maxValue={100}
                          duration={600}
                          radius={21}
                          valuePrefix={'%'}
                          inActiveStrokeColor={'#3cb371'}
                          inActiveStrokeOpacity={0.2}
                          progressValueStyle={styles.progress}
                        />
                      )}
                    </Animated.View>
                  )}
                </HStack>
              </Animated.View>
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
              <LevelChooser part={part} onSelect={handleSelect} onToogle={toggleSheet} onEvaluate={handleEvaluate} />
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
    flexBasis: 55,
    width: SCREEN_WIDTH - 15,
  },
  partNumber: { left: 10, position: 'absolute', elevation: 1 },
  partProgress: { right: 10, position: 'absolute', fontSize: 30 },
  partTitle: { fontSize: 14, fontWeight: '900' },
  partSubTitle: { fontSize: 10, fontWeight: '700', color: '#708090', marginTop: -3 },
  sheet: {
    backgroundColor: 'white',
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
  progress: { color: 'green', fontWeight: '700', fontSize: 11 },
});
