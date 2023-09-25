import { View } from 'react-native';
import Center from '../../components/Center';
import { commonStyles } from '../../styles/CommonStyles';

import { Text } from '@react-native-material/core';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';

export default function Welcome() {
  const { formatMessage } = useMessage();
  return (
    <View style={commonStyles.container}>
      <Text variant="h4" style={{ fontWeight: 'bold' }}>
        {formatMessage(TKeys.PRESENTATION_CENTER)}
      </Text>
      <Center />
    </View>
  );
}
