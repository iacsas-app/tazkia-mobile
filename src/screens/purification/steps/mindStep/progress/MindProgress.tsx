import { Box, Text, VStack } from '@react-native-material/core';
import { useState } from 'react';
import EvaluationDialog from '../../../../../components/EvaluationDialog';
import ProgressContainer from '../../../../../components/progress/ProgressContainer';
import RuleProgress from '../../../../../components/progress/RuleProgress';
import Rule from '../../../../../domains/common/Rule';
import Mind, { MindLevel } from '../../../../../domains/purification/Mind';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { PurificationParamList } from '../../../../../navigation/types';
import { PURIFICATION_MAX_DAYS } from '../../../../../services/Helpers';
import { useStoreActions } from '../../../../../stores/hooks';

interface Props {
  items: Mind[];
  onAdd: (route: keyof PurificationParamList) => void;
}

export default function MindProgress({ items, onAdd }: Props) {
  const { arabic } = useApplication();
  const { formatMessage } = useMessage();
  const [current, setCurrent] = useState<Rule>();
  const evaluate = useStoreActions((actions) => actions.purification.evaluateMind);

  function handleAddAction() {
    onAdd('Mind');
  }

  function handleDialogClose() {
    setCurrent(undefined);
  }

  function handleShowEvaluate(rule: Rule) {
    setCurrent(rule);
  }

  function handleEvaluate(level: MindLevel, checked: boolean) {
    evaluate([level, checked]).then(() => setCurrent(undefined));
  }

  function toRule({ level, progress }: Mind): Rule {
    return {
      id: level,
      title: formatMessage(TKeys.LEVEL, { value: level }),
      summary: formatMessage(`purification.mind.summary.level-${level}`),
      description: formatMessage(`purification.mind.description.level-${level}`),
      progress,
    };
  }

  return (
    <>
      <ProgressContainer
        title={formatMessage(TKeys.PURIFICATION_MIND_TITLE)}
        subtitle={formatMessage(TKeys.PHASE_2)}
        variant="green"
        onAdd={handleAddAction}
      >
        {items.length === 0 ? (
          <Text>No mind puirificatio in progress</Text>
        ) : (
          <VStack spacing={5} reverse={arabic}>
            {items.map((item: Mind, index) => (
              <Box key={`mind_${index}`}>
                <RuleProgress rule={toRule(item)} maxDays={PURIFICATION_MAX_DAYS} onEvaluate={handleShowEvaluate} />
              </Box>
            ))}
          </VStack>
        )}
      </ProgressContainer>
      <EvaluationDialog rule={current} onEvaluate={handleEvaluate} onClose={handleDialogClose} />
    </>
  );
}
