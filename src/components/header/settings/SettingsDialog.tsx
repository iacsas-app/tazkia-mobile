import Icon from '@expo/vector-icons/SimpleLineIcons';
import { HStack, VStack } from '@react-native-material/core';
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
        <VStack spacing={20}>
          <HStack spacing={10}>
            <Icon name="settings" size={28} color={color} />
            <Text color={color} variant="h5" style={{ fontWeight: 'bold' }}>
              {formatMessage(TKeys.MENU_SETTINGS)}
            </Text>
          </HStack>
          <Settings color={color} />
          <Button mode="text" style={{ marginTop: 30 }} onPress={onClose}>
            {formatMessage(TKeys.BUTTON_CLOSE)}
          </Button>
        </VStack>
      </Modal>
    </Portal>
  );
}
