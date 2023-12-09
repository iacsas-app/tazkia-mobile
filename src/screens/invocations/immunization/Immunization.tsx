import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { memo, useState } from 'react';
import { StyleSheet, ViewToken } from 'react-native';
import { Avatar } from 'react-native-paper';
import Animated, {
  SlideInLeft,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Text from '../../../components/Text';
import HStack from '../../../components/stack/HStack';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
import { Font } from '../../../constants/Font';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';

interface Props {
  index: number;
  total: number;
  item: InvocationRepeat;
  viewableItems: Animated.SharedValue<ViewToken[]>;
  onSelect(key?: TKeys, detailsId?: number): void;
}
function Immunization({ index, item, total, viewableItems, ...props }: Props) {
  const [count, setCount] = useState(0);
  const { formatMessage } = useMessage();
  const offset = useSharedValue(0);
  const countStyle = useAnimatedStyle(() => ({ transform: [{ translateY: offset.value }] }));

  const first = index === 0;
  const last = index > total;

  const animatedStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value.filter((item) => item.isViewable).find((viewableItem) => viewableItem.item.key === item.key),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [{ scale: withTiming(isVisible ? 1 : 0.6) }],
    };
  }, []);

  function handlePress() {
    setCount(count + 1);
    offset.value = withSequence(withTiming(40), withTiming(0));
  }

  return (
    <Animated.View
      style={[
        animatedStyle,
        styles.row,
        {
          marginTop: first ? 15 : 1,
          marginBottom: last ? 90 : 10,
          backgroundColor: last ? Color.transparent : Color.partDefaultBgColor,
          elevation: last ? 1 : 14,
        },
      ]}
      onTouchEnd={handlePress}
    >
      <VStack spacing={25} style={styles.container}>
        <Text
          variant="titleLarge"
          style={{
            ...styles.summary,
            textAlign: 'justify',
            fontSize: Font.size(16),
            color: last ? Color.flatItemNoneColor : 'black',
          }}
        >
          {formatMessage(item.key)}
        </Text>
        {!first && !last && (
          <HStack style={GlobalStyles.spaceBetween}>
            <Text style={{ ...styles.tag, backgroundColor: '#fff5ee' }}>{`${index}/${total}`}</Text>
            <Animated.Text style={{ ...styles.tag, backgroundColor: Color.completed }}>
              {formatMessage(item.repeat > 1 ? TKeys.TIMES_COUNT_PLURAL : TKeys.TIMES_COUNT, { times: item.repeat })}
            </Animated.Text>
            {count > 0 && (
              <Animated.View style={countStyle}>
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
  introduction: { textAlign: 'justify', fontWeight: '600', marginTop: 10, paddingBottom: 5 },
  container: { width: SCREEN_WIDTH - 80 },
  summary: { fontWeight: '500' },
  tag: {
    ...GlobalStyles.circle,
    fontSize: Font.size(12),
    paddingHorizontal: 20,
    opacity: 0.6,
    alignSelf: 'center',
    fontWeight: '800',
  },
  checkIcon: { marginTop: -5 },
  counter: { backgroundColor: 'teal' },
  counterLabel: { color: 'white', fontSize: Font.size(14), fontWeight: '800' },
});

export default memo(Immunization);
