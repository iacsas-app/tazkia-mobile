import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { HStack, VStack } from '@react-native-material/core';

import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import Text from '../../../components/Text';
import ScrollViewLayout from '../../../components/layout/ScrollViewLayout';
import SummaryRule from '../../../components/rules/SummaryRule';
import ProgressLine from '../../../domains/common/ProgressLine';
import Rule from '../../../domains/common/Rule';
import Sunnah from '../../../domains/sunnahs/Sunnah';
import Sunnahs from '../../../domains/sunnahs/Sunnahs';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
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
    return {
      id: Number.parseInt(sunnahId),
      title: sunnahId,
      summary: formatMessage(`sunnahs.habits.${sunnahId}.title`),
      description: (
        <VStack style={{ paddingHorizontal: 5 }}>
          {habitsRules[id].map((ruleKey) => (
            <HStack key={ruleKey} spacing={5} style={GlobalStyles.centerAlign}>
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

  function handleAdd(rule: Rule) {
    const firstDay: ProgressLine = { day: 1, errors: [], evaluated: false, startDate: Date.now() };
    const sunnah: Sunnah = { id: rule.id, progress: [firstDay] };
    const sunnahs: Sunnahs = { habits: [sunnah], worship: [], truths: [] };
    createOrUpdate(sunnahs);
    navigation.navigate('Sunnahs');
  }

  return (
    <ScrollViewLayout>
      <Text
        style={{
          marginBottom: 20,
          fontSize: arabic ? 14 : 13,
          fontWeight: arabic ? '600' : 'normal',
          textAlign: 'justify',
        }}
      >
        {formatMessage(TKeys.SUNNAHS_HABITS_INTRODUCTION)}
      </Text>

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
