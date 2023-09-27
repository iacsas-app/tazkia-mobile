import { Text, VStack } from '@react-native-material/core';
import { View } from 'react-native';
import { commonStyles } from '../../styles/CommonStyles';

export default function CheikhScreen() {
  return (
    <View style={commonStyles.container}>
      <VStack spacing={25} style={{ padding: 20 }}>
        <Text variant="h4">Cheikh presentation</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam laborum odit assumenda libero tempore
          veritatis iste, asperiores cum ex ad voluptatem esse error cupiditate eligendi ducimus dolores necessitatibus
          dicta commodi?
        </Text>
      </VStack>
    </View>
  );
}
