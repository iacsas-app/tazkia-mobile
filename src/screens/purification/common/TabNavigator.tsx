import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';

export type TabParams = {
  Presentation: undefined;
  Purification: undefined;
  Invocation: undefined;
  Sunnahs: undefined;
  Obstacles: undefined;
};

type Props = {
  hasProgress: boolean;
  presentationComponent: any;
  purificationComponent: any;
  invocationComponent: any;
  sunnahsComponent?: any;
  obstaclesComponent?: any;
};
export default function TabNavigator(props: Props) {
  const { formatMessage } = useMessage();
  const Tab = createMaterialTopTabNavigator<TabParams>();

  return (
    <Tab.Navigator
      initialRouteName={props.hasProgress ? 'Purification' : 'Presentation'}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: '800' },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name="Presentation"
        component={props.presentationComponent}
        options={{ tabBarLabel: formatMessage(TKeys.MENU_PRESENTATION) }}
      />
      <Tab.Screen
        name="Purification"
        component={props.purificationComponent}
        options={{ tabBarLabel: formatMessage(TKeys.MENU_PURIFICATION) }}
      />
      <Tab.Screen
        name="Invocation"
        component={props.invocationComponent}
        options={{
          tabBarLabel: formatMessage(TKeys.MENU_INVOCATION),
        }}
      />
      {props.sunnahsComponent && (
        <Tab.Screen
          name="Sunnahs"
          component={props.sunnahsComponent}
          options={{
            tabBarLabel: formatMessage(TKeys.MENU_SUNNAHS),
          }}
        />
      )}
      {props.obstaclesComponent && (
        <Tab.Screen
          name="Obstacles"
          component={props.obstaclesComponent}
          options={{
            tabBarLabel: formatMessage(TKeys.MENU_OBSTACLES),
          }}
        />
      )}
    </Tab.Navigator>
  );
}
