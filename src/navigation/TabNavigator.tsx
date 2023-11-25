import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import MCIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Font } from '../constants/Font';
import { useMessage } from '../hooks/use-message';
import usePurification from '../hooks/use-purification';
import { TKeys } from '../locales/constants';
import InvocationsStack from './InvocationsStack';
import PresentationStack from './PresentationStack';
import PurificationStack from './PurificationStack';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const { hasBodyPartsProgress, hasMindProgress, hasSoulProgress } = usePurification();
  const { formatMessage } = useMessage();
  const menuSize = Font.size(12);

  return (
    <Tab.Navigator
      initialRouteName={hasBodyPartsProgress || hasMindProgress || hasSoulProgress ? 'PurificationTab' : 'HomeTab'}
      screenOptions={{ tabBarAllowFontScaling: true }}
    >
      <Tab.Screen
        name="HomeTab"
        component={PresentationStack}
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
          tabBarActiveTintColor: '#2e8b57',
          tabBarBadge: undefined,
          tabBarLabelStyle: {
            fontSize: menuSize,
            fontWeight: '700',
          },
        }}
      />
      <Tab.Screen
        name="InvocationsTab"
        component={InvocationsStack}
        options={{
          title: formatMessage(TKeys.MENU_INVOCATIONS),
          headerShown: false,
          tabBarIcon: ({ size, ...props }) => <MCIcons name="meditation" size={40} {...props} />,
          tabBarActiveTintColor: '#4169e1',
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
