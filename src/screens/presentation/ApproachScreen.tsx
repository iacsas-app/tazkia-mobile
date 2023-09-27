import { Text, VStack } from '@react-native-material/core';
import { View } from 'react-native';
import { commonStyles } from '../../styles/CommonStyles';

/**
 * Manhaj
 * @returns
 */
export default function ApproachScreen() {
  return (
    <View style={commonStyles.container}>
      <VStack spacing={25} style={{ padding: 20 }}>
        <Text variant="h4">Manhaj/Approach</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident animi, ipsa, ab eveniet totam
          velit, asperiores facere deleniti voluptates quidem voluptate. Commodi obcaecati quam at modi animi minus
          aliquid?
        </Text>
      </VStack>
    </View>
  );
}
