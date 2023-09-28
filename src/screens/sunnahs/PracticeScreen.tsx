import { Text, VStack } from '@react-native-material/core';
import { View } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';

export default function PracticeScreen() {
  return (
    <View style={GlobalStyles.container}>
      <VStack spacing={25} style={{ padding: 20 }}>
        <Text variant="h4">Practice Sunnahs</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima illo harum ea impedit. Repellat animi
          corrupti perspiciatis sint cumque molestias. Dicta, doloremque ipsam maxime mollitia quia dolor neque
          exercitationem commodi.
        </Text>
      </VStack>
    </View>
  );
}
