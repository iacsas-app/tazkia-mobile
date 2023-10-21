import { Box, Text, VStack } from '@react-native-material/core';
import { useMemo, useState } from 'react';
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
import { orderMindLevels } from '../Helper';

interface Props {
  items: Mind[];
  onAdd: (route: keyof PurificationParamList) => void;
}

export default function MindProgress({ items, onAdd }: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const [current, setCurrent] = useState<Rule>();
  const evaluate = useStoreActions((actions) => actions.purification.evaluateMind);

  const levels = useMemo(() => orderMindLevels(items), [items]);

  function handleAddAction() {
    onAdd('Mind');
  }

  function handleDialogClose() {
    setCurrent(undefined);
  }

  function handleShowEvaluate(rule: Rule) {
    setCurrent(rule);
  }

  function handleEvaluate(level: number, checked: boolean) {
    evaluate([level as MindLevel, checked]).then(() => setCurrent(undefined));
  }

  function toRule({ level, progress }: Mind): Rule {
    return {
      id: level,
      title: formatMessage(TKeys.LEVEL, { value: level }),
      summary: formatMessage(`purification.mind.summary.level-${level}`),
      description: (
        <Text style={{ textAlign: 'justify', fontSize: arabic ? 13 : 12 }}>
          {formatMessage(`purification.mind.description.level-${level}`)}
        </Text>
      ),
      progress,
    };
  }

  return (
    <>
      <ProgressContainer
        title={formatMessage(TKeys.PURIFICATION_MIND_TITLE)}
        subtitle={formatMessage(TKeys.PHASE_2)}
        variant="orange"
        onAdd={handleAddAction}
      >
        {levels.length === 0 ? (
          <Text>No progress</Text>
        ) : (
          <VStack spacing={5}>
            {levels.map((item: Mind, index) => (
              <Box key={`mind_${index}`}>
                <RuleProgress rule={toRule(item)} maxDays={PURIFICATION_MAX_DAYS} onEvaluate={handleShowEvaluate} />
              </Box>
            ))}
          </VStack>
        )}
      </ProgressContainer>
      {current && <EvaluationDialog rule={current} onEvaluate={handleEvaluate} onClose={handleDialogClose} />}
    </>
  );
}
