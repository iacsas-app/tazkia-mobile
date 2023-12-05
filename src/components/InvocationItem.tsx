import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { VStack } from '@react-native-material/core';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import GlobalStyles from '../styles/GlobalStyles';
import Text from './Text';
import HStack from './stack/HStack';

interface Props {
  index: number;
  total: number;
  summary: string;
  repeat: number;
}
export default function InvocationItem({ index, total, summary, repeat }: Props) {
  const [count, setCount] = useState(repeat);
  const { formatMessage } = useMessage();

  function handlePress() {
    setCount(count - 1);
  }

  return (
    <TouchableRipple
      style={{ ...styles.touchable, backgroundColor: count > 0 ? 'white' : '#d9e7df' }}
      disabled={count === 0}
      onPress={handlePress}
    >
      <VStack spacing={25}>
        <Text variant="titleLarge" style={styles.summary}>
          {summary}
        </Text>
        <HStack style={styles.counter}>
          <Text style={{ ...styles.tag, backgroundColor: '#fff5ee' }}>{`${index}/${total}`}</Text>
          {count > 0 ? (
            <Animated.Text style={{ ...styles.tag, backgroundColor: '#92b8df' }}>
              {formatMessage(count > 1 ? TKeys.TIMES_COUNT_PLURAL : TKeys.TIMES_COUNT, { times: count })}
            </Animated.Text>
          ) : (
            <Icon name="check-all" color="green" size={20} />
          )}
        </HStack>
      </VStack>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  touchable: {
    elevation: 5,
    borderRadius: 20,
    padding: 15,
  },
  summary: { fontSize: 15, textAlign: 'justify', fontWeight: '500' },
  counter: { ...GlobalStyles.spaceBetween },
  tag: {
    ...GlobalStyles.circle,
    fontSize: 12,
    paddingHorizontal: 20,
    opacity: 0.6,
    alignSelf: 'center',
  },
});
