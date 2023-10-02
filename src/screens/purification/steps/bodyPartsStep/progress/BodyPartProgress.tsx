import { useNavigation } from '@react-navigation/native';
import ProgressStatusContainer from '../../../../../components/progress/progressStatus/ProgressStatusContainer';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { BodyPartEvaluationNavigationProp } from '../../../../../navigation/types';
import { PurificationStep } from '../BodyPartsScreen';

interface BodyPartProgressProps {
  part: BodyPartType;
  step: PurificationStep;
  lines: ProgressLine[];
}
export default function BodyPartProgress({ part, step, lines }: BodyPartProgressProps) {
  const { formatMessage } = useMessage();
  const navigation = useNavigation<BodyPartEvaluationNavigationProp>();
  const last = lines.at(lines.length - 1);
  const isPurification = step === 'cleaning';

  if (!last) {
    return <></>;
  }
  const title = formatMessage('step', { name: formatMessage(`button.${step}`).toLowerCase() });

  function formatAttempt(line: ProgressLine) {
    return formatMessage(TKeys.PROGRESS_FAILED_ATTEMPTS_RULE, { rules: JSON.stringify(line.errors), day: line.day });
  }

  function handleEvaluate() {
    navigation.navigate('BodyPartEvaluation', { part, step: step });
  }

  return (
    <ProgressStatusContainer
      title={title}
      lines={lines}
      maxDays={30}
      iconName={isPurification ? 'account-tie-hat' : 'lightbulb-on'}
      iconColor={isPurification ? 'blue' : '#5f9ea0'}
      backgroundColor={isPurification ? '#add8e6' : '#f5fffa'}
      attemptFormatter={formatAttempt}
      onEvaluate={handleEvaluate}
    />
  );
}
