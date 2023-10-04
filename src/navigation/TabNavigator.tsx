import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import FontAwesome5Brands from '@expo/vector-icons/FontAwesome5';
import MCIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useApplication } from '../hooks/use-application';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import InvocationsScreen from '../screens/invocations';
import ProgressScreen from '../screens/progress';
import PresentationStack from './PresentationStack';
import PurificationStack from './PurificationStack';
import SunnahsStack from './SunnahsStack';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const { arabic } = useApplication();
  const { formatMessage } = useMessage();
  const { hasProgress } = useApplication();
  const menuSize = arabic ? 14 : 11;

  return (
    <Tab.Navigator initialRouteName="HomeTab">
      <Tab.Screen
        name="HomeTab"
        component={hasProgress ? ProgressScreen : PresentationStack}
        options={{
          title: formatMessage(TKeys.MENU_HOME),
          headerShown: false,
          tabBarIcon: ({ size, ...props }) => <MCIcons name="home" size={38} {...props} />,
          tabBarActiveTintColor: '#8a2be2',
          tabBarLabelStyle: {
            fontSize: menuSize,
            fontWeight: '700',
          },
        }}
      />
      <Tab.Screen
        name="PurificationTab"
        component={PurificationStack}
        options={{
          title: formatMessage(TKeys.MENU_PURIFICATION),
          headerShown: false,
          tabBarIcon: ({ size, ...props }) => <Octicons name="code-of-conduct" size={30} {...props} />,
          tabBarActiveTintColor: '#4169e1',
          tabBarBadge: undefined,
          tabBarLabelStyle: {
            fontSize: menuSize,
            fontWeight: '700',
          },
        }}
      />
      <Tab.Screen
        name="SunnahsTab"
        component={SunnahsStack}
        options={{
          title: formatMessage(TKeys.MENU_SUNNAHS),
          headerShown: false,
          tabBarIcon: ({ size, ...props }) => (
            <FontAwesome5Brands name="ussunnah" size={39} {...props} style={{ marginTop: -5 }} />
          ),
          tabBarActiveTintColor: '#2e8b57',
          tabBarLabelStyle: {
            fontSize: menuSize,
            fontWeight: '700',
            width: 150,
          },
        }}
      />
      <Tab.Screen
        name="InvocationsTab"
        component={InvocationsScreen}
        options={{
          title: formatMessage(TKeys.MENU_INVOCATIONS),
          tabBarIcon: ({ size, ...props }) => <MCIcons name="meditation" size={40} {...props} />,
          tabBarActiveTintColor: '#ff6347',
          tabBarLabelStyle: {
            fontSize: menuSize,
            fontWeight: '700',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
