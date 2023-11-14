import Icon from '@expo/vector-icons/SimpleLineIcons';
import { Box, HStack, VStack } from '@react-native-material/core';
import { Button, Modal, Portal } from 'react-native-paper';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import Text from '../../Text';
import Settings from './Settings';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SettingsDialog({ open, onClose }: Props) {
  const { formatMessage } = useMessage();
  const { isDarkMode } = useApplication();
  const color = isDarkMode ? 'white' : 'black';
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <Portal>
      <Modal visible={open} onDismiss={onClose} contentContainerStyle={containerStyle}>
        <VStack spacing={30} style={{ alignContent: 'center', alignItems: 'center' }}>
          <HStack spacing={10}>
            <Icon name="settings" size={28} color="black" />
            <Text variant="headlineMedium" color="black" style={{ fontWeight: 'bold' }}>
              {formatMessage(TKeys.MENU_SETTINGS)}
            </Text>
          </HStack>
          <Box>
            <Settings color={color} />
          </Box>
          <Button mode="contained" icon={() => <Icon name="close" size={25} color={color} />} onPress={onClose}>
            {formatMessage(TKeys.BUTTON_CLOSE)}
          </Button>
        </VStack>
      </Modal>
    </Portal>
  );
}
