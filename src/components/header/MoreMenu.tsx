import Icon from '@expo/vector-icons/SimpleLineIcons';

import { Box, HStack, IconButton } from '@react-native-material/core';
import { useState } from 'react';
import { Menu } from 'react-native-paper';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import Text from '../Text';
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
    <Box style={{ marginRight: 4 }}>
      <Menu
        visible={visible}
        onDismiss={hideMenu}
        anchor={
          <IconButton icon={(props) => <Icon name="options-vertical" {...props} onPress={showMenu} />} {...props} />
        }
      >
        <Menu.Item
          onPress={handleSettingPress}
          title={
            <HStack spacing={8}>
              <Icon name="settings" size={20} />
              <Text>{formatMessage(TKeys.MENU_SETTINGS)}</Text>
            </HStack>
          }
        />
      </Menu>
      <SettingsDialog open={showSettings} onClose={handleSettingDialogClose} />
    </Box>
  );
}
