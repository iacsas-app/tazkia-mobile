import { useMemo, useState } from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';
import EmptyList from '../../../../../components/EmptyList';
import EvaluationDialog from '../../../../../components/EvaluationDialog';
import ProgressBar from '../../../../../components/ProgressBar';
import Text from '../../../../../components/Text';
import ProgressContainer from '../../../../../components/progress/ProgressContainer';
import RuleProgress from '../../../../../components/progress/RuleProgress';
import VStack from '../../../../../components/stack/VStack';
import Rule from '../../../../../domains/common/Rule';
import Mind, { MindLevel } from '../../../../../domains/purification/Mind';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { PurificationParamList } from '../../../../../navigation/types';
import { PURIFICATION_MAX_DAYS, isCompleted } from '../../../../../services/Helpers';
import { useStoreActions } from '../../../../../stores/hooks';
import { orderMindLevels } from '../helpers/Helper';

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
        <Text variant="bodyLarge" style={{ textAlign: 'justify', fontSize: arabic ? 13 : 12 }}>
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
        variant="blue"
        onAdd={handleAddAction}
      >
        {levels.length === 0 ? (
          <EmptyList />
        ) : (
          <VStack spacing={5}>
            {levels.map((item: Mind, index) => {
              const completed = isCompleted(item.progress, PURIFICATION_MAX_DAYS);
              const last = item.progress[item.progress.length - 1];
              return (
                <Animated.View key={`mind_${index}`} entering={FadeInUp.delay(200 * index)}>
                  <RuleProgress
                    rule={toRule(item)}
                    maxDays={PURIFICATION_MAX_DAYS}
                    isCompleted={completed}
                    onEvaluate={handleShowEvaluate}
                  />
                  {!completed && <ProgressBar day={last.day} maxDays={PURIFICATION_MAX_DAYS} />}
                </Animated.View>
              );
            })}
          </VStack>
        )}
      </ProgressContainer>
      {current && <EvaluationDialog rule={current} onEvaluate={handleEvaluate} onClose={handleDialogClose} />}
    </>
  );
}
