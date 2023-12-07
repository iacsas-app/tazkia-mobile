import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Font } from '../../constants/Font';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import ApproachScreen from '../../screens/presentation/ApproachScreen';
import BooksScreen from '../../screens/presentation/BooksScreen';
import CenterScreen from '../../screens/presentation/CenterScreen';
import CheikhScreen from '../../screens/presentation/CheikhScreen';
import PresentationScreen from '../../screens/presentation/PresentationScreen';
import { PresentationParamList } from '../types';

export default function PresentationStack() {
  const { formatMessage } = useMessage();
  const Stack = createStackNavigator<PresentationParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerMode: 'float',
          headerTitleStyle: { fontSize: Font.size(13) },
        }}
      >
        <Stack.Screen name="Home" component={PresentationScreen} options={{ headerShown: false }} />
        <Stack.Group screenOptions={{ presentation: 'card' }}>
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
    </NavigationContainer>
  );
}
