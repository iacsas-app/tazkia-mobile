import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { HStack, Text } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import ProgressLine from '../../../../../../domains/common/ProgressLine';
import { useApplication } from '../../../../../../hooks/use-application';
import GlobalStyles from '../../../../../../styles/GlobalStyles';

interface Props {
  item: ProgressLine[] | undefined;
  title: string;
}
export default function ProgressStatus({ item, title }: Props) {
  const { arabicOrientation } = useApplication();

  if (!item) {
    return <></>;
  }
  //let last = item.at(item.length);
  let last = { day: 19, errors: [5] };

  const isCompleted = last?.day === 30 && last.errors.length === 0;

  return (
    <HStack spacing={2} style={GlobalStyles.center} reverse={arabicOrientation}>
      <Text variant="caption">{title} : </Text>
      {isCompleted ? (
        <Icon name="progress-check" size={20} color="green" />
      ) : (
        <Text variant="subtitle2" style={styles.percentage}>
          {((last.day * 100) / 30).toPrecision(2)}%
        </Text>
      )}
    </HStack>
  );
}

const styles = StyleSheet.create({
  percentage: {
    fontSize: 11,
    color: '#4682b4',
  },
});
