import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import Part1Screen from '../screens/tazkia/step1';
import Part3Screen from '../screens/tazkia/step2';
import Part2Screen from '../screens/tazkia/step3';
import { TazkiaParamList } from './types';

const TazkiaStack = createNativeStackNavigator<TazkiaParamList>();

const TazkiaStackNavigator = () => {
  return (
    <TazkiaStack.Navigator>
      <TazkiaStack.Screen name="Part1" component={Part1Screen} />
      <TazkiaStack.Screen name="Part2" component={Part2Screen} />
      <TazkiaStack.Screen name="Part3" component={Part3Screen} />
    </TazkiaStack.Navigator>
  );
};

export default TazkiaStackNavigator;
