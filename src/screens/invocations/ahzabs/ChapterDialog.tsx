import * as React from 'react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import Text from '../../../components/Text';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
import { Font } from '../../../constants/Font';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';

export type ChapterDialogRef = {
  open(section: number, chapter: number): void;
  close(): void;
};

type DialogState = {
  section: number;
  chapter: number;
};

const ChapterDialog = forwardRef<ChapterDialogRef>((_, ref) => {
  const [state, setState] = useState<DialogState>();
  const { formatMessage } = useMessage();

  useImperativeHandle(
    ref,
    () => {
      return {
        open(section: number, chapter: number) {
          setState({ section, chapter });
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

  const { section, chapter } = state;
  const sectionKey = `invocations.ahzabs.section.${section}`;
  const isIntro = chapter === 0;
  const chapterTitleKey = `${sectionKey}.${isIntro ? 'introduction.title' : `chapter.${state.chapter}.title`}`;
  const contentKey = isIntro ? `${sectionKey}.introduction.summary` : `${sectionKey}.chapter.${chapter}.summary`;

  return (
    <Portal>
      <Dialog onDismiss={handleClose} visible={state !== undefined} style={styles.dialog}>
        <Dialog.Title style={{ paddingTop: 5 }}>
          <VStack style={GlobalStyles.center} spacing={5}>
            <Text variant="bodyLarge" style={styles.sectionTitle} color="seagreen">
              {formatMessage(sectionKey)}
            </Text>
            <Text variant="bodySmall" style={styles.chapterTitle} color="black">
              {formatMessage(chapterTitleKey)}
            </Text>
          </VStack>
        </Dialog.Title>
        <Dialog.ScrollArea style={styles.contentContainer}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={GlobalStyles.center}>
            <Animated.Text
              entering={FadeInUp.delay(300).duration(150).springify()}
              exiting={FadeOutDown}
              style={styles.contentText}
            >
              {formatMessage(contentKey)}
            </Animated.Text>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions style={GlobalStyles.center}>
          <Button
            mode="elevated"
            labelStyle={styles.closeBtnLabel}
            style={styles.closeBtn}
            uppercase={false}
            onPressIn={handleClose}
          >
            {formatMessage(TKeys.BUTTON_CLOSE)}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

const styles = StyleSheet.create({
  dialog: { maxHeight: 1 * SCREEN_HEIGHT, width: SCREEN_WIDTH - 40, marginLeft: 20, backgroundColor: 'white' },
  sectionTitle: {
    ...GlobalStyles.center,
    fontWeight: '900',
    fontSize: Font.size(18),
    width: SCREEN_WIDTH - 90,
    paddingTop: 5,
  },
  chapterTitle: {
    fontSize: Font.size(16),
    fontWeight: '700',
    paddingTop: 5,
  },
  contentContainer: {
    paddingHorizontal: 0,
    backgroundColor: Color.backgroundColor,
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
  closeBtn: { paddingHorizontal: 15 },
  closeBtnLabel: { fontSize: 16, fontWeight: '900', color: 'seagreen' },
});

export default ChapterDialog;
