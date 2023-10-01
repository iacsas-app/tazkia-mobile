import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BodyPart, { BodyPartType } from '../domains/purification/BodyPart';
import { useApplication } from '../hooks/use-application';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import PurificationProgressScreen from '../screens/purification/PurificationProgressScreen';
import PurificationScreen from '../screens/purification/PurificationScreen';
import BodyPartsRulesScreen from '../screens/purification/steps/bodyPartsStep/BodyPartsRulesScreen';
import BodyPartsScreen, { PurificationType } from '../screens/purification/steps/bodyPartsStep/BodyPartsScreen';
import BodyPartEvaluationScreen from '../screens/purification/steps/bodyPartsStep/evaluation/BodyPartEvaluationScreen';
import BodyPartProgressScreen from '../screens/purification/steps/bodyPartsStep/progress/BodyPartProgressScreen';
import MindScreen from '../screens/purification/steps/mindStep/MindScreen';
import SoulScreen from '../screens/purification/steps/soulStep/SoulScreen';
import { capitalize } from '../services/Helpers';
import { PurificationParamList } from './types';

export default function PurificationStack() {
  const { locale } = useApplication();
  const { formatMessage } = useMessage();
  const Stack = createNativeStackNavigator<PurificationParamList>();

  function rulesBarTitle(part: BodyPartType, mode: PurificationType) {
    const name = formatMessage(`purification.body-parts.${part}_2`);
    const type = formatMessage(`button.${mode}`);
    return locale === 'en' ? `${capitalize(name)} ${type.toLowerCase()}` : `${type} ${name}`;
  }

  function bodyPartProgressBarTitle(part: BodyPart) {
    const name = formatMessage(`purification.body-parts.${part.name}`);
    const purif = formatMessage('menu.purification');
    return locale === 'en' ? `${capitalize(name)} ${purif.toLowerCase()}` : `${purif} ${name}`;
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
      <Stack.Screen
        name="BodyPartProgress"
        component={BodyPartProgressScreen}
        options={({ route }) => ({ title: bodyPartProgressBarTitle(route.params.value) })}
      />
      <Stack.Screen
        name="BodyPartEvaluation"
        component={BodyPartEvaluationScreen}
        options={({ route }) => ({ title: rulesBarTitle(route.params.partType, route.params.mode) })}
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
