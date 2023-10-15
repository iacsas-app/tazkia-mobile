import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import PresentationScreen from '../screens/presentation';
import ApproachScreen from '../screens/presentation/ApproachScreen';
import CenterScreen from '../screens/presentation/CenterScreen';
import CheikhScreen from '../screens/presentation/CheikhScreen';
import { PresentationParamList } from './types';

export default function PresentationStack() {
  const Stack = createStackNavigator<PresentationParamList>();

  return (
    <Stack.Navigator initialRouteName="Presentation">
      <Stack.Screen name="Presentation" component={PresentationScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Center"
        component={CenterScreen}
        options={{
          title: 'Create a new note',
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="Approach" component={ApproachScreen} />
      <Stack.Screen name="Cheikh" component={CheikhScreen} />
    </Stack.Navigator>
  );
}
