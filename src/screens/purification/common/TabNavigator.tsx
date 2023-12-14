import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Font } from '../../../constants/Font';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { useGlobal } from '../../../providers/AppProvider';

export type TabParams = {
  Presentation: undefined;
  Methodology: undefined;
  Invocation: undefined;
  Sunnahs: undefined;
};

type Props = {
  name: string;
  hasProgress: boolean;
  presentationComponent: any;
  purificationComponent: any;
  invocationComponent: any;
  sunnahsComponent: any;
};
export default function TabNavigator(props: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useGlobal();
  const Tab = createMaterialTopTabNavigator<TabParams>();

  return (
    <Tab.Navigator
      id={props.name}
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
