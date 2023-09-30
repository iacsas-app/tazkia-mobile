import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import DrawerNavigator from './DrawerNavigator';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
