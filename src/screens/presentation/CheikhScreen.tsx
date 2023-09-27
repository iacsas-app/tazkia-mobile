import { Button } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { PresentationStackNavigationProp } from '../../navigation/types';
import { commonStyles } from '../../styles/CommonStyles';

export default function CheikhScreen() {
  const navigation = useNavigation<PresentationStackNavigationProp>();

  function handlePress() {
    navigation.navigate('Manhaj', { name: 'Khalid' });
  }

  return (
    <View style={commonStyles.container}>
      <Text>Cheikh presentation screen</Text>

      <Button title="Go Manhaj" onPress={handlePress} />
    </View>
  );
}
