import { createStackNavigator } from '@react-navigation/stack';
import { Font } from '../../constants/Font';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import PurificationScreen from '../../screens/purification/PurificationScreen';
import BodyPartsScreen from '../../screens/purification/steps/bodyPartsStep';
import MindScreen from '../../screens/purification/steps/mindStep';
import SoulScreen from '../../screens/purification/steps/soulStep';
import { PurificationParamList } from '../types';

export default function PurificationStack() {
  const { formatMessage } = useMessage();
  const Stack = createStackNavigator<PurificationParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: 'float',
        headerTitleStyle: { fontSize: Font.size(14) },
      }}
    >
      <Stack.Screen name="Home" component={PurificationScreen} options={{ headerShown: false }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="BodyParts"
          component={BodyPartsScreen}
          options={{ title: formatMessage(TKeys.PURIFICATION_BODYPART_TITLE) }}
        />
        <Stack.Screen
          name="Mind"
          component={MindScreen}
          options={{ title: formatMessage(TKeys.PURIFICATION_MIND_TITLE) }}
        />
        <Stack.Screen
          name="Soul"
          component={SoulScreen}
          options={{ title: formatMessage(TKeys.PURIFICATION_SOUL_TITLE) }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}