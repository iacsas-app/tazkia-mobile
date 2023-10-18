import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { HStack, VStack } from '@react-native-material/core';
import Text from '../../../components/Text';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';

interface Props {
  verbals: string[];
  actionals: string[];
  arabic: boolean;
}
export default function SunnahRule(props: Props) {
  const { formatMessage } = useMessage();

  return (
    <VStack style={{ paddingHorizontal: 5 }} spacing={5}>
      {props.verbals.length !== 0 && (
        <VStack spacing={5}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: 'green' }}>
            {formatMessage(TKeys.SUNNAHS_TYPE_VERBAL)} :{' '}
          </Text>
          {props.verbals.map((ruleKey) => (
            <HStack key={ruleKey} spacing={5} style={GlobalStyles.centerAlign}>
              <Icon name={`chevron-double-${props.arabic ? 'left' : 'right'}`} size={18} color="#008000" />
              <Text style={{ fontSize: 13 }}>{formatMessage(ruleKey)}</Text>
            </HStack>
          ))}
        </VStack>
      )}
      {props.actionals.length !== 0 && (
        <VStack spacing={5} mt={15}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: 'green' }}>
            {formatMessage(TKeys.SUNNAHS_TYPE_ACTIONAL)} :{' '}
          </Text>
          {props.actionals.map((ruleKey) => (
            <HStack key={ruleKey} spacing={5} style={GlobalStyles.centerAlign}>
              <Icon name={`chevron-double-${props.arabic ? 'left' : 'right'}`} size={18} color="#008000" />
              <Text style={{ fontSize: 13 }}>{formatMessage(ruleKey)}</Text>
            </HStack>
          ))}
        </VStack>
      )}
    </VStack>
  );
}
