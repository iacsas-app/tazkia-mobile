import { createStackNavigator } from '@react-navigation/stack';
import BodyPart from '../domains/purification/BodyPart';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import PurificationProgressScreen from '../screens/purification/PurificationProgressScreen';
import PurificationScreen from '../screens/purification/PurificationScreen';
import BodyPartsScreen, { PurificationStage } from '../screens/purification/steps/bodyPartsStep/BodyPartsScreen';
import BodyPartEvaluationScreen from '../screens/purification/steps/bodyPartsStep/evaluation/BodyPartEvaluationScreen';
import BodyPartProgressScreen from '../screens/purification/steps/bodyPartsStep/progress/BodyPartProgressScreen';
import BodyPartsRulesScreen from '../screens/purification/steps/bodyPartsStep/rules/BodyPartRulesScreen';
import MindScreen from '../screens/purification/steps/mindStep/MindScreen';
import SoulScreen from '../screens/purification/steps/soulStep/SoulScreen';
import { capitalize } from '../services/Helpers';
import { PurificationParamList } from './types';

export default function PurificationStack() {
  const { formatMessage } = useMessage();
  const Stack = createStackNavigator<PurificationParamList>();

  function rulesBarTitle(step: PurificationStage) {
    const phase = formatMessage(`purification.bodypart.${step}`).toLocaleLowerCase();
    return formatMessage(TKeys.PURIFICATION_BODYPART_ADD_PHASE, { phase });
  }

  function bodyPartProgressBarTitle(part: BodyPart) {
    const name = formatMessage(`purification.body-parts.${part.name}`);
    const step = formatMessage('menu.purification');
    return `${capitalize(step)} : ${name.toLowerCase()}`;
  }

  return (
    <Stack.Navigator initialRouteName="Purification">
      <Stack.Group>
        <Stack.Screen name="Purification" component={PurificationScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="BodyParts"
          component={BodyPartsScreen}
          options={{ title: formatMessage(TKeys.PURIFICATION_BODYPART_TITLE) }}
        />
        <Stack.Screen
          name="BodyPartsRules"
          component={BodyPartsRulesScreen}
          options={({ route }) => ({ title: rulesBarTitle(route.params.step) })}
        />
        <Stack.Screen
          name="BodyPartProgress"
          component={BodyPartProgressScreen}
          options={({ route }) => ({ title: bodyPartProgressBarTitle(route.params.value) })}
        />
        <Stack.Screen name="PurificationProgress" component={PurificationProgressScreen} />

        <Stack.Screen
          name="Soul"
          component={SoulScreen}
          options={{ title: formatMessage(TKeys.PURIFICATION_SOUL_TITLE) }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="BodyPartEvaluation"
          component={BodyPartEvaluationScreen}
          options={({ route }) => ({ title: rulesBarTitle(route.params.step) })}
        />
        <Stack.Screen
          name="Mind"
          component={MindScreen}
          options={{ title: formatMessage(TKeys.PURIFICATION_MIND_TITLE) }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
