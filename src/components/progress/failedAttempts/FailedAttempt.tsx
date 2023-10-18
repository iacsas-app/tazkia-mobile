import { HStack } from '@react-native-material/core';
import ProgressLine from '../../../domains/common/ProgressLine';
import { useMessage } from '../../../hooks/use-message';
import Text from '../../Text';
import { FailedAttemptsBase } from '../BaseProps';

interface Props extends FailedAttemptsBase {
  attempt: ProgressLine;
}
export default function FailedAttempt({ attempt, attemptFormatter }: Props) {
  const { intl } = useMessage();

  return (
    <HStack spacing={5}>
      <Text variant="caption" style={{ fontWeight: '500' }}>
        {intl.formatDate(attempt.startDate)} :
      </Text>
      <Text variant="caption">{attemptFormatter(attempt)}</Text>
    </HStack>
  );
}
