import { Box, VStack } from '@react-native-material/core';
import { PropsWithChildren } from 'react';
import Text from '../../../components/Text';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';

interface Props extends PropsWithChildren {
  summary: TKeys;
  body: TKeys;
}
export default function PurificationPrezLayout(props: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();

  return (
    <VStack spacing={2} style={{ alignItems: 'center' }}>
      <VStack>
        <Text style={{ ...GlobalStyles.description, color: 'blue' }}>{formatMessage(props.summary)}</Text>
        <Text
          style={{
            paddingVertical: 10,
            fontSize: arabic ? 17 : 14,
            fontWeight: '900',
            textAlign: 'justify',
          }}
        >
          {formatMessage(TKeys.BASMALAH)}
        </Text>
        <Text
          style={{
            paddingTop: arabic ? 8 : 0,
            marginBottom: 30,
            fontSize: arabic ? 16 : 14,
            fontWeight: arabic ? '600' : 'normal',
            textAlign: 'justify',
          }}
        >
          {formatMessage(props.body)}
        </Text>
      </VStack>
      {props.children && <Box>{props.children}</Box>}
    </VStack>
  );
}
