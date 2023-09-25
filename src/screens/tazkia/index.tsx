import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import { TazkiaParamList } from '../../navigation/types';
import TazkiaHomeScreen from './TazkiaHomeScreen';
import Part1Screen from './step1';
import Part3Screen from './step2';
import Part2Screen from './step3';

export default function TazkiaStack() {
  const { formatMessage } = useMessage();
  const Stack = createNativeStackNavigator<TazkiaParamList>();

  return (
    <Stack.Navigator initialRouteName="TazkiaHome">
      <Stack.Screen name="TazkiaHome" component={TazkiaHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Part1"
        component={Part1Screen}
        options={{ title: formatMessage(TKeys.TAZKIA_BODYPART_TITLE) }}
      />
      <Stack.Screen name="Part2" component={Part2Screen} options={{ title: formatMessage(TKeys.TAZKIA_MIND_TITLE) }} />
      <Stack.Screen name="Part3" component={Part3Screen} options={{ title: formatMessage(TKeys.TAZKIA_SOUL_TITLE) }} />
    </Stack.Navigator>
  );
}
