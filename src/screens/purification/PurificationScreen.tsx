import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import PressableStep, { Part } from '../../components/PressableStep';
import VStack from '../../components/stack/VStack';
import GlobalStyles from '../../styles/GlobalStyles';
import { purificationStages } from './common/Helper';

export default function PurificationScreen() {
  const parts: Part[] = useMemo(() => purificationStages, []);

  return (
    <VStack style={GlobalStyles.container} spacing={25}>
      {parts.map((item: Part, index: number) => (
        <Animated.View key={index} entering={FadeInUp.delay(200 * (index * 2))} style={styles.part}>
          <PressableStep item={item} index={index} />
        </Animated.View>
      ))}
    </VStack>
  );
}

const styles = StyleSheet.create({
  part: {
    width: 250,
    paddingVertical: 10,
    backgroundColor: '#cde7f7',
    borderRadius: 25,
    elevation: 6,
  },
});
