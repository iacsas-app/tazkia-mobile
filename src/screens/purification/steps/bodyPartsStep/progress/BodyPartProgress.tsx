import { useEffect, useState } from 'react';
import ProgressStatusContainer from '../../../../../components/progress/progressStatus/ProgressStatusContainer';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { useStoreState } from '../../../../../stores/hooks';
import { PurificationStage as PurificationPhase } from '../tabs/HomeScreen';

interface BodyPartProgressProps {
  type: BodyPartType;
  stage: PurificationPhase;
  onShowEvaluate: (part: BodyPartType, step: PurificationPhase) => void;
}
export default function BodyPartProgress({ type, stage, onShowEvaluate }: BodyPartProgressProps) {
  const { formatMessage } = useMessage();
  const [lines, setLines] = useState<ProgressLine[]>([]);
  const findByPartTypeAndStage = useStoreState((actions) => actions.purification.findByPartTypeAndStage);
  const isCleaning = stage === 'cleaning';

  function formatAttempt(line: ProgressLine) {
    return formatMessage(TKeys.PROGRESS_FAILED_ATTEMPTS_RULE, { rules: JSON.stringify(line.errors), day: line.day });
  }

  function handleEvaluate() {
    onShowEvaluate(type, stage);
  }

  useEffect(() => {
    const result = findByPartTypeAndStage(type, stage);
    if (result) {
      setLines(result);
    }
  });

  const last = lines.at(lines.length - 1);
  if (!last) {
    return <></>;
  }

  return (
    <ProgressStatusContainer
      title={formatMessage(`purification.bodypart.${stage}`)}
      lines={lines}
      last={last}
      maxDays={30}
      iconName={isCleaning ? 'account-tie-hat' : 'lightbulb-on'}
      iconColor={isCleaning ? 'blue' : '#5f9ea0'}
      backgroundColor={isCleaning ? '#add8e6' : '#f5fffa'}
      attemptFormatter={formatAttempt}
      onEvaluate={handleEvaluate}
    />
  );
}
