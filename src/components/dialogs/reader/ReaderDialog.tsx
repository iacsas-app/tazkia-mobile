import { useKeepAwake } from 'expo-keep-awake';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Modal, Portal } from 'react-native-paper';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';
import Reader from './Reader';

type Props = {
  items: InvocationRepeat[];
};

export default function ReaderDialog(props: Props) {
  useKeepAwake(); // This screen will never sleep!
  const [visible, setVisible] = useState(false);
  const { formatMessage } = useMessage();

  function toogleFullScreen() {
    setVisible(!visible);
  }

  if (!visible) {
    return (
      <FAB
        icon="fullscreen"
        label={formatMessage(TKeys.BUTTON_READ_START)}
        style={styles.readFab}
        mode="elevated"
        size="medium"
        onPress={toogleFullScreen}
      />
    );
  }

  return (
    <Portal>
      <Modal visible={true} onDismiss={toogleFullScreen} contentContainerStyle={styles.dialog}>
        <Reader items={props.items} onFinished={toogleFullScreen} />
      </Modal>
      <FAB icon="fullscreen-exit" style={styles.readFab} mode="elevated" size="medium" onPress={toogleFullScreen} />
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: { height: SCREEN_HEIGHT, width: SCREEN_WIDTH, backgroundColor: '#f5fffa', padding: 0, margin: 0 },
  labelBtn: { fontSize: 18, fontWeight: '900', color: 'seagreen' },
  btn: { paddingHorizontal: 15 },
  readFab: {
    ...GlobalStyles.circle,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 5,
    margin: 10,
    backgroundColor: 'powderblue',
    opacity: 0.9,
  },
});
