import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Box, HStack } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import ProgressLine from '../../../domains/common/ProgressLine';
import { progressPercentage } from '../../../services/Helpers';
import GlobalStyles from '../../../styles/GlobalStyles';
import Text from '../../Text';
import RepeatCount from '../RepeatCount';

interface Props {
  last: ProgressLine | undefined;
  count: number;
  maxDays: number;
  completed: boolean;
}
export function ProgressStatus({ last, count, maxDays, completed }: Props) {
  if (!last) {
    return <></>;
  }
  const failed = last.failedAttempts ? last.failedAttempts : 0;

  return (
    <HStack spacing={3} style={GlobalStyles.center}>
      {!completed && (
        <Box>
          <RepeatCount count={count} />
        </Box>
      )}
      <Box>
        {completed ? (
          <Icon name="check-bold" size={15} color="green" />
        ) : (
          <Text variant="caption" style={styles.symbol}>
            {progressPercentage(last.day - failed, maxDays)}
          </Text>
        )}
      </Box>
    </HStack>
  );
}

const styles = StyleSheet.create({
  symbol: { fontSize: 13, color: '#4682b4', fontWeight: '900' },
});
