import { Box, Text, VStack } from '@react-native-material/core';
import { ReactNode } from 'react';

import ProgressContainer from '../../../components/progress/ProgressContainer';
import RuleProgress from '../../../components/progress/RuleProgress';
import Rule from '../../../domains/common/Rule';
import Sunnah from '../../../domains/sunnahs/Sunnah';
import { SunnahStage } from '../../../domains/sunnahs/Sunnahs';
import { useMessage } from '../../../hooks/use-message';
import { SunnahsParamList } from '../../../navigation/types';
import { SUNNAHS_MAX_DAYS } from '../../../services/Helpers';

interface Props {
  stage: SunnahStage;
  index: number;
  items: Sunnah[];
  summaryFormatter: (id: number) => string;
  descriptionFormatter: (sunnah: Sunnah) => ReactNode;
  onAdd: (route: keyof SunnahsParamList) => void;
  onShowEvaluate: (rule: Rule, stage: SunnahStage) => void;
}

export default function SunnahStepProgress({ stage, index, items, ...props }: Props) {
  const { formatMessage } = useMessage();

  function handleAddAction() {
    props.onAdd(stage as any);
  }

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
    props.onShowEvaluate(rule, stage);
  }

  return (
    <ProgressContainer
      title={formatMessage(`sunnahs.${stage}.title`)}
      subtitle={formatMessage(`phase${index}`)}
      variant="green"
      onAdd={handleAddAction}
    >
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
    </ProgressContainer>
  );
}
