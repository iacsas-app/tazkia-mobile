import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Image } from 'react-native';
import Header from '../components/header/Header';
import MoreMenu from '../components/header/MoreMenu';
import Stack from '../components/stack/Stack';
import ApproachScreen from '../screens/presentation/ApproachScreen';
import CenterScreen from '../screens/presentation/CenterScreen';
import CheikhScreen from '../screens/presentation/CheikhScreen';
import PurificationScreen from '../screens/purification/PurificationScreen';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <Stack style={{ padding: 15, marginLeft: 10 }}>
        <Image source={require('../../assets/iacsas.png')} style={{ width: 180, height: 180 }} />
      </Stack>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

type Props = {
  onOpenSettingDialog(): void;
};
const DrawerNavigator = ({ onOpenSettingDialog }: Props) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerTitle: (_) => <Header />,
          headerRight: () => <MoreMenu onClick={onOpenSettingDialog} />,
        }}
      />
      <Drawer.Screen
        name="Centre"
        component={CenterScreen}
        options={{
          headerTitle: (_) => <Header />,
          headerRight: () => <MoreMenu onClick={onOpenSettingDialog} />,
        }}
      />
      <Drawer.Screen
        name="Cheikh"
        component={CheikhScreen}
        options={{
          headerTitle: (_) => <Header />,
          headerRight: () => <MoreMenu onClick={onOpenSettingDialog} />,
        }}
      />
      <Drawer.Screen
        name="Manhaj"
        component={ApproachScreen}
        options={{
          headerTitle: (_) => <Header />,
          headerRight: () => <MoreMenu onClick={onOpenSettingDialog} />,
        }}
      />
      <Drawer.Screen
        name="Purification"
        component={PurificationScreen}
        options={{
          headerTitle: (_) => <Header />,
          headerRight: () => <MoreMenu onClick={onOpenSettingDialog} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
