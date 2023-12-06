import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import InvocationsScreen from '../../screens/invocations/InvocationsScreen';
import ImmunizationInvocationsScreen from '../../screens/invocations/immunization';
import { ImmunizationPeriod } from '../../screens/invocations/immunization/data';
import JewelsInvocationsScreen from '../../screens/invocations/jewels';
import { InvocationsParamList } from '../types';

export default function InvocationsStack() {
  const { formatMessage } = useMessage();
  const { width } = useWindowDimensions();
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
          headerTitleStyle: { fontSize: 14, width: width - 10 },
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
