import { Box, Text, VStack } from '@react-native-material/core';
import { ReactNode, useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import EvaluationDialog from '../../../components/EvaluationDialog';
import ScrollViewLayout from '../../../components/layout/ScrollViewLayout';
import RuleProgress from '../../../components/progress/RuleProgress';
import Rule from '../../../domains/common/Rule';
import Sunnah from '../../../domains/sunnahs/Sunnah';
import { SunnahStage } from '../../../domains/sunnahs/Sunnahs';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { SunnahsParamList } from '../../../navigation/types';
import { useSnackbar } from '../../../providers/SnackbarProvider';
import { SUNNAHS_MAX_DAYS } from '../../../services/Helpers';
import { useStoreActions } from '../../../stores/hooks';
import GlobalStyles from '../../../styles/GlobalStyles';

interface Props {
  stage: SunnahStage;
  index: number;
  items: Sunnah[];
  summaryFormatter: (id: number) => string;
  descriptionFormatter: (sunnah: Sunnah) => ReactNode;
  onAdd: (route: keyof SunnahsParamList) => void;
}

export default function SunnahStepProgress({ stage, index, items, ...props }: Props) {
  const { formatMessage } = useMessage();
  const { displaySnackbar } = useSnackbar();
  const [current, setCurrent] = useState<Rule>();
  const evaluate = useStoreActions((actions) => actions.sunnahs.evaluate);

  function toRule(sunnah: Sunnah): Rule {
    const { id, progress } = sunnah;
    return {
      id,
      title: id.toString(),
      summary: props.summaryFormatter(id),
      description: props.descriptionFormatter(sunnah),
      progress,
    };
  }

  function handleStartEvaluate(rule: Rule): void {
    setCurrent(rule);
  }

  function handleDialogClose() {
    setCurrent(undefined);
  }

  function handleEvaluate(ruleId: number, checked: boolean) {
    if (stage) {
      evaluate([ruleId, stage, checked]).then(() => {
        setCurrent(undefined);
      });
      displaySnackbar(formatMessage(TKeys.MESSAGE_EVALUATED_SUCCESSFULLY), 'success');
    }
  }

  return (
    <View style={GlobalStyles.center}>
      <ScrollViewLayout>
        <Text variant="h5">{formatMessage(`sunnahs.${stage}.title`)}</Text>
        <Box mt={20}>
          {items.length === 0 ? (
            <Text>No progress</Text>
          ) : (
            <VStack spacing={5}>
              {items.map((item: Sunnah, index) => (
                <Box key={`${stage}_${index}`}>
                  <RuleProgress rule={toRule(item)} maxDays={SUNNAHS_MAX_DAYS} onEvaluate={handleStartEvaluate} />
                </Box>
              ))}
            </VStack>
          )}
        </Box>

        {current && <EvaluationDialog rule={current} onEvaluate={handleEvaluate} onClose={handleDialogClose} />}
      </ScrollViewLayout>
      <FAB icon="playlist-plus" style={styles.fab} variant="tertiary" onPress={() => props.onAdd(stage as any)} />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 15,
    justifyContent: 'center',
  },
});
