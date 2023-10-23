import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { useApplication } from '../hooks/use-application';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import InvocationsScreen from '../screens/invocations';
import ProgressScreen from '../screens/progress';
import PurificationProgressScreen from '../screens/purification/PurificationProgressScreen';
import SunnahsProgressScreen from '../screens/sunnahs/SunnahsProgressScreen';
import PresentationStack from './PresentationStack';
import PurificationStack from './PurificationStack';
import SunnahsStack from './SunnahsStack';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabs = () => {
  const { formatMessage } = useMessage();
  const { hasProgress, hasPurificationProgress, hasSunnahsProgress } = useApplication();

  return (
    <Tab.Navigator initialRouteName="HomeTab">
      <Tab.Screen
        name="HomeTab"
        component={hasProgress ? ProgressScreen : PresentationStack}
        options={{ title: formatMessage(TKeys.MENU_HOME), headerShown: false }}
      />
      <Tab.Screen
        name="PurificationTab"
        component={hasPurificationProgress ? PurificationProgressScreen : PurificationStack}
        options={{ title: formatMessage(TKeys.MENU_PURIFICATION), headerShown: false }}
      />
      <Tab.Screen
        name="SunnahsTab"
        component={hasSunnahsProgress ? SunnahsProgressScreen : SunnahsStack}
        options={{ title: formatMessage(TKeys.MENU_SUNNAHS), headerShown: false }}
      />
      <Tab.Screen
        name="InvocationsTab"
        component={InvocationsScreen}
        options={{ title: formatMessage(TKeys.MENU_INVOCATIONS) }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
