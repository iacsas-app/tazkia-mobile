import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import PresentationScreen from '../screens/presentation';
import ApproachScreen from '../screens/presentation/ApproachScreen';
import CenterScreen from '../screens/presentation/CenterScreen';
import CheikhScreen from '../screens/presentation/CheikhScreen';
import { PresentationParamList } from './types';

export default function PresentationStack() {
  const Stack = createNativeStackNavigator<PresentationParamList>();

  return (
    <Stack.Navigator initialRouteName="Presentation">
      <Stack.Screen name="Presentation" component={PresentationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Center" component={CenterScreen} />
      <Stack.Screen name="Approach" component={ApproachScreen} />
      <Stack.Screen name="Cheikh" component={CheikhScreen} />
    </Stack.Navigator>
  );
}
