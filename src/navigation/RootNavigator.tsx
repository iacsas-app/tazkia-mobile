import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DrawerNavigator from './DrawerNavigator';

const RootNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
