import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { HStack, VStack } from '@react-native-material/core';

import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import Text from '../../../components/Text';
import ScrollViewLayout from '../../../components/layout/ScrollViewLayout';
import SummaryRule from '../../../components/rules/SummaryRule';
import Rule from '../../../domains/common/Rule';
import Sunnahs from '../../../domains/sunnahs/Sunnahs';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { SunnahsStackNavigationProp } from '../../../navigation/types';
import { useStoreActions, useStoreState } from '../../../stores/hooks';
import GlobalStyles from '../../../styles/GlobalStyles';
import { habitsRules } from './common/data';

export default function HabitsScreen() {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const navigation = useNavigation<SunnahsStackNavigationProp>();
  const createOrUpdate = useStoreActions((actions) => actions.sunnahs.load);
  const sunnahs: Sunnahs | undefined = useStoreState((state) => state.sunnahs.item);
  const [rules, setRules] = useState<Rule[]>([]);

  const data: Rule[] = useMemo(() => Object.keys(habitsRules).map((sunnahId: string) => toRule(sunnahId)), []);

  function toRule(sunnahId: string): Rule {
    const id = Number.parseInt(sunnahId);
    const sunnahRules = habitsRules[id];
    return {
      id: Number.parseInt(sunnahId),
      title: sunnahId,
      summary: formatMessage(`sunnahs_habits_${sunnahId}_title`),
      description: (
        <VStack style={{ paddingHorizontal: 5 }}>
          {sunnahRules.map((ruleKey) => (
            <HStack spacing={5} reverse={arabic} style={GlobalStyles.centerAlign}>
              <Icon name={`chevron-double-${arabic ? 'left' : 'right'}`} size={18} color="#008000" />
              <Text style={{ fontSize: 13 }}>{formatMessage(ruleKey)}</Text>
            </HStack>
          ))}
        </VStack>
      ),
      disabled: false,
      progress: [],
      status: undefined,
    };
  }

  function handleAdd(rule: Rule) {}

  return (
    <ScrollViewLayout>
      <VStack spacing={4} style={{ ...GlobalStyles.center, paddingBottom: 10 }}>
        {data.map((rule) => (
          <View key={rule.id}>
            <SummaryRule rule={rule} onAdd={handleAdd} />
          </View>
        ))}
      </VStack>
    </ScrollViewLayout>
  );
}
