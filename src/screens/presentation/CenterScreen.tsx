import { Text, VStack } from '@react-native-material/core';
import { View } from 'react-native';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import { commonStyles } from '../../styles/CommonStyles';

export default function CenterScreen() {
  const { formatMessage } = useMessage();

  return (
    <View style={commonStyles.container}>
      <VStack spacing={25} style={{ padding: 20 }}>
        <Text variant="h5" style={{ fontWeight: 'bold' }}>
          {formatMessage(TKeys.PRESENTATION_CENTER)}
        </Text>
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam quis eligendi commodi eaque fugiat fuga.
          Non voluptates doloribus repudiandae qui velit ipsam mollitia ex nam magni illum? Sit, dolores inventore.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
      </VStack>
    </View>
  );
}
