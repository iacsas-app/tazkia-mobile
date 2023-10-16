import { VStack } from '@react-native-material/core';
import { View } from 'react-native';
import Text from '../../components/Text';
import GlobalStyles from '../../styles/GlobalStyles';

export default function CheikhScreen() {
  return (
    <View style={GlobalStyles.container}>
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
