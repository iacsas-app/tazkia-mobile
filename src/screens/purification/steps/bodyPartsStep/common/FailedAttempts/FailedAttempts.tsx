import { Box } from '@react-native-material/core';
import ProgressLine from '../../../../../../domains/common/ProgressLine';
import FailedAttempt from './FailedAttempt';

interface Props {
  attempts: ProgressLine[];
}
export default function FailedAttempts({ attempts }: Props) {
  return (
    <Box>
      {[...attempts].map((line: ProgressLine, index: number) => (
        <FailedAttempt attempt={line} key={index} />
      ))}
    </Box>
  );
}
