import { Button, Text, View } from 'react-native';
//import { Label } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';

export default function DikrScreen() {
  return (
    <View style={GlobalStyles.container}>
      <Text style={{ fontWeight: 'bold' }}>العدد المطلوب</Text>
     
      <Text style={{ fontWeight: 'bold' }}></Text>
      <Button title='Initialiser'></Button>
      <br></br>
      <Button title='1'></Button>
    </View>

  );
}