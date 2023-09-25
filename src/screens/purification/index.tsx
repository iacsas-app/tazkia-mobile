import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import { PurificationParamList } from '../../navigation/types';
import PurificationHomeScreen from './PurificationHomeScreen';
import BodyPartsStepScreen from './bodyPartsStep';
import MindStepScreen from './mindStep';
import SoulStepScreen from './soulStep';

export default function PurificationScreen() {
  const { formatMessage } = useMessage();
  const Stack = createNativeStackNavigator<PurificationParamList>();

  return (
    <Stack.Navigator initialRouteName="PurificationHome">
      <Stack.Screen name="PurificationHome" component={PurificationHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="BodyPartsStep"
        component={BodyPartsStepScreen}
        options={{ title: formatMessage(TKeys.PURIFICATION_BODYPART_TITLE) }}
      />
      <Stack.Screen
        name="MindStep"
        component={MindStepScreen}
        options={{ title: formatMessage(TKeys.PURIFICATION_MIND_TITLE) }}
      />
      <Stack.Screen
        name="SoulStep"
        component={SoulStepScreen}
        options={{ title: formatMessage(TKeys.PURIFICATION_SOUL_TITLE) }}
      />
    </Stack.Navigator>
  );
}
