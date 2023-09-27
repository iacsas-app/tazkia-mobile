import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import InvocationsScreen from '../screens/invocations';
import PresentationScreen from '../screens/presentation';
import PurificationScreen from '../screens/purification';
import SunnahsScreen from '../screens/sunnahs';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabs = () => {
  const { formatMessage } = useMessage();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={PresentationScreen}
        options={{ title: formatMessage(TKeys.MENU_HOME), headerShown: false }}
      />
      <Tab.Screen
        name="Purification"
        component={PurificationScreen}
        options={{ title: formatMessage(TKeys.MENU_PURIFICATION), headerShown: false }}
      />
      <Tab.Screen name="Sunnahs" component={SunnahsScreen} options={{ title: formatMessage(TKeys.MENU_SUNNAHS) }} />
      <Tab.Screen
        name="Invocations"
        component={InvocationsScreen}
        options={{ title: formatMessage(TKeys.MENU_INVOCATIONS) }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
