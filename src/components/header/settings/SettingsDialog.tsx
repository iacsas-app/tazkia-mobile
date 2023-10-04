import Icon from '@expo/vector-icons/SimpleLineIcons';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  HStack,
  Stack,
  Text,
} from '@react-native-material/core';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import Settings from './Settings';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SettingsDialog({ open, onClose }: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const props: any = {};

  return (
    <Dialog visible={open} onDismiss={onClose} {...props}>
      <DialogHeader
        title={
          <HStack spacing={10} reverse={arabic}>
            <Icon name="settings" size={28} color="black" />
            <Text variant="h5" style={{ fontWeight: 'bold' }}>
              {formatMessage(TKeys.MENU_SETTINGS)}
            </Text>
          </HStack>
        }
      />
      <DialogContent>
        <Stack spacing={2} mt={10}>
          <Settings />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button title={formatMessage(TKeys.BUTTON_CLOSE)} compact variant="text" onPress={onClose} />
      </DialogActions>
    </Dialog>
  );
}
