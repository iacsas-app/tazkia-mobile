import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import PurificationScreen from '../screens/purification';
import BodyPartsPurificationScreen from '../screens/purification/steps/bodyPartsStep';
import MindPurificationScreen from '../screens/purification/steps/mindStep';
import SoulPurificationScreen from '../screens/purification/steps/soulStep';
import { PurificationParamList } from './types';

export default function PurificationStack() {
  const { formatMessage } = useMessage();
  const Stack = createNativeStackNavigator<PurificationParamList>();

  return (
    <Stack.Navigator initialRouteName="Purification">
      <Stack.Screen name="Purification" component={PurificationScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="BodyParts"
        component={BodyPartsPurificationScreen}
        options={{ title: formatMessage(TKeys.PURIFICATION_BODYPART_TITLE) }}
      />
      <Stack.Screen
        name="Mind"
        component={MindPurificationScreen}
        options={{ title: formatMessage(TKeys.PURIFICATION_MIND_TITLE) }}
      />
      <Stack.Screen
        name="Soul"
        component={SoulPurificationScreen}
        options={{ title: formatMessage(TKeys.PURIFICATION_SOUL_TITLE) }}
      />
    </Stack.Navigator>
  );
}
