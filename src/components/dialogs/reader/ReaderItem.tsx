import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar, TouchableRipple } from 'react-native-paper';
import Animated, {
  Easing,
  SlideInUp,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Color } from '../../../constants/Color';
import { Font } from '../../../constants/Font';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';
import Text from '../../Text';
import HStack from '../../stack/HStack';
import VStack from '../../stack/VStack';

export type ReaderItemProps = {
  index: number;
  value: InvocationRepeat;
  total: number;
  onDone(): void;
  onFinish(): void;
};
export default function ReaderItem({ index, total, value, ...props }: ReaderItemProps) {
  const [count, setCount] = useState(value.repeat);
  const { formatMessage } = useMessage();
  const offset = useSharedValue(0);
  const countStyle = useAnimatedStyle(() => ({ transform: [{ translateY: -offset.value }] }));

  function handlePress() {
    if (index === total) {
      props.onFinish();
    }
    if (count === 0) {
      return;
    }
    setCount((prev) => {
      if (prev === 1) {
        props.onDone();
      }
      return prev - 1;
    });
    offset.value = withSequence(
      withTiming(100, {
        duration: 100,
        easing: Easing.inOut(Easing.circle),
      }),
      withTiming(0),
    );
  }

  useEffect(() => {
    setCount(value.repeat);
  }, [value]);

  if (count === 0 && index !== total) {
    return <></>;
  }

  return (
    <Animated.View entering={SlideInUp.duration(200).springify()} exiting={SlideOutDown.duration(200).mass(100)}>
      <TouchableRipple style={styles.touchable} onPress={handlePress}>
        <VStack style={styles.container}>
          <Text variant="titleLarge" style={styles.summary}>
            {formatMessage(value.key)}
          </Text>
          <View style={styles.footer}>
            {index !== total && (
              <HStack style={styles.counter}>
                <Text style={{ ...styles.tag, backgroundColor: '#fff5ee' }}>{`${index}/${total}`}</Text>
                <Animated.View style={countStyle}>
                  <Text variant="bodyMedium" style={[styles.tag, { backgroundColor: Color.completed }]}>
                    {formatMessage(count > 1 ? TKeys.TIMES_COUNT_PLURAL : TKeys.TIMES_COUNT, { times: count })}
                  </Text>
                </Animated.View>
              </HStack>
            )}
            <ProgressBar progress={index / total} visible={true} style={styles.progress} />
          </View>
        </VStack>
      </TouchableRipple>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  touchable: {
    elevation: 8,
    borderRadius: 20,
    marginHorizontal: 15,
    backgroundColor: 'white',
  },
  container: {
    ...GlobalStyles.center,
    height: SCREEN_HEIGHT - 20,
    marginHorizontal: 20,
  },
  summary: { ...GlobalStyles.center, textAlign: 'justify', fontWeight: '600' },
  footer: { position: 'absolute', bottom: 0, width: SCREEN_WIDTH - 30 },
  counter: { ...GlobalStyles.spaceBetween, marginBottom: 20 },
  progress: { height: 20, borderBottomEndRadius: 20, borderBottomStartRadius: 20 },
  tag: {
    ...GlobalStyles.circle,
    fontSize: Font.size(15),
    paddingHorizontal: 20,
    opacity: 0.6,
    marginHorizontal: 20,
    alignSelf: 'center',
  },
});
