import { Box, VStack } from '@react-native-material/core';
import { memo, useMemo } from 'react';
import InvocationItem from '../../../components/InvocationItem';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import { useMessage } from '../../../hooks/use-message';
import { ImmunizationPeriod } from './data';

interface Props {
  period: ImmunizationPeriod;
  items: InvocationRepeat[];
}
function Immunization({ items }: Props) {
  const { formatMessage } = useMessage();

  const size = useMemo(() => items.length, []);

  return (
    <VStack spacing={12}>
      {items.map((item: InvocationRepeat, index) => (
        <Box key={index}>
          <InvocationItem index={index + 1} summary={formatMessage(item.key)} total={size} {...item} />
        </Box>
      ))}
    </VStack>
  );
}

export default memo(Immunization);
