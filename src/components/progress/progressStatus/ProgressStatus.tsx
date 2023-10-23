import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Box, HStack } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import ProgressLine from '../../../domains/common/ProgressLine';
import { useApplication } from '../../../hooks/use-application';
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
  const { arabic } = useApplication();

  if (!last) {
    return <></>;
  }

  return (
    <HStack spacing={1} style={GlobalStyles.center} reverse={arabic}>
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
            {progressPercentage(last.day, maxDays)}
          </Text>
        )}
      </Box>
    </HStack>
  );
}

const styles = StyleSheet.create({
  symbol: { fontSize: 13, color: '#4682b4', fontWeight: '900' },
});
