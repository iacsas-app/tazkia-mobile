import * as React from 'react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Avatar, Dialog, FAB, Portal } from 'react-native-paper';
import Text from '../../../components/Text';
import HStack from '../../../components/stack/HStack';
import VStack from '../../../components/stack/VStack';
import { Color } from '../../../constants/Color';
import { Font } from '../../../constants/Font';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';
import { chaptersData } from './data';

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
  const summaryKey = `${sectionKey}.chapter.${chapter}.why`;
  const contentKey = isIntro ? `${sectionKey}.introduction.summary` : `${sectionKey}.chapter.${chapter}.summary`;
  const metaData = chaptersData[section];
  const info = metaData ? metaData[chapter] : undefined;
  const repeat = info ? info[0] : 0;
  const readAtSpecificTime = info ? info[1] : false;

  return (
    <Portal>
      <Dialog onDismiss={handleClose} visible={state !== undefined} style={styles.dialog}>
        <Dialog.Title style={{ paddingTop: 5 }}>
          <VStack style={GlobalStyles.center} spacing={5}>
            <Text variant="bodyLarge" style={{ ...styles.sectionTitle, color: 'seagreen' }}>
              {formatMessage(sectionKey)}
            </Text>
            <HStack style={GlobalStyles.center} spacing={10}>
              <Text variant="bodySmall" style={{ ...styles.chapterTitle, color: 'black' }}>
                {formatMessage(chapterTitleKey)}
              </Text>
              {!isIntro && <Avatar.Text label={chapter.toString()} size={25} style={styles.id} color="white" />}
            </HStack>
          </VStack>
        </Dialog.Title>
        <Dialog.ScrollArea style={styles.contentContainer}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={GlobalStyles.center}>
            {!isIntro && (
              <VStack style={styles.meta} spacing={15}>
                <VStack spacing={2}>
                  <Text variant="labelMedium" style={styles.chapterMetaTitle}>
                    {formatMessage(TKeys.INVOCATIONS_AHZABS_SECRET)}
                  </Text>
                  <Text variant="labelMedium" style={styles.chapterMetaContent}>
                    {formatMessage(summaryKey)}
                  </Text>
                </VStack>
                {readAtSpecificTime && (
                  <VStack spacing={2}>
                    <Text variant="labelMedium" style={styles.chapterMetaTitle}>
                      {formatMessage(TKeys.INVOCATIONS_AHZABS_WHEN)}
                    </Text>
                    <Text variant="labelMedium" style={styles.chapterMetaContent}>
                      {formatMessage(`${sectionKey}.chapter.${chapter}.when`)}
                    </Text>
                  </VStack>
                )}
              </VStack>
            )}
            <VStack style={{ paddingBottom: 50, ...GlobalStyles.center }} spacing={15}>
              <Text variant="bodyLarge" style={styles.contentText}>
                {formatMessage(contentKey)}
              </Text>
              {repeat > 0 && (
                <VStack spacing={5} style={{ ...GlobalStyles.center }}>
                  <Text
                    variant="bodyLarge"
                    style={{
                      fontSize: Font.size(18),
                      fontFamily: 'ReemKufiFun',
                      textAlign: 'justify',
                      textAlignVertical: 'center',
                    }}
                  >
                    {formatMessage(`${sectionKey}.chapter.${chapter}.repeat`)}
                  </Text>
                  <Text style={{ ...styles.tag, backgroundColor: Color.completed }}>
                    {formatMessage(
                      repeat === 1 ? TKeys.TIMES_COUNT : repeat < 11 ? TKeys.TIMES_COUNT_PLURAL : TKeys.TIMES_COUNTS,
                      {
                        times: repeat,
                      },
                    )}
                  </Text>
                </VStack>
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
    ...GlobalStyles.defaultDialog,
    borderRadius: 0,
    height: SCREEN_HEIGHT,
  },
  sectionTitle: {
    ...GlobalStyles.center,
    fontWeight: '900',
    fontSize: Font.size(18),
    width: SCREEN_WIDTH - 90,
    paddingTop: 5,
  },
  chapterTitle: {
    fontSize: Font.size(17),
    fontFamily: 'ReemKufiFun',
    paddingTop: 6,
  },
  id: { elevation: 2, backgroundColor: '#3db371' },
  meta: {
    alignItems: 'flex-start',
    paddingVertical: 15,
    backgroundColor: '#66cdaa4f',
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 15,
  },
  chapterMetaTitle: { paddingHorizontal: 10, fontWeight: '900', fontSize: Font.size(15) },
  chapterMetaContent: {
    color: 'teal',
    fontWeight: '700',
    paddingHorizontal: 10,
    fontSize: Font.size(15),
  },
  tag: {
    ...GlobalStyles.circle,
    fontSize: Font.size(14),
    paddingHorizontal: 20,
    opacity: 0.6,
    alignSelf: 'center',
    fontWeight: '800',
  },
  contentContainer: {
    paddingHorizontal: 0,
    backgroundColor: Color.backgroundColor,
    marginBottom: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  contentText: {
    fontSize: Font.size(18),
    textAlign: 'justify',
    textAlignVertical: 'center',
    lineHeight: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  closeBtn: { paddingHorizontal: 15 },
  closeBtnLabel: { fontSize: 16, fontWeight: '900', color: 'seagreen' },
});

export default ChapterDialog;
