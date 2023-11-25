import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { VStack } from '@react-native-material/core';
import { useState } from 'react';
import { Animated, Pressable, View } from 'react-native';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import Text from './Text';

interface Props {
  index: number;
  total: number;
  summary: string;
  repeat: number;
}
export default function InvocationItem({ index, total, summary, repeat }: Props) {
  const [count, setCount] = useState(repeat);
  const { formatMessage } = useMessage();

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  function handlePress() {
    setCount(count - 1);
  }

  return (
    <AnimatedPressable
      style={{
        elevation: 5,
        backgroundColor: count > 0 ? 'white' : '#d9e7df',
        borderRadius: 20,
        padding: 10,
      }}
      onPress={handlePress}
    >
      <VStack spacing={25}>
        <Text variant="titleLarge" style={{ fontSize: 14, textAlign: 'justify', fontWeight: '500' }}>
          {summary}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: 10,
              position: 'absolute',
              right: 0,
              bottom: 0,
              backgroundColor: '#90ee90',
              borderRadius: 100,
              paddingHorizontal: 5,
              opacity: 0.6,
            }}
          >{`${index}/${total}`}</Text>
          {count > 0 ? (
            <Text
              style={{
                fontSize: 10,
                position: 'absolute',
                left: 0,
                bottom: 0,
                backgroundColor: '#92b8df',
                borderRadius: 100,
                paddingHorizontal: 10,
                opacity: 0.6,
              }}
            >
              {formatMessage(count > 1 ? TKeys.TIMES_COUNT_PLURAL : TKeys.TIMES_COUNT, { times: count })}
            </Text>
          ) : (
            <Icon name="check-all" color="seagreen" size={20} />
          )}
        </View>
      </VStack>
    </AnimatedPressable>
  );
}
