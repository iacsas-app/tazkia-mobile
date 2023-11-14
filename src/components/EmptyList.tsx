import { Box, VStack } from '@react-native-material/core';
import { Image, useWindowDimensions } from 'react-native';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import GlobalStyles from '../styles/GlobalStyles';
import Text from './Text';

export default function EmptyList() {
  const { formatMessage } = useMessage();
  const { width } = useWindowDimensions();

  return (
    <VStack style={GlobalStyles.container} spacing={20} mt={30}>
      <Image
        source={require('../../assets/img/empty.png')}
        style={{
          width: width - 130,
          height: width - 120,
        }}
      />
      <Box style={GlobalStyles.center}>
        <Text variant="displayMedium">{formatMessage(TKeys.MESSAGE_EMPTY_LIST)}</Text>
        <Text variant="displaySmall">{formatMessage(TKeys.MESSAGE_NO_PROGRESS)}</Text>
      </Box>
    </VStack>
  );
}
