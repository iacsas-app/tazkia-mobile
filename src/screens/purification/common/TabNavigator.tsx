import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect } from 'react';
import { Font } from '../../../constants/Font';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';

export type TabParams = {
  Presentation: undefined;
  Methodology: undefined;
  Invocation: undefined;
  Sunnahs: undefined;
  Obstacles: undefined;
};

type Props = {
  hasProgress: boolean;
  presentationComponent: any;
  purificationComponent: any;
  invocationComponent: any;
  sunnahsComponent: any;
};
export default function TabNavigator(props: Props) {
  const { formatMessage } = useMessage();
  const { setIsPurification } = useApplication();
  const { arabic } = useApplication();
  const Tab = createMaterialTopTabNavigator<TabParams>();

  useEffect(() => {
    setIsPurification(true);
    return () => setIsPurification(false);
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={props.hasProgress ? 'Methodology' : 'Presentation'}
      screenOptions={{
        tabBarLabelStyle: { fontSize: Font.size(arabic ? 15 : 9), fontWeight: '800', textTransform: 'none' },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name="Presentation"
        component={props.presentationComponent}
        options={{ tabBarLabel: formatMessage(TKeys.MENU_PRESENTATION) }}
      />
      <Tab.Screen
        name="Methodology"
        component={props.purificationComponent}
        options={{ tabBarLabel: formatMessage(TKeys.MENU_METHODOLOGY) }}
      />
      <Tab.Screen
        name="Invocation"
        component={props.invocationComponent}
        options={{
          tabBarLabel: formatMessage(TKeys.MENU_INVOCATION),
        }}
      />
      <Tab.Screen
        name="Sunnahs"
        component={props.sunnahsComponent}
        options={{
          tabBarLabel: formatMessage(TKeys.MENU_SUNNAHS),
        }}
      />
    </Tab.Navigator>
  );
}
