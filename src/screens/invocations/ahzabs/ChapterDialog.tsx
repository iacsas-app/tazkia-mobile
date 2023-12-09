import * as React from 'react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Dialog, FAB, Portal } from 'react-native-paper';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import Text from '../../../components/Text';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
import { Font } from '../../../constants/Font';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { useMessage } from '../../../hooks/use-message';
import GlobalStyles from '../../../styles/GlobalStyles';

export type ChapterDialogRef = {
  open(section: number, chapter: number): void;
  close(): void;
};

type State = {
  section: number;
  chapter: number;
};

const ChapterDialog = forwardRef<ChapterDialogRef>((_, ref) => {
  const [state, setState] = useState<State>();
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
      <Dialog onDismiss={handleClose} visible={state !== undefined} style={GlobalStyles.defaultDialog}>
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
    paddingBottom: 60,
  },
  closeBtn: { paddingHorizontal: 15 },
  closeBtnLabel: { fontSize: 16, fontWeight: '900', color: 'seagreen' },
});

export default ChapterDialog;
