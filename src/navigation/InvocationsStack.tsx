import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { useWindowDimensions } from 'react-native';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import InvocationsScreen from '../screens/invocations/InvocationsScreen';
import ImmunizationInvocationsScreen from '../screens/invocations/immunization';
import JewelsInvocationsScreen from '../screens/invocations/jewels';
import PurificationInvocationsScreen from '../screens/invocations/purification';
import { InvocationsParamList } from './types';

export default function InvocationsStack() {
  const { formatMessage } = useMessage();
  const { width } = useWindowDimensions();
  const Stack = createStackNavigator<InvocationsParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Invocations"
      screenOptions={{
        headerShown: true,
        headerMode: 'float',
        headerTitleStyle: { fontSize: 14, width: width - 10 },
      }}
    >
      <Stack.Screen name="Invocations" component={InvocationsScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Purification"
        component={PurificationInvocationsScreen}
        options={{
          title: formatMessage(TKeys.INVOCATION_PURIFICATION_TITLE),
        }}
      />
      <Stack.Screen
        name="Immunization"
        component={ImmunizationInvocationsScreen}
        options={{
          title: formatMessage(TKeys.INVOCATION_IMMUNIZATION_TITLE),
        }}
      />
      <Stack.Screen
        name="Jewels"
        component={JewelsInvocationsScreen}
        options={{ title: formatMessage(TKeys.INVOCATION_JEWELS_TITLE) }}
      />
    </Stack.Navigator>
  );
}
