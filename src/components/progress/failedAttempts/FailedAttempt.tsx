import { HStack, Text } from '@react-native-material/core';
import ProgressLine from '../../../domains/common/ProgressLine';
import { useMessage } from '../../../hooks/use-message';
import { FailedAttemptsBase } from '../BaseProps';

interface Props extends FailedAttemptsBase {
  attempt: ProgressLine;
  reverse: boolean;
}
export default function FailedAttempt({ attempt, reverse, attemptFormatter }: Props) {
  const { intl } = useMessage();

  return (
    <HStack spacing={5} reverse={reverse}>
      <Text variant="caption" style={{ fontWeight: '500' }}>
        {intl.formatDate(attempt.startDate)} :
      </Text>
      <Text variant="caption">{attemptFormatter(attempt)}</Text>
    </HStack>
  );
}
