import { VStack } from '@react-native-material/core';
import { View } from 'react-native';
import Text from '../../components/Text';
import GlobalStyles from '../../styles/GlobalStyles';

/**
 * Manhaj
 * @returns
 */
export default function ApproachScreen() {
  return (
    <View style={GlobalStyles.container}>
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
