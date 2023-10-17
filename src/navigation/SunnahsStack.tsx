import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import HabitsScreen from '../screens/sunnahs/HabitsScreen';
import PracticeScreen from '../screens/sunnahs/PracticeScreen';
import SpiritTravelsScreen from '../screens/sunnahs/SpiritTravelsScreen';
import SunnahsScreen from '../screens/sunnahs/SunnahsScreen';
import { SunnahsParamList } from './types';

export default function SunnahsStack() {
  const Stack = createStackNavigator<SunnahsParamList>();

  return (
    <Stack.Navigator initialRouteName="Sunnahs">
      <Stack.Screen name="Sunnahs" component={SunnahsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Habits" component={HabitsScreen} />
      <Stack.Screen name="Practice" component={PracticeScreen} />
      <Stack.Screen name="SpiritTravels" component={SpiritTravelsScreen} />
    </Stack.Navigator>
  );
}
