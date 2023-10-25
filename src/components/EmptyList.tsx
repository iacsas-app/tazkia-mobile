import { Box, VStack } from '@react-native-material/core';
import { Avatar } from 'react-native-paper';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import GlobalStyles from '../styles/GlobalStyles';
import Text from './Text';

export default function EmptyList() {
  const { formatMessage } = useMessage();

  return (
    <VStack style={GlobalStyles.container} spacing={20} mt={30}>
      <Avatar.Image
        size={200}
        source={require('../../assets/img/empty.png')}
        style={{ backgroundColor: 'transparent' }}
      />
      <Box style={GlobalStyles.center}>
        <Text variant="h4">{formatMessage(TKeys.MESSAGE_EMPTY_LIST)}</Text>
        <Text variant="h6">{formatMessage(TKeys.MESSAGE_NO_PROGRESS)}</Text>
      </Box>
    </VStack>
  );
}
