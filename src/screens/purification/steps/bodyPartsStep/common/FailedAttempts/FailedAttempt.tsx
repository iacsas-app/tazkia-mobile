import { HStack, Text } from '@react-native-material/core';
import ProgressLine from '../../../../../../domains/common/ProgressLine';

interface Props {
  attempt: ProgressLine;
}
export default function FailedAttempt({ attempt }: Props) {
  return (
    <HStack spacing={5}>
      <Text variant="caption" style={{ fontWeight: '500' }}>
        {attempt.startDate} :
      </Text>
      <Text variant="caption">
        Violation of rule ({attempt.errors}) on day {attempt.day}
      </Text>
    </HStack>
  );
}
