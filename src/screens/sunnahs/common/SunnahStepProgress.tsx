import { Box, VStack } from '@react-native-material/core';
import { ReactNode, useState } from 'react';

import { MD3Colors, ProgressBar } from 'react-native-paper';
import EmptyList from '../../../components/EmptyList';
import EvaluationDialog from '../../../components/EvaluationDialog';
import ProgressContainer from '../../../components/progress/ProgressContainer';
import RuleProgress from '../../../components/progress/RuleProgress';
import Rule from '../../../domains/common/Rule';
import Sunnah from '../../../domains/sunnahs/Sunnah';
import { SunnahStage } from '../../../domains/sunnahs/Sunnahs';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { SunnahsParamList } from '../../../navigation/types';
import { useSnackbar } from '../../../providers/SnackbarProvider';
import { SUNNAHS_MAX_DAYS, isCompleted, percentage } from '../../../services/Helpers';
import { useStoreActions } from '../../../stores/hooks';

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

  function handleAdd() {
    props.onAdd(stage as any);
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
    <ProgressContainer title={formatMessage(`sunnahs.${stage}.title`)} variant="green" onAdd={handleAdd}>
      {items.length === 0 ? (
        <EmptyList />
      ) : (
        <VStack spacing={5}>
          {items.map((item: Sunnah, index) => {
            const completed = isCompleted(item.progress, SUNNAHS_MAX_DAYS);
            const last = item.progress[item.progress.length - 1];
            return (
              <Box key={`${stage}_${index}`}>
                <RuleProgress
                  rule={toRule(item)}
                  maxDays={SUNNAHS_MAX_DAYS}
                  isCompleted={completed}
                  onEvaluate={handleStartEvaluate}
                />
                {!completed && (
                  <ProgressBar progress={percentage(last.day, SUNNAHS_MAX_DAYS) / 100} color={MD3Colors.primary70} />
                )}
              </Box>
            );
          })}
        </VStack>
      )}
      {current && <EvaluationDialog rule={current} onEvaluate={handleEvaluate} onClose={handleDialogClose} />}
    </ProgressContainer>
  );
}
