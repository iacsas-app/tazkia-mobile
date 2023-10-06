import { VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { View } from 'react-native';
import ScrollViewLayout from '../../../../components/layout/ScrollViewLayout';
import { MindLevel } from '../../../../domains/purification/Mind';
import Purification from '../../../../domains/purification/Purification';
import { PurificationStackNavigationProp } from '../../../../navigation/types';
import { useStoreActions, useStoreState } from '../../../../stores/hooks';
import GlobalStyles from '../../../../styles/GlobalStyles';
import MindItem from './MindItem';

export default function MindScreen() {
  const levels: MindLevel[] = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9], []);
  const createOrUpdate = useStoreActions((actions) => actions.purification.createOrUpdate);
  const navigation = useNavigation<PurificationStackNavigationProp>();

  let purification: Purification | undefined = useStoreState((state) => state.purification.item);

  function handleAdd(level: MindLevel) {
    if (!purification) {
      purification = { id: 0, bodyParts: [], mind: [], soul: [] };
    }
    purification.mind.push({ level, progress: [{ startDate: Date.now(), day: 0, evaluated: false, errors: [] }] });
    createOrUpdate(purification);
    navigation.push('Purification');
  }

  return (
    <ScrollViewLayout>
      <VStack spacing={6} style={{ ...GlobalStyles.center, paddingBottom: 10 }}>
        {levels.map((level) => (
          <View key={level}>
            <MindItem level={level} onAdd={handleAdd} />
          </View>
        ))}
      </VStack>
    </ScrollViewLayout>
  );
}
