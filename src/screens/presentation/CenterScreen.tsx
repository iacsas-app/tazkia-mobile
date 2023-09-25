import { View } from 'react-native';
import Center from '../../components/Center';
import { commonStyles } from '../../styles/CommonStyles';

export default function CenterScreen() {
  return (
    <View style={commonStyles.container}>
      <Center />
    </View>
  );
}
