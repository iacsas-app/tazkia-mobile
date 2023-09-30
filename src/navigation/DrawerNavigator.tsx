import React from 'react';

import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';

import { Box } from '@react-native-material/core';
import { Image } from 'react-native';
import Header from '../components/header/Header';
import MoreMenu from '../components/header/MoreMenu';
import { useMessage } from '../hooks/use-message';
import ApproachScreen from '../screens/presentation/ApproachScreen';
import CenterScreen from '../screens/presentation/CenterScreen';
import CheikhScreen from '../screens/presentation/CheikhScreen';
import TabNavigator from './TabNavigator';

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <Box style={{ padding: 15, marginLeft: 10 }}>
        <Image source={require('../../assets/iacsas.png')} style={{ width: 180, height: 180 }} />
      </Box>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { formatMessage } = useMessage();

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerTitle: (_) => <Header />,
          headerRight: () => <MoreMenu size={10} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Centre"
        component={CenterScreen}
        options={{
          headerTitle: (_) => <Header />,
          headerRight: () => <MoreMenu size={10} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Cheikh"
        component={CheikhScreen}
        options={{
          headerTitle: (_) => <Header />,
          headerRight: () => <MoreMenu size={10} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Manhaj"
        component={ApproachScreen}
        options={{
          headerTitle: (_) => <Header />,
          headerRight: () => <MoreMenu size={10} color="black" />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
