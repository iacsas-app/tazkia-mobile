import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  HStack,
  ListItem,
  Text,
} from '@react-native-material/core';
import { PurificationMode } from '..';
import { useMessage } from '../../../../hooks/use-message';
import { TKeys } from '../../../../locales/constants';

interface Props {
  open: boolean;
  partId: number;
  mode: PurificationMode;
  onClose: () => void;
}

export default function BodyPartsDialog({ open, partId, mode, onClose }: Props) {
  const { formatMessage } = useMessage();
  const props: any = {};

  return (
    <Dialog visible={open} onDismiss={onClose} {...props}>
      <DialogHeader
        title={
          <HStack spacing={8}>
            <Text variant="h5" style={{ fontWeight: 'bold' }}>
              {mode} {partId}
            </Text>
          </HStack>
        }
      />
      <DialogContent>
        {[
          'Aliquid tempora, possimus totam maxime',
          'Cumque repellat optio aliquid tempora',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit',
          'Dolor sit amet consectetur adipisicing elit',
        ].map((item: string, index: number) => (
          <ListItem
            key={index}
            title={item}
            leadingMode="avatar"
            leading={<Avatar label={<Text>{index + 1}</Text>} style={{ width: 35, height: 35 }} />}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button title={formatMessage(TKeys.BUTTON_CLOSE)} compact variant="text" onPress={onClose} />
      </DialogActions>
    </Dialog>
  );
}
