import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Box, HStack, Text } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import RepeatCount from '../../../../../components/progress/RepeatCount';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { useApplication } from '../../../../../hooks/use-application';
import { PURIFICATION_MAX_DAYS, progressPercentage } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';

interface Props {
  last: ProgressLine | undefined;
  title: string;
  count: number;
  completed: boolean;
}
export default function ProgressStatus({ last, count, title, completed }: Props) {
  const { arabic } = useApplication();

  if (!last) {
    return <></>;
  }

  return (
    <HStack spacing={5} style={GlobalStyles.center} reverse={arabic}>
      <Text style={{ fontSize: arabic ? 14 : 10 }} color="grey">
        {title}
      </Text>
      {!completed && (
        <Box>
          <RepeatCount count={count} />
        </Box>
      )}
      <Box>
        {completed ? (
          <Icon name="check" size={15} color="green" />
        ) : (
          <Text variant="caption" style={styles.symbol}>
            {progressPercentage(last.day, PURIFICATION_MAX_DAYS)}
          </Text>
        )}
      </Box>
    </HStack>
  );
}

const styles = StyleSheet.create({
  symbol: { fontSize: 11, color: '#4682b4', fontWeight: '900' },
});
