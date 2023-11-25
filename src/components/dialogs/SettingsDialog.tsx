import Icon from '@expo/vector-icons/SimpleLineIcons';
import * as React from 'react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import Text from '../Text';
import Settings from '../header/settings/Settings';
import HStack from '../stack/HStack';

export type SettingsDialogRef = {
  open(): void;
  close(): void;
};

const SettingsDialog = forwardRef<SettingsDialogRef>(function SettingsDialog({}, ref) {
  const { formatMessage } = useMessage();
  const [visible, setVisible] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          setVisible(true);
        },
        close() {
          setVisible(false);
        },
      };
    },
    [],
  );

  function handleClose() {
    setVisible(false);
  }

  return (
    <Portal>
      <Dialog onDismiss={handleClose} visible={visible} style={{ ...GlobalStyles.center, backgroundColor: 'white' }}>
        <HStack spacing={20} style={styles.title}>
          <Icon name="settings" size={35} color="seagreen" />
          <Text variant="headlineMedium" color="seagreen" style={{ fontWeight: '900' }}>
            {formatMessage(TKeys.MENU_SETTINGS)}
          </Text>
        </HStack>
        <Dialog.Content>
          <View style={styles.flexing}>
            <Settings onClick={handleClose} />
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
});

const styles = StyleSheet.create({
  title: {
    marginBottom: 25,
  },
  flexing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 16,
  },
});

export default SettingsDialog;
