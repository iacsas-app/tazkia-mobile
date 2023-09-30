import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BodyPartType } from '../domains/purification/BodyPart';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import PurificationProgressScreen from '../screens/purification/PurificationProgressScreen';
import PurificationScreen from '../screens/purification/PurificationScreen';
import BodyPartsRulesScreen from '../screens/purification/steps/bodyPartsStep/BodyPartsRulesScreen';
import BodyPartsScreen, { PurificationType } from '../screens/purification/steps/bodyPartsStep/BodyPartsScreen';
import MindScreen from '../screens/purification/steps/mindStep/MindScreen';
import SoulScreen from '../screens/purification/steps/soulStep/SoulScreen';
import { PurificationParamList } from './types';

export default function PurificationStack() {
  const { formatMessage } = useMessage();
  const Stack = createNativeStackNavigator<PurificationParamList>();

  function rulesBarTitle(part: BodyPartType, mode: PurificationType) {
    const name = formatMessage(`purification.body-parts.${part}_2`);
    return `${formatMessage(`button.${mode}`)} ${name}`;
  }

  return (
    <Stack.Navigator initialRouteName="Purification">
      <Stack.Screen name="Purification" component={PurificationScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="BodyParts"
        component={BodyPartsScreen}
        options={{ title: formatMessage(TKeys.PURIFICATION_BODYPART_TITLE) }}
      />
      <Stack.Screen
        name="BodyPartsRules"
        component={BodyPartsRulesScreen}
        options={({ route }) => ({ title: rulesBarTitle(route.params.type, route.params.mode) })}
      />
      <Stack.Screen name="PurificationProgress" component={PurificationProgressScreen} />
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
