import { VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
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
  const navigation = useNavigation<PurificationStackNavigationProp>();
  const createOrUpdate = useStoreActions((actions) => actions.purification.load);
  const purification: Purification | undefined = useStoreState((state) => state.purification.item);
  const findByMind = useStoreState((state) => state.purification.findByMind);
  const lastMindLevel = useStoreState((state) => state.purification.lastMindLevel);

  const [rules, setRules] = useState<Rule[]>([]);

  function toRule(level: MindLevel, last: MindLevel | undefined, isLastCompleted: boolean): Rule {
    const mind = findByMind(level);

    if (last)
      console.log(
        'level !== last + 1',
        level !== last + 1,
        'isLastCompleted',
        isLastCompleted,
        level !== last + 1 && isLastCompleted,
      );

    return {
      id: level,
      title: formatMessage(TKeys.LEVEL, { value: level }),
      summary: formatMessage(`purification.mind.summary.level-${level}`),
      description: formatMessage(`purification.mind.description.level-${level}`),
      disabled: last ? level !== last + 1 && !isLastCompleted : level !== 1,
      progress: mind ? mind.progress : [],
      status: mind ? (isCompleted(mind.progress, PURIFICATION_MAX_DAYS) ? 'completed' : 'progress') : undefined,
    };
  }

  function handleAdd(rule: Rule) {
    let newPurif = purification;
    if (!newPurif) {
      newPurif = { id: 0, bodyParts: [], mind: [], soul: [] };
    }
    if (newPurif.mind.find((mind) => mind.level === rule.id)) {
      return;
    }
    const result = [
      ...newPurif.mind,
      {
        level: rule.id as MindLevel,
        progress: [{ startDate: Date.now(), day: 0, evaluated: false, errors: [] }],
      },
    ];
    newPurif.mind = result; //, orderMindLevels(result);
    createOrUpdate(newPurif);
    setRules(
      rules.map((r) => {
        if (r.id === rule.id) {
          r.disabled = true;
          r.status = 'progress';
        }
        if (r.id === rule.id + 1) {
          r.disabled = false;
        }
        return r;
      }),
    );
    navigation.push('Purification');
  }

  useEffect(() => {
    const last = lastMindLevel();
    const isLastCompleted = last ? isCompleted(last.progress, PURIFICATION_MAX_DAYS) : false;
    const rules = levels.map((level) => toRule(level, last?.level, isLastCompleted));
    setRules(rules);
  }, [purification]);

  return (
    <ScrollViewLayout>
      <VStack spacing={4} style={{ ...GlobalStyles.center, paddingBottom: 10 }}>
        {rules.map((rule) => (
          <View key={rule.id}>
            <SummaryRule rule={rule} onAdd={handleAdd} />
          </View>
        ))}
      </VStack>
    </ScrollViewLayout>
  );
}
