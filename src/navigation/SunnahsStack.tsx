import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import SunnahsProgressScreen from '../screens/sunnahs/SunnahsProgressScreen';
import SunnahsScreen from '../screens/sunnahs/SunnahsScreen';
import HabitsScreen from '../screens/sunnahs/steps/HabitsScreen';
import TruthsScreen from '../screens/sunnahs/steps/TruthsScreen';
import WorshipScreen from '../screens/sunnahs/steps/WorshipScreen';
import { SunnahsParamList } from './types';

export default function SunnahsStack() {
  const { formatMessage } = useMessage();
  const Stack = createStackNavigator<SunnahsParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Sunnahs"
      screenOptions={{
        headerMode: 'float',
      }}
    >
      <Stack.Screen name="Sunnahs" component={SunnahsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SunnahsProgress" component={SunnahsProgressScreen} options={{ headerShown: false }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Habits"
          component={HabitsScreen}
          options={{ title: formatMessage(TKeys.SUNNAHS_HABITS_TITLE) }}
        />
        <Stack.Screen
          name="Worship"
          component={WorshipScreen}
          options={{ title: formatMessage(TKeys.SUNNAHS_WORSHIP_TITLE) }}
        />
        <Stack.Screen
          name="Truths"
          component={TruthsScreen}
          options={{ title: formatMessage(TKeys.SUNNAHS_TRUTHS_TITLE) }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
