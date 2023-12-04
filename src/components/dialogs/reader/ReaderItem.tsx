import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar, TouchableRipple } from 'react-native-paper';
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from 'react-native-reanimated';
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
};
export default function ReaderItem({ index, total, value, ...props }: ReaderItemProps) {
  const [count, setCount] = useState(value.repeat);
  const { formatMessage } = useMessage();

  function handlePress() {
    if (count > 0) {
      setCount((prev) => {
        if (prev === 1) {
          props.onDone();
        }
        return prev - 1;
      });
    }
  }

  useEffect(() => {
    setCount(value.repeat);
  }, [value]);

  if (count === 0) {
    return <></>;
  }

  return (
    <Animated.View entering={SlideInRight.duration(200).springify()} exiting={SlideOutLeft.duration(200).mass(100)}>
      <TouchableRipple style={styles.touchable} onPress={handlePress}>
        <VStack style={styles.container}>
          <Text variant="titleLarge" style={styles.summary}>
            {formatMessage(value.key)}
          </Text>
          <View style={styles.footer}>
            <HStack style={styles.counter}>
              <Animated.Text
                style={{ ...styles.tag, backgroundColor: '#92b8df', opacity: 0.8 }}
                entering={SlideInLeft.delay(100).duration(100).springify()}
                exiting={SlideOutRight.delay(100).springify()}
              >
                {formatMessage(count > 1 ? TKeys.TIMES_COUNT_PLURAL : TKeys.TIMES_COUNT, { times: count })}
              </Animated.Text>
              <Text style={{ ...styles.tag, backgroundColor: '#fff5ee' }}>{`${index}/${total}`}</Text>
            </HStack>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 20,
    backgroundColor: 'white',
  },
  container: {
    ...GlobalStyles.center,
    height: SCREEN_HEIGHT - 220,
    marginHorizontal: 30,
  },
  summary: { ...GlobalStyles.center, textAlign: 'justify', fontWeight: '700' },
  footer: { position: 'absolute', bottom: 0, width: SCREEN_WIDTH - 40 },
  counter: { ...GlobalStyles.spaceBetween, marginBottom: 20 },
  progress: { height: 20 },
  tag: {
    fontSize: 15,
    borderRadius: 100,
    paddingHorizontal: 20,
    opacity: 0.6,
    marginHorizontal: 20,
  },
});
