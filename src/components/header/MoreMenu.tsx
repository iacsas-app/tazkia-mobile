import Icon from '@expo/vector-icons/MaterialIcons';
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
        style={{ marginTop: 35 }}
        anchor={<IconButton icon={(props) => <Icon name="more-vert" {...props} onPress={showMenu} />} {...props} />}
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={handleSettingPress}>
          <HStack spacing={6} justify="center">
            <Icon name="settings" size={20} />
            <Text>{formatMessage(TKeys.MENU_SETTINGS)}</Text>
          </HStack>
        </MenuItem>
      </Menu>
      <SettingsDialog open={showSettings} onClose={handleSettingDialogClose} />
    </>
  );
}
