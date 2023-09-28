import { Text } from '@react-native-material/core';
import { View } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';

export default function PurificationProgressScreen() {
  return (
    <View style={GlobalStyles.container}>
      <Text variant="h5">My purification progress screen</Text>
    </View>
  );
}
