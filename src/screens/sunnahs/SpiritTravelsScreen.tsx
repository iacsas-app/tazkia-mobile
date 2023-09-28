import { Text, VStack } from '@react-native-material/core';
import { View } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';

export default function SpiritTravelsScreen() {
  return (
    <View style={GlobalStyles.container}>
      <VStack spacing={25} style={{ padding: 20 }}>
        <Text variant="h4">Spirit Travel Sunnahs</Text>
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, quia voluptate, rem eligendi molestias eaque
          eos atque eveniet asperiores dolorum adipisci explicabo, laborum nesciunt sed sapiente error mollitia amet
          non.
        </Text>
      </VStack>
    </View>
  );
}
