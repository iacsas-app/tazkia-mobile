import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { SCREEN_WIDTH } from '../../constants/Screen';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import InvocationsScreen from '../../screens/invocations/InvocationsScreen';
import AhzabsInvocationsScreen from '../../screens/invocations/ahzabs';
import OverflowInvocationsScreen from '../../screens/invocations/fayd';
import ImmunizationInvocationsScreen from '../../screens/invocations/immunization';
import { ImmunizationPeriod } from '../../screens/invocations/immunization/data';
import JewelsInvocationsScreen from '../../screens/invocations/jewels';
import { InvocationsParamList } from '../types';

export default function InvocationsStack() {
  const { formatMessage } = useMessage();
  const Stack = createStackNavigator<InvocationsParamList>();

  function immunizationInvocationsTitle(period: ImmunizationPeriod) {
    const periodTitle = formatMessage(period);
    return formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_TITLE, { period: periodTitle });
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Invocations"
        screenOptions={{
          headerShown: true,
          headerMode: 'float',
          headerTitleStyle: { fontSize: 12, width: SCREEN_WIDTH - 10 },
        }}
      >
        <Stack.Screen name="Invocations" component={InvocationsScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Immunization"
          component={ImmunizationInvocationsScreen}
          options={({ route }) => ({ title: immunizationInvocationsTitle(route.params.period) })}
        />
        <Stack.Screen
          name="Jewels"
          component={JewelsInvocationsScreen}
          options={{ title: formatMessage(TKeys.INVOCATION_JEWELS_TITLE) }}
        />
        <Stack.Screen
          name="Overflow"
          component={OverflowInvocationsScreen}
          options={{ title: formatMessage(TKeys.INVOCATION_OVERFLOW_TITLE) }}
        />
        <Stack.Screen
          name="Ahzabs"
          component={AhzabsInvocationsScreen}
          options={{ title: formatMessage(TKeys.INVOCATION_AHZABS_TITLE) }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
