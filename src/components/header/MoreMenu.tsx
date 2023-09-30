import Icon from '@expo/vector-icons/SimpleLineIcons';

import { HStack, IconButton, Text } from '@react-native-material/core';
import { useState } from 'react';
import { Menu, MenuItem } from 'react-native-material-menu';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import SettingsDialog from './settings/SettingsDialog';

interface MoreMenuProps {
  color: string;
  size: number;
}

export default function MoreMenu(props: MoreMenuProps) {
  const { formatMessage } = useMessage();
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  function handleSettingPress() {
    hideMenu();
    setShowSettings(true);
  }

  function handleSettingDialogClose() {
    setShowSettings(false);
  }

  return (
    <>
      <Menu
        visible={visible}
        anchor={
          <IconButton icon={(props) => <Icon name="options-vertical" {...props} onPress={showMenu} />} {...props} />
        }
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={handleSettingPress}>
          <HStack spacing={8}>
            <Icon name="settings" size={20} />
            <Text>{formatMessage(TKeys.MENU_SETTINGS)}</Text>
          </HStack>
        </MenuItem>
      </Menu>
      <SettingsDialog open={showSettings} onClose={handleSettingDialogClose} />
    </>
  );
}
