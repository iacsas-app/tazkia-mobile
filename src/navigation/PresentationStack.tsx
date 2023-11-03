import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import ApproachScreen from '../screens/presentation/ApproachScreen';
import BooksScreen from '../screens/presentation/BooksScreen';
import CenterScreen from '../screens/presentation/CenterScreen';
import CheikhScreen from '../screens/presentation/CheikhScreen';
import PresentationScreen from '../screens/presentation/PresentationScreen';
import { PresentationParamList } from './types';

export default function PresentationStack() {
  const Stack = createStackNavigator<PresentationParamList>();
  const { formatMessage } = useMessage();

  return (
    <Stack.Navigator
      initialRouteName="Presentation"
      screenOptions={{
        headerMode: 'float',
      }}
    >
      <Stack.Screen name="Presentation" component={PresentationScreen} options={{ headerShown: false }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Center"
          component={CenterScreen}
          options={{ title: formatMessage(TKeys.PRESENTATION_CENTER_TITLE) }}
        />
        <Stack.Screen
          name="Approach"
          options={{ title: formatMessage(TKeys.PRESENTATION_APPROACH_TITLE) }}
          component={ApproachScreen}
        />
        <Stack.Screen
          name="Cheikh"
          options={{ title: formatMessage(TKeys.PRESENTATION_CHEIKH_TITLE) }}
          component={CheikhScreen}
        />
        <Stack.Screen
          name="Books"
          options={{ title: formatMessage(TKeys.PRESENTATION_BOOKS_TITLE) }}
          component={BooksScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
