import { VStack } from '@react-native-material/core';
import { useMemo } from 'react';
import { View } from 'react-native';
import ScrollViewLayout from '../../../../components/layout/ScrollViewLayout';
import { MindLevel } from '../../../../domains/purification/Mind';
import GlobalStyles from '../../../../styles/GlobalStyles';
import MindItem from './MindItem';

export default function MindScreen() {
  const levels: MindLevel[] = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9], []);

  return (
    <ScrollViewLayout>
      <VStack spacing={6} style={{ ...GlobalStyles.center, paddingBottom: 10 }}>
        {levels.map((level) => (
          <View key={level}>
            <MindItem level={level} onAdd={() => {}} />
          </View>
        ))}
      </VStack>
    </ScrollViewLayout>
  );
}
