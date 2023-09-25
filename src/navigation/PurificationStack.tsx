import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import BodyPartsStepScreen from '../screens/purification/bodyPartsStep';
import MindStepScreen from '../screens/purification/mindStep';
import SoulStepScreen from '../screens/purification/soulStep';
import { PurificationParamList } from './types';

const TazkiaStack = createNativeStackNavigator<PurificationParamList>();

const TazkiaStackNavigator = () => {
  return (
    <TazkiaStack.Navigator>
      <TazkiaStack.Screen name="BodyPartsStep" component={BodyPartsStepScreen} />
      <TazkiaStack.Screen name="MindStep" component={MindStepScreen} />
      <TazkiaStack.Screen name="SoulStep" component={SoulStepScreen} />
    </TazkiaStack.Navigator>
  );
};

export default TazkiaStackNavigator;
