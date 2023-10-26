import { Box, HStack, VStack } from '@react-native-material/core';
import { useWindowDimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import Text from '../../../components/Text';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';

interface Props {
  verbals: string[];
  actionals: string[];
  arabic: boolean;
}
export default function SunnahRule(props: Props) {
  const { formatMessage } = useMessage();
  const { width } = useWindowDimensions();

  function format(type: TKeys, items: string[]) {
    const count = items.length;
    if (count === 0) {
      return <></>;
    }
    return (
      <VStack spacing={5} style={{ width: width - 80 }}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: 'green' }}>{formatMessage(type)} :</Text>
        {items.map((ruleKey, index) => (
          <VStack key={index} spacing={3}>
            <HStack key={ruleKey} spacing={10} style={{ alignContent: 'flex-start' }}>
              {count > 1 && <Text style={{ fontSize: 15, fontWeight: '900', color: 'green' }}>{index + 1}</Text>}
              <Text style={{ fontSize: 15, textAlign: 'justify' }}>{formatMessage(ruleKey)}</Text>
            </HStack>
            {index < count - 1 && <Divider />}
          </VStack>
        ))}
      </VStack>
    );
  }

  return (
    <VStack style={{ paddingHorizontal: 3 }} spacing={20}>
      <Box>{format(TKeys.SUNNAHS_TYPE_VERBAL, props.verbals)}</Box>
      <Box>{format(TKeys.SUNNAHS_TYPE_ACTIONAL, props.actionals)}</Box>
    </VStack>
  );
}
