import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SettingsDialog, { SettingsDialogRef } from '../components/dialogs/SettingsDialog';
import DrawerNavigator from './DrawerNavigator';

const RootNavigator = () => {
  const ref = useRef<SettingsDialogRef>(null);
  const openSettingDialog = useCallback(() => ref.current?.open(), []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <DrawerNavigator onOpenSettingDialog={openSettingDialog} />
      </NavigationContainer>
      <SettingsDialog ref={ref} />
    </SafeAreaProvider>
  );
};

export default RootNavigator;
