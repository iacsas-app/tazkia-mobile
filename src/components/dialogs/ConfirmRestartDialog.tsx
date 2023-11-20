import * as React from 'react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import { TextComponent } from './TextComponent';

export type ConfirmRestartDialogRef = {
  open(): void;
  close(): void;
};
type Props = {
  onConfirm(confirm: boolean): void;
};
const ConfirmRestartDialog = forwardRef<ConfirmRestartDialogRef, Props>(function ConfirmRestartDialog(props, ref) {
  const { formatMessage } = useMessage();
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      open() {
        setVisible(true);
      },
      close() {
        setVisible(false);
      },
    };
  });

  return (
    <Portal>
      <Dialog visible={visible} dismissable={false} style={{ backgroundColor: 'white' }}>
        <Dialog.Title style={{ fontWeight: '700' }}>{formatMessage(TKeys.RESTART_CONFIRM_TITLE)}</Dialog.Title>
        <Dialog.Content>
          <TextComponent>{formatMessage(TKeys.RESTART_CONFIRM_MESSAGE)}</TextComponent>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => props.onConfirm(true)} mode="elevated" textColor="green">
            {formatMessage(TKeys.BUTTON_AGREE)}
          </Button>
          <Button onPress={() => props.onConfirm(false)} mode="elevated" textColor="red">
            {formatMessage(TKeys.BUTTON_DISAGREE)}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default ConfirmRestartDialog;
