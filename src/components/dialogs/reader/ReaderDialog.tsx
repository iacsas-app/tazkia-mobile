import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Modal, Portal } from 'react-native-paper';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import { useMessage } from '../../../hooks/use-message';
import GlobalStyles from '../../../styles/GlobalStyles';
import Reader from './Reader';

type Props = {
  items: InvocationRepeat[];
};

export default function ReaderDialog(props: Props) {
  const [visible, setVisible] = useState(false);
  const { formatMessage } = useMessage();

  function toogleFullScreen() {
    setVisible(!visible);
  }

  return (
    <Portal>
      {visible && (
        <Modal visible={true} onDismiss={toogleFullScreen} contentContainerStyle={styles.dialog}>
          <Reader items={props.items} />
        </Modal>
      )}
      <FAB
        icon={visible ? 'fullscreen-exit' : 'fullscreen'}
        label={formatMessage(`button.read.${visible ? 'stop' : 'start'}`)}
        style={{ ...styles.readFab, bottom: visible ? 30 : 45 }}
        onPress={toogleFullScreen}
      />
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: { height: SCREEN_HEIGHT, width: SCREEN_WIDTH, backgroundColor: '#d5f3e3', padding: 0, margin: 0 },
  labelBtn: { fontSize: 18, fontWeight: '900', color: 'seagreen' },
  btn: { paddingHorizontal: 15 },
  readFab: {
    ...GlobalStyles.circle,
    alignSelf: 'center',
    position: 'absolute',
    margin: 10,
    backgroundColor: 'powderblue',
  },
});
