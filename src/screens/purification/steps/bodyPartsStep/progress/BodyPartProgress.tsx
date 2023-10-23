import { useNavigation } from '@react-navigation/native';
import ProgressStatusContainer from '../../../../../components/progress/progressStatus/ProgressStatusContainer';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { BodyPartEvaluationNavigationProp } from '../../../../../navigation/types';
import { PurificationStep as PurificationPhase } from '../BodyPartsScreen';

interface BodyPartProgressProps {
  part: BodyPartType;
  step: PurificationPhase;
  lines: ProgressLine[];
}
export default function BodyPartProgress({ part, step, lines }: BodyPartProgressProps) {
  const { formatMessage } = useMessage();
  const navigation = useNavigation<BodyPartEvaluationNavigationProp>();
  const last = lines.at(lines.length - 1);
  const isCleaning = step === 'cleaning';

  if (!last) {
    return <></>;
  }

  function formatAttempt(line: ProgressLine) {
    return formatMessage(TKeys.PROGRESS_FAILED_ATTEMPTS_RULE, { rules: JSON.stringify(line.errors), day: line.day });
  }

  function handleEvaluate() {
    navigation.navigate('BodyPartEvaluation', { part, step: step });
  }

  return (
    <ProgressStatusContainer
      title={formatMessage(`purification.bodypart.${step}`)}
      lines={lines}
      maxDays={30}
      iconName={isCleaning ? 'account-tie-hat' : 'lightbulb-on'}
      iconColor={isCleaning ? 'blue' : '#5f9ea0'}
      backgroundColor={isCleaning ? '#add8e6' : '#f5fffa'}
      attemptFormatter={formatAttempt}
      onEvaluate={handleEvaluate}
    />
  );
}
