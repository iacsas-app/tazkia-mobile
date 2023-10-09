import { VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { View } from 'react-native';
import ScrollViewLayout from '../../../../components/layout/ScrollViewLayout';
import SummaryRule from '../../../../components/rules/SummaryRule';
import Rule from '../../../../domains/common/Rule';
import { MindLevel } from '../../../../domains/purification/Mind';
import Purification from '../../../../domains/purification/Purification';
import { useMessage } from '../../../../hooks/use-message';
import { TKeys } from '../../../../locales/constants';
import { PurificationStackNavigationProp } from '../../../../navigation/types';
import { PURIFICATION_MAX_DAYS, isCompleted } from '../../../../services/Helpers';
import { useStoreActions, useStoreState } from '../../../../stores/hooks';
import GlobalStyles from '../../../../styles/GlobalStyles';

const levels: MindLevel[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function MindScreen() {
  const { formatMessage } = useMessage();
  const createOrUpdate = useStoreActions((actions) => actions.purification.createOrUpdate);
  const navigation = useNavigation<PurificationStackNavigationProp>();
  let purification: Purification | undefined = useStoreState((state) => state.purification.item);
  const findByMind = useStoreState((state) => state.purification.findByMind);

  const items: Rule[] = useMemo(() => levels.map((level) => toRule(level)), []);

  function toRule(level: MindLevel): Rule {
    const mind = findByMind(level);

    return {
      id: level,
      title: formatMessage(TKeys.LEVEL, { value: level }),
      summary: formatMessage(`purification.mind.summary.level-${level}`),
      description: formatMessage(`purification.mind.description.level-${level}`),
      status: mind ? (isCompleted(mind.progress, PURIFICATION_MAX_DAYS) ? 'completed' : 'progress') : undefined,
    };
  }

  function handleAdd(rule: Rule) {
    if (!purification) {
      purification = { id: 0, bodyParts: [], mind: [], soul: [] };
    }
    purification.mind.push({
      level: rule.id as MindLevel,
      progress: [{ startDate: Date.now(), day: 0, evaluated: false, errors: [] }],
    });
    createOrUpdate(purification);
    navigation.push('Purification');
  }

  return (
    <ScrollViewLayout>
      <VStack spacing={6} style={{ ...GlobalStyles.center, paddingBottom: 10 }}>
        {items.map((item) => (
          <View key={item.id}>
            <SummaryRule rule={item} onAdd={handleAdd} />
          </View>
        ))}
      </VStack>
    </ScrollViewLayout>
  );
}
