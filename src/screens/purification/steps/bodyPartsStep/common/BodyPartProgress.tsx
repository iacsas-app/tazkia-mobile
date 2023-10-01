import { useNavigation } from '@react-navigation/native';
import ProgressStatusContainer from '../../../../../components/progress/progressStatus/ProgressStatusContainer';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { BodyPartEvaluationNavigationProp } from '../../../../../navigation/types';
import { PurificationType } from '../BodyPartsScreen';

interface BodyPartProgressProps {
  part: BodyPartType;
  type: PurificationType;
  lines: ProgressLine[];
}
export default function BodyPartProgress({ part, type, lines }: BodyPartProgressProps) {
  const { formatMessage, intl } = useMessage();
  const navigation = useNavigation<BodyPartEvaluationNavigationProp>();
  const last = lines.at(lines.length - 1);
  const isPurification = type === 'purification';

  if (!last) {
    return <></>;
  }
  const title = formatMessage('step', { name: formatMessage(`button.${type}`).toLowerCase() });

  function formatAttempt(line: ProgressLine) {
    return formatMessage(TKeys.PROGRESS_FAILED_ATTEMPTS_RULE, { rules: JSON.stringify(line.errors), day: line.day });
  }

  function handlePress() {
    navigation.navigate('BodyPartEvaluation', { partType: part, mode: type });
  }

  return (
    <ProgressStatusContainer
      title={title}
      iconName={isPurification ? 'account-tie-hat' : 'lightbulb-on'}
      iconColor={isPurification ? 'blue' : '#5f9ea0'}
      backgroundColor={isPurification ? '#add8e6' : '#f5fffa'}
      lines={lines}
      maxDays={30}
      attemptFormatter={formatAttempt}
    />
  );
}
