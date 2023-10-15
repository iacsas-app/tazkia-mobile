import { Box, HStack, Text } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import { ProgressStatus as Status } from '../../../../../components/progress/progressStatus/ProgressStatus';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { useApplication } from '../../../../../hooks/use-application';
import { PURIFICATION_MAX_DAYS } from '../../../../../services/Helpers';
import GlobalStyles from '../../../../../styles/GlobalStyles';

interface Props {
  last: ProgressLine | undefined;
  title: string;
  count: number;
  completed: boolean;
}
export default function ProgressStatus({ title, ...props }: Props) {
  const { arabic } = useApplication();

  if (!props.last) {
    return <></>;
  }

  return (
    <HStack spacing={5} style={GlobalStyles.center} reverse={arabic}>
      <Text style={{ fontSize: arabic ? 14 : 10 }} color="grey">
        {title}
      </Text>
      <Box>
        <Status maxDays={PURIFICATION_MAX_DAYS} {...props} />
      </Box>
    </HStack>
  );
}

const styles = StyleSheet.create({
  symbol: { fontSize: 11, color: '#4682b4', fontWeight: '900' },
});
