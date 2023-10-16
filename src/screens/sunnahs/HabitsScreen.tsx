import { VStack } from '@react-native-material/core';
import { View } from 'react-native';
import Text from '../../components/Text';
import GlobalStyles from '../../styles/GlobalStyles';

/**
 * Manhaj
 * @returns
 */
export default function HabitsScreen() {
  return (
    <View style={GlobalStyles.container}>
      <VStack spacing={25} style={{ padding: 20 }}>
        <Text variant="h4">Habits Sunnahs</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quasi officiis animi placeat quos dolorum
          delectus dolor fugit est reprehenderit, accusamus explicabo ducimus aspernatur, expedita fuga rerum natus aut
          perferendis!
        </Text>
      </VStack>
    </View>
  );
}
