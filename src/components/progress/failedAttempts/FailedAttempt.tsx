import { HStack, Text } from '@react-native-material/core';
import ProgressLine from '../../../domains/common/ProgressLine';
import { FailedAttemptsBase } from '../BaseProps';

interface Props extends FailedAttemptsBase {
  attempt: ProgressLine;
  reverse: boolean;
}
export default function FailedAttempt({ attempt, reverse, attemptFormatter }: Props) {
  return (
    <HStack spacing={5} reverse={reverse}>
      <Text variant="caption" style={{ fontWeight: '500' }}>
        {attempt.startDate} :
      </Text>
      <Text variant="caption">{attemptFormatter(attempt)}</Text>
    </HStack>
  );
}
