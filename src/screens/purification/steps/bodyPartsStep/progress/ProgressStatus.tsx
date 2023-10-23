import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Box, HStack, Text } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { useApplication } from '../../../../../hooks/use-application';
import { progressPercentage } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';

interface Props {
  items: ProgressLine[] | undefined;
  title: string;
}
export default function ProgressStatus({ items, title }: Props) {
  const { arabicOrientation } = useApplication();
  const maxDays = 30;

  if (!items) {
    return <></>;
  }
  const last = items.at(items.length - 1);
  if (!last) {
    return <></>;
  }
  const isCompleted = last?.day === maxDays && last.errors.length === 0;

  return (
    <HStack style={GlobalStyles.center} reverse={arabicOrientation}>
      <Text variant="caption">{title} : </Text>
      <Box>
        {isCompleted ? (
          <Icon name="progress-check" size={26} color="green" />
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
  symbol: { fontSize: 12, color: 'blue', fontWeight: '600' },
});
