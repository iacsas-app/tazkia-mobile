import { Box, Stack, VStack } from '@react-native-material/core';

import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { View } from 'react-native';
import Basmalah from '../../../components/Basmalah';
import Text from '../../../components/Text';
import ScrollViewLayout from '../../../components/layout/ScrollViewLayout';
import SummaryRule from '../../../components/rules/SummaryRule';
import ProgressLine from '../../../domains/common/ProgressLine';
import Rule from '../../../domains/common/Rule';
import Sunnah, { SunnahType } from '../../../domains/sunnahs/Sunnah';
import { SunnahStage } from '../../../domains/sunnahs/Sunnahs';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { SunnahsStackNavigationProp } from '../../../navigation/types';
import { SUNNAHS_MAX_DAYS, isCompleted } from '../../../services/Helpers';
import { useStoreActions, useStoreState } from '../../../stores/hooks';
import GlobalStyles from '../../../styles/GlobalStyles';
import SunnahRule from '../common/SunnahRule';

interface Props {
  stage: SunnahStage;
  rules: Record<number, Record<SunnahType, string[]>>;
}
export default function SunnahStageContainer({ stage, rules }: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const navigation = useNavigation<SunnahsStackNavigationProp>();
  const createOrUpdate = useStoreActions((actions) => actions.sunnahs.createOrUpdate);
  const findByIdForStage = useStoreState((state) => state.sunnahs.findByIdForStage);

  const data: Rule[] = useMemo(() => Object.keys(rules).map((sunnahId: string) => toRule(sunnahId)), []);

  function toRule(sunnahId: string): Rule {
    const id = Number.parseInt(sunnahId);
    const currentRules = rules[id];
    const verbals = currentRules.verbal;
    const actionals = currentRules.actional;
    const current = findByIdForStage(stage, id);
    const inProgress = current !== undefined;
    const completed = current ? isCompleted(current.progress, SUNNAHS_MAX_DAYS) : false;

    return {
      id: Number.parseInt(sunnahId),
      title: sunnahId,
      summary: formatMessage(`sunnahs.${stage}.${sunnahId}.title`),
      description: <SunnahRule verbals={verbals} actionals={actionals} arabic={arabic} />,
      disabled: inProgress,
      progress: [],
      status: completed ? 'completed' : inProgress ? 'progress' : undefined,
    };
  }

  function handleAdd(rule: Rule) {
    const firstDay: ProgressLine = { day: 0, errors: [], evaluated: false, startDate: Date.now() };
    const sunnah: Sunnah = { id: rule.id, progress: [firstDay] };
    createOrUpdate([stage, sunnah]);
    navigation.navigate('Sunnahs', { rule: rule.summary });
  }

  return (
    <ScrollViewLayout>
      <Stack
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Box ph={7}>
            <Basmalah />
            <Text
              style={{
                marginBottom: 15,
                fontSize: arabic ? 14 : 13,
                fontWeight: arabic ? '600' : 'normal',
                textAlign: 'justify',
              }}
            >
              {formatMessage(`sunnahs.${stage}.introduction`)}
            </Text>
          </Box>
          <VStack spacing={4} style={{ ...GlobalStyles.center, paddingBottom: 10 }}>
            {data.map((rule) => (
              <View key={rule.id}>
                <SummaryRule rule={rule} onAdd={handleAdd} />
              </View>
            ))}
          </VStack>
        </Box>
      </Stack>
    </ScrollViewLayout>
  );
}
