import * as React from 'react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Dialog, FAB, Portal } from 'react-native-paper';
import Animated, { FadeInDown, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
import { Font } from '../../../constants/Font';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';

export type ImmunizationDialogRef = {
  open(key?: TKeys, detailsId?: number): void;
  close(): void;
};

type State = {
  key: TKeys | undefined;
  detailsId: number;
};

const ImmunizationDialog = forwardRef<ImmunizationDialogRef>((_, ref) => {
  const [state, setState] = useState<State>();
  const { formatMessage } = useMessage();

  useImperativeHandle(
    ref,
    () => {
      return {
        open(key: TKeys | undefined, detailsId: number) {
          setState({ key, detailsId });
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

  const { key, detailsId } = state;
  const bodyKey = key ?? TKeys.INVOCATIONS_IMMUNIZATION_INTRODUCTION;
  const isIntro = !key;

  return (
    <Portal>
      <Dialog onDismiss={handleClose} visible={state !== undefined} style={GlobalStyles.defaultDialog}>
        <Dialog.ScrollArea style={styles.contentContainer}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={GlobalStyles.center}>
            <VStack style={styles.main} spacing={5}>
              {isIntro && (
                <Animated.Text
                  entering={FadeInUp.delay(100).duration(100).springify()}
                  exiting={FadeOutDown}
                  style={styles.title}
                >
                  {formatMessage(TKeys.GENERAL_PRESENTATION_TITLE)}
                </Animated.Text>
              )}
              <Animated.Text
                entering={FadeInDown.delay(250).duration(200).springify()}
                exiting={FadeOutDown}
                style={styles.contentText}
              >
                {formatMessage(bodyKey)}
              </Animated.Text>
              {isIntro && (
                <>
                  <Animated.Text
                    entering={FadeInUp.delay(100).duration(100).springify()}
                    exiting={FadeOutDown}
                    style={styles.title}
                  >
                    {formatMessage(TKeys.INITIATION_TITLE)}
                  </Animated.Text>
                  <Animated.Text
                    entering={FadeInDown.delay(250).duration(200).springify()}
                    exiting={FadeOutDown}
                    style={{ ...styles.contentText }}
                  >
                    {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_INITIATION)}
                  </Animated.Text>
                </>
              )}
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
    fontWeight: '900',
    fontSize: Font.size(20),
    width: SCREEN_WIDTH - 90,
    paddingTop: 5,
    color: Color.flatItemNoneBgColor,
  },
  main: {
    ...GlobalStyles.center,
    paddingBottom: 60,
  },
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
    lineHeight: 22,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default ImmunizationDialog;
