import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import BottomTabs from './BottomTabs';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};

export default RootNavigator;
