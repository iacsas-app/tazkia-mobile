import { Box, Text, VStack } from '@react-native-material/core';
import ProgressContainer from '../../../../../components/progress/ProgressContainer';
import RuleProgress from '../../../../../components/progress/RuleProgress';
import RuleResult from '../../../../../domains/common/RuleResult';
import Mind from '../../../../../domains/purification/Mind';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { PurificationParamList } from '../../../../../navigation/types';
import { PURIFICATION_MAX_DAYS } from '../../../../../services/Helpers';
import { useStoreState } from '../../../../../stores/hooks';

interface MindProgressProps {
  items: Mind[];
  onAdd: (route: keyof PurificationParamList) => void;
}

export default function MindProgress({ items, onAdd }: MindProgressProps) {
  const { arabic } = useApplication();
  const { formatMessage } = useMessage();
  const purification = useStoreState((state) => state.purification.item);

  function handleAddAction() {
    onAdd('Mind');
  }

  function handleEvaluate(checked: boolean) {}

  function toRule({ level, progress }: Mind): RuleResult {
    return {
      id: level,
      title: formatMessage(TKeys.LEVEL, { value: level }),
      summary: formatMessage(`purification.mind.summary.level-${level}`),
      description: formatMessage(`purification.mind.description.level-${level}`),
      progress,
    };
  }

  return (
    <ProgressContainer
      title={formatMessage(TKeys.PURIFICATION_MIND_TITLE)}
      subtitle={formatMessage(TKeys.PHASE_2)}
      variant="green"
      onAdd={handleAddAction}
    >
      {!purification || purification.mind.length === 0 ? (
        <Text>No mind puirificatio in progress</Text>
      ) : (
        <VStack spacing={5} reverse={arabic}>
          {purification.mind.map((item: Mind, index) => (
            <Box key={`mind_${index}`}>
              <RuleProgress rule={toRule(item)} maxDays={PURIFICATION_MAX_DAYS} onEvaluate={handleEvaluate} />
            </Box>
          ))}
        </VStack>
      )}
    </ProgressContainer>
  );
}
