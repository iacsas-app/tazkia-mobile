import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMessage } from '../../hooks/use-message';
import { PresentationParamList } from '../../navigation/types';
import CenterScreen from './CenterScreen';
import CheikhScreen from './CheikhScreen';
import ManhajScreen from './ManhajScreen';

export default function PresentationScreen() {
  const { formatMessage } = useMessage();
  const Stack = createNativeStackNavigator<PresentationParamList>();

  return (
    <Stack.Navigator initialRouteName="Cheikh">
      <Stack.Screen name="Center" component={CenterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Cheikh" component={CheikhScreen} options={{ title: 'Cheikh' }} />
      <Stack.Screen name="Manhaj" component={ManhajScreen} options={{ title: 'Manhaj' }} />
    </Stack.Navigator>
  );
}
