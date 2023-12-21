import * as React from 'react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Dialog, FAB, Portal } from 'react-native-paper';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Color } from '../../constants/Color';
import { Font } from '../../constants/Font';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Screen';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import Text from '../Text';
import VStack from '../stack/VStack';

export type SimpleDialogRef = {
  open(keys: TKeys | TKeys[], titleKey?: TKeys, detailsKey?: number): void;
  close(): void;
};

type State = {
  keys: TKeys | TKeys[];
  titleKey?: TKeys;
  detailsKey?: number;
};

const SimpleDialog = forwardRef<SimpleDialogRef>((_, ref) => {
  const [state, setState] = useState<State>();
  const { formatMessage } = useMessage();

  useImperativeHandle(
    ref,
    () => {
      return {
        open(keys: TKeys | TKeys[], titleKey?: TKeys, detailsKey?: number) {
          setState({ keys, titleKey, detailsKey });
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
  }

  if (!state) {
    return <></>;
  }

  const { titleKey, keys, detailsKey } = state;
  const contentKeys = keys ? (Array.isArray(keys) ? keys : [keys]) : [];

  return (
    <Portal>
      <Dialog onDismiss={handleClose} visible={state !== undefined} style={GlobalStyles.defaultDialog}>
        <Dialog.ScrollArea style={styles.contentContainer}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={GlobalStyles.center}>
            <VStack style={styles.main} spacing={5}>
              {titleKey && (
                <Animated.Text entering={FadeInUp.duration(50).springify()} style={styles.title}>
                  {formatMessage(titleKey)}
                </Animated.Text>
              )}
              <Animated.View entering={FadeInDown.duration(50).springify()}>
                <VStack style={GlobalStyles.center}>
                  {contentKeys.map((key) => (
                    <Text variant="bodySmall" key={key} style={styles.contentText}>
                      {formatMessage(key)}
                    </Text>
                  ))}
                </VStack>
              </Animated.View>
            </VStack>
          </ScrollView>
          <FAB
            icon="close"
            style={GlobalStyles.closeFab}
            mode="elevated"
            size="small"
            onPress={handleClose}
            color="white"
          />
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
});

const styles = StyleSheet.create({
  dialog: {
    maxHeight: 1 * SCREEN_HEIGHT,
    width: SCREEN_WIDTH - 40,
    marginLeft: 20,
    backgroundColor: 'white',
  },
  title: {
    ...GlobalStyles.center,
    fontFamily: 'ReemKufiFun',
    fontSize: Font.size(22),
    width: SCREEN_WIDTH - 90,
    paddingTop: 5,
    color: Color.flatItemNoneBgColor,
  },
  main: {
    ...GlobalStyles.center,
    paddingBottom: 60,
  },
  body: { ...GlobalStyles.center, gap: 25 },
  contentContainer: {
    paddingHorizontal: 0,
    backgroundColor: Color.backgroundColor,
    marginBottom: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  contentText: {
    fontSize: Font.size(16),
    textAlign: 'justify',
    textAlignVertical: 'center',
    textShadowRadius: 1,
    fontFamily: 'AmiriQuran',
    lineHeight: 22,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default SimpleDialog;
