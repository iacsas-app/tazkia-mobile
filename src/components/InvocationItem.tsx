import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { VStack } from '@react-native-material/core';
import { memo, useState } from 'react';
import { StyleSheet, ViewToken } from 'react-native';
import { Avatar } from 'react-native-paper';
import Animated, { SlideInLeft, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SCREEN_WIDTH } from '../constants/Screen';
import InvocationRepeat from '../domains/common/InvocationRepeat';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import GlobalStyles from '../styles/GlobalStyles';
import Text from './Text';
import HStack from './stack/HStack';

interface Props {
  index: number;
  total: number;
  item: InvocationRepeat;
  viewableItems: Animated.SharedValue<ViewToken[]>;
}
function InvocationItem({ index, item, total, viewableItems }: Props) {
  const [count, setCount] = useState(0);
  const { formatMessage } = useMessage();

  const animatedStyle = useAnimatedStyle(() => {
    const isLast = index > total;
    const isVisible = Boolean(
      viewableItems.value.filter((item) => item.isViewable).find((viewableItem) => viewableItem.item.key === item.key),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
      marginBottom: withTiming(isLast ? 90 : 10),
      backgroundColor: withTiming(isLast ? 'transparent' : 'white'),
      elevation: withTiming(isLast ? 0 : 14),
    };
  }, []);

  function handlePress() {
    setCount(count + 1);
  }

  return (
    <Animated.View style={[animatedStyle, styles.row]} onTouchEnd={handlePress}>
      <VStack spacing={25} style={styles.container}>
        <Text variant="titleLarge" style={styles.summary}>
          {formatMessage(item.key)}
        </Text>
        {index <= total && (
          <HStack style={GlobalStyles.spaceBetween}>
            <Text style={{ ...styles.tag, backgroundColor: '#fff5ee' }}>{`${index}/${total}`}</Text>
            <Animated.Text style={{ ...styles.tag, backgroundColor: '#92b8df' }}>
              {formatMessage(item.repeat > 1 ? TKeys.TIMES_COUNT_PLURAL : TKeys.TIMES_COUNT, { times: item.repeat })}
            </Animated.Text>
            {count > 0 && (
              <Animated.View entering={SlideInLeft.springify()}>
                {count < item.repeat ? (
                  <Avatar.Text
                    label={count.toString()}
                    size={22}
                    labelStyle={styles.counterLabel}
                    style={styles.counter}
                  />
                ) : (
                  <Animated.View entering={SlideInLeft.springify()}>
                    <Icon name="check-all" color="green" size={25} style={styles.checkIcon} />
                  </Animated.View>
                )}
              </Animated.View>
            )}
          </HStack>
        )}
      </VStack>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    ...GlobalStyles.center,
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 8,
    paddingVertical: 15,
  },
  container: { width: SCREEN_WIDTH - 80 },
  summary: { fontSize: 16, textAlign: 'justify', fontWeight: '500' },
  tag: {
    ...GlobalStyles.circle,
    fontSize: 12,
    paddingHorizontal: 20,
    opacity: 0.6,
    alignSelf: 'center',
  },
  checkIcon: { marginTop: -5 },
  counter: { backgroundColor: 'skyblue' },
  counterLabel: { color: 'white', fontSize: 14, fontWeight: '800' },
});

export default memo(InvocationItem);
