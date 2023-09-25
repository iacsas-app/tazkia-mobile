import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import DikrScreen from '../screens/dikr';
import HomeScreen from '../screens/home';
import SunanScreen from '../screens/sunan';
import TazkiaStack from '../screens/tazkia';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabs = () => {
  const { formatMessage } = useMessage();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: formatMessage(TKeys.MENU_HOME) }} />
      <Tab.Screen
        name="Tazkia"
        component={TazkiaStack}
        options={{ title: formatMessage(TKeys.MENU_TAZKIA), headerShown: false }}
      />
      <Tab.Screen name="Sunan" component={SunanScreen} options={{ title: formatMessage(TKeys.MENU_SUNAN) }} />
      <Tab.Screen name="Dikr" component={DikrScreen} options={{ title: formatMessage(TKeys.MENU_DIKR) }} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
