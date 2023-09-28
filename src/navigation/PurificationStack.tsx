import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import PurificationScreen from '../screens/purification/PurificationScreen';
import BodyPartsRulesScreen from '../screens/purification/steps/bodyPartsStep/BodyPartsRulesScreen';
import BodyPartsScreen from '../screens/purification/steps/bodyPartsStep/BodyPartsScreen';
import MindScreen from '../screens/purification/steps/mindStep/MindScreen';
import SoulScreen from '../screens/purification/steps/soulStep/SoulScreen';
import { PurificationParamList } from './types';

export default function PurificationStack() {
  const { formatMessage } = useMessage();
  const Stack = createNativeStackNavigator<PurificationParamList>();

  return (
    <Stack.Navigator initialRouteName="Purification">
      <Stack.Screen name="Purification" component={PurificationScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="BodyParts"
        component={BodyPartsScreen}
        options={{ title: formatMessage(TKeys.PURIFICATION_BODYPART_TITLE) }}
      />
      <Stack.Screen name="BodyPartsRules" component={BodyPartsRulesScreen} />
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
    </Stack.Navigator>
  );
}
