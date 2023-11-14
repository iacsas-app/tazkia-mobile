import { Box, HStack } from '@react-native-material/core';
import Text from '../../../../../components/Text';
import { ProgressStatus as Status } from '../../../../../components/progress/progressStatus/ProgressStatus';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import { useApplication } from '../../../../../hooks/use-application';
import { PURIFICATION_MAX_DAYS } from '../../../../../services/Helpers';

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
    <HStack
      spacing={5}
      style={{ width: 120, justifyContent: 'space-between', alignContent: 'stretch', alignItems: 'center' }}
    >
      <Text variant="bodyLarge" style={{ fontSize: arabic ? 14 : 10 }} color="grey">
        {title}
      </Text>
      <Box>
        <Status maxDays={PURIFICATION_MAX_DAYS} {...props} />
      </Box>
    </HStack>
  );
}
