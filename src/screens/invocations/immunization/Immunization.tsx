import { Box, VStack } from '@react-native-material/core';
import { useMemo } from 'react';
import InvocationItem from '../../../components/InvocationItem';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import { useMessage } from '../../../hooks/use-message';
import { ImmunizationPeriod, immunizationData } from './data';

interface Props {
  period: ImmunizationPeriod;
}
export default function Immunization({ period }: Props) {
  const { formatMessage } = useMessage();
  const data: InvocationRepeat[] = useMemo(() => immunizationData[period], []);
  const size = useMemo(() => data.length, []);
  return (
    <VStack spacing={12}>
      {data.map((item: InvocationRepeat, index) => (
        <Box key={index}>
          <InvocationItem index={index + 1} summary={formatMessage(item.key)} total={size} {...item} />
        </Box>
      ))}
    </VStack>
  );
}
