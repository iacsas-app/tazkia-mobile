import Icon from '@expo/vector-icons/SimpleLineIcons';
import { Button, Dialog, DialogActions, DialogContent, DialogHeader, HStack } from '@react-native-material/core';
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
  const { arabic, isDarkMode } = useApplication();
  const color = isDarkMode ? 'white' : 'black';
  const props: any = {};

  return (
    <Dialog visible={open} onDismiss={onClose} {...props}>
      <DialogHeader
        title={
          <HStack spacing={10}>
            <Icon name="settings" size={28} color={color} />
            <Text color={color} variant="h5" style={{ fontWeight: 'bold' }}>
              {formatMessage(TKeys.MENU_SETTINGS)}
            </Text>
          </HStack>
        }
      />
      <DialogContent>
        <Settings color={color} />
      </DialogContent>
      <DialogActions>
        <Button title={formatMessage(TKeys.BUTTON_CLOSE)} variant="text" onPress={onClose} />
      </DialogActions>
    </Dialog>
  );
}
