import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Dialog, FAB, Portal } from 'react-native-paper';
import { Color } from '../../constants/Color';
import { Font } from '../../constants/Font';
import { SCREEN_HEIGHT } from '../../constants/Screen';
import ProgressLine from '../../domains/common/ProgressLine';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import { formatDate, switchScreenOrientation } from '../../services/Helpers';
import GlobalStyles from '../../styles/GlobalStyles';
import Text from '../Text';
import HStack from '../stack/HStack';
import VStack from '../stack/VStack';

export type ProgressDialogRef = {
  open(
    primaryTitle: string,
    secondaryTitle: string | undefined,
    subTitle: string | undefined,
    progress: ProgressLine[],
    maxDays: number,
  ): void;
  close(): void;
};

type State = {
  primaryTitle: string;
  secondaryTitle?: string;
  subTitle?: string;
  progress: ProgressLine[];
  maxDays: number;
};

const ProgressDialog = forwardRef<ProgressDialogRef>((_, ref) => {
  const [state, setState] = useState<State>();
  const { formatMessage } = useMessage();

  useImperativeHandle(
    ref,
    () => {
      return {
        open(
          primaryTitle: string,
          secondaryTitle: string | undefined,
          subTitle: string | undefined,
          progress: ProgressLine[],
          maxDays: number,
        ) {
          setState({ primaryTitle, secondaryTitle, subTitle, progress, maxDays });
        },
        close() {
          handleClose();
        },
      };
    },
    [],
  );

  function handleClose() {
    setState(undefined);
    switchScreenOrientation();
  }

  if (!state) {
    return <></>;
  }

  const { primaryTitle, secondaryTitle, subTitle, progress, maxDays } = state;

  return (
    <Portal>
      <Dialog onDismiss={handleClose} visible={state !== undefined} style={styles.dialog}>
        <VStack style={{ minHeight: 70, marginTop: 8 }} spacing={13}>
          <HStack style={{ ...GlobalStyles.center }} spacing={8}>
            <Text variant="bodyMedium" style={styles.title}>
              {primaryTitle}
            </Text>
            {secondaryTitle !== undefined && (
              <Text variant="bodySmall" style={styles.secondaryTitle}>
                {` ( ${secondaryTitle} )`}
              </Text>
            )}
            {subTitle !== undefined && (
              <>
                <Text variant="bodyMedium" style={styles.title}>
                  {' :'}
                </Text>
                <Text variant="bodyMedium" style={styles.subTitle}>
                  {subTitle}
                </Text>
              </>
            )}
          </HStack>
          <View style={styles.header}>
            <View style={{ ...styles.dayHeader, flex: 3 }}>
              <Text style={styles.startDateValue}>{formatMessage(TKeys.PROGRESS_START_DATE)}</Text>
            </View>
            {Array.from({ length: maxDays }, (_, i) => i + 1).map((i) => (
              <View key={i} style={{ ...styles.dayHeader, flex: 1 }}>
                <Text style={styles.dayValue}>{i}</Text>
              </View>
            ))}
          </View>
        </VStack>
        <ScrollView style={{ maxHeight: 0.7 * SCREEN_HEIGHT }}>
          {progress.map((line, index) => (
            <View key={index} style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  ...styles.cellValue,
                  flex: 3,
                  backgroundColor: Color.active,
                }}
              >
                <Text style={{ fontSize: 9 }}>{formatDate(line.startDate)}</Text>
              </View>
              {Array.from({ length: maxDays }, (_, i) => i + 1).map((i) => (
                <View
                  key={`${index}_${i}`}
                  style={{
                    ...styles.cellValue,
                    flex: 1,
                    backgroundColor: 'white',
                  }}
                >
                  <Text style={{ fontSize: 9 }}>
                    {line.day - i >= 0 ? (
                      <Icon name="check-circle" size={15} color="green" />
                    ) : line.errors.length > 0 && line.day - i === -1 ? (
                      <Icon name="close-circle" size={15} color="red" />
                    ) : (
                      ''
                    )}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
        <FAB icon="close" style={styles.fabClose} mode="elevated" size="small" onPress={handleClose} color="white" />
      </Dialog>
    </Portal>
  );
});

const styles = StyleSheet.create({
  dialog: {
    height: '100%',
    width: '100%',
    marginLeft: 0,
    borderRadius: 0,
    padding: 0,
    margin: 0,
  },
  title: {
    ...GlobalStyles.center,
    fontFamily: 'ReemKufiFun',
    fontSize: Font.size(20),
    color: Color.flatItemNoneBgColor,
    lineHeight: 25,
  },
  secondaryTitle: {
    ...GlobalStyles.center,
    fontFamily: 'Cairo',
    fontSize: Font.size(11),
    color: 'teal',
    lineHeight: 20,
  },
  subTitle: {
    fontSize: Font.size(15),
    textAlign: 'justify',
    textAlignVertical: 'center',
    textShadowRadius: 1,
    fontFamily: 'AmiriQuran',
    lineHeight: 25,
  },
  dayHeader: {
    ...GlobalStyles.center,
    borderRightWidth: 0.5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  dayValue: { fontSize: 9, fontWeight: '900' },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Color.backgroundColor,
    maxHeight: 30,
  },
  startDateValue: { fontSize: 9, fontWeight: '900' },
  cellValue: { ...GlobalStyles.center, borderRightWidth: 0.5, borderBottomWidth: 0.5, borderTopWidth: 0.5 },
  fabClose: {
    borderRadius: 100,
    position: 'absolute',
    left: 2,
    top: 2,
    backgroundColor: Color.flatItemNoneBgColor,
  },
});

export default ProgressDialog;
