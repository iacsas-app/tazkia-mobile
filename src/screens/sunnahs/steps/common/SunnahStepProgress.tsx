import { Box, Text, VStack } from '@react-native-material/core';
import { ReactNode, useState } from 'react';

import EvaluationDialog from '../../../../components/EvaluationDialog';
import ProgressContainer from '../../../../components/progress/ProgressContainer';
import RuleProgress from '../../../../components/progress/RuleProgress';
import Rule from '../../../../domains/common/Rule';
import { MindLevel } from '../../../../domains/purification/Mind';
import Sunnah from '../../../../domains/sunnahs/Sunnah';
import { SunnahsType } from '../../../../domains/sunnahs/Sunnahs';
import { useMessage } from '../../../../hooks/use-message';
import { SunnahsParamList } from '../../../../navigation/types';
import { SUNNAHS_MAX_DAYS } from '../../../../services/Helpers';
import { useStoreActions } from '../../../../stores/hooks';

interface Props {
  part: SunnahsType;
  index: number;
  items: Sunnah[];
  summaryFormatter: (id: number) => string;
  descriptionFormatter: (sunnah: Sunnah) => ReactNode;
  onAdd: (route: keyof SunnahsParamList) => void;
}

export default function SunnahStepProgress({ part, index, items, ...props }: Props) {
  const { formatMessage } = useMessage();
  const [current, setCurrent] = useState<Rule>();
  const evaluate = useStoreActions((actions) => actions.purification.evaluateMind);

  function handleAddAction() {
    props.onAdd(part as any);
  }

  function handleDialogClose() {
    setCurrent(undefined);
  }

  function handleShowEvaluate(rule: Rule) {
    setCurrent(rule);
  }

  function handleEvaluate(level: MindLevel, checked: boolean) {
    // evaluate([level, checked]).then(() => setCurrent(undefined));
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

  return (
    <>
      <ProgressContainer
        title={formatMessage(`sunnahs.${part}.title`)}
        subtitle={formatMessage(`phase${index}`)}
        variant="green"
        onAdd={handleAddAction}
      >
        {items.length === 0 ? (
          <Text>No progress</Text>
        ) : (
          <VStack spacing={5}>
            {items.map((item: Sunnah, index) => (
              <Box key={`sunnah_${part}_${index}`}>
                <RuleProgress rule={toRule(item)} maxDays={SUNNAHS_MAX_DAYS} onEvaluate={handleShowEvaluate} />
              </Box>
            ))}
          </VStack>
        )}
      </ProgressContainer>
      <EvaluationDialog rule={current} onEvaluate={handleEvaluate} onClose={handleDialogClose} />
    </>
  );
}
