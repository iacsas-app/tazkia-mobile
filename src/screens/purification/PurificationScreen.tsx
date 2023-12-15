import { lowerFirst } from 'lodash';
import { useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import Animated, { FadeInLeft, FadeInRight, FadeInUp, FadeOut } from 'react-native-reanimated';
import PressableStep, { Part } from '../../components/PressableStep';
import SimpleDialog, { SimpleDialogRef } from '../../components/dialogs/SimpleDialog';
import HStack from '../../components/stack/HStack';
import VStack from '../../components/stack/VStack';
import { Color } from '../../constants/Color';
import { Font } from '../../constants/Font';
import { SCREEN_WIDTH } from '../../constants/Screen';
import { PurificationType } from '../../domains/purification/Purification';
import { useMessage } from '../../hooks/use-message';
import usePurification from '../../hooks/use-purification';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import { actions, purificationStages } from './common/Helper';

export default function PurificationScreen() {
  const ref = useRef<SimpleDialogRef>(null);
  const { formatMessage } = useMessage();
  const [open, setOpen] = useState<boolean>(false);
  const { hasProgress } = usePurification();
  const parts: Part[] = useMemo(() => purificationStages, []);
  const actionKeys: Record<string, TKeys | TKeys[]> = useMemo(() => actions, []);

  function handleAction(key: TKeys) {
    ref.current?.open(actionKeys[key], key);
  }

  return (
    <>
      <VStack style={styles.container} spacing={23}>
        <VStack style={styles.top} spacing={5}>
          <HStack style={GlobalStyles.center} spacing={2}>
            <Animated.Text
              entering={FadeInRight.delay(200).duration(500).mass(2)}
              exiting={FadeOut}
              style={styles.title}
            >
              {formatMessage(TKeys.PURIFICATION_TITLE)}
              {' : '}
            </Animated.Text>
            <Animated.Text
              entering={FadeInLeft.delay(300).duration(500).mass(29)}
              exiting={FadeOut}
              style={styles.title}
            >
              {formatMessage(TKeys.PURIFICATION_TITLE_SUB)}
            </Animated.Text>
          </HStack>
          <Animated.Text entering={FadeInUp.delay(700).duration(700).mass(1)} exiting={FadeOut} style={styles.sourat}>
            {formatMessage(TKeys.SOURAT_A3LA)}
          </Animated.Text>
        </VStack>
        <VStack spacing={20}>
          {parts.map((item: Part, index: number) => (
            <PressableStep
              key={index}
              item={item}
              index={index}
              hasProgress={hasProgress(lowerFirst(item.route) as PurificationType)}
              style={styles.part}
            />
          ))}
        </VStack>
      </VStack>
      <FAB.Group
        open={open}
        icon={open ? 'window-close' : 'view-list'}
        actions={[
          {
            icon: 'gift',
            label: formatMessage(TKeys.DEDICATION),
            size: 'small',
            labelStyle: styles.action,
            onPress: () => handleAction(TKeys.DEDICATION),
          },
          {
            icon: 'script-text',
            label: formatMessage(TKeys.GENERAL_PRESENTATION_TITLE),
            labelStyle: styles.action,
            size: 'small',
            onPress: () => handleAction(TKeys.GENERAL_PRESENTATION_TITLE),
          },
          {
            icon: 'timeline-clock',
            label: formatMessage(TKeys.INVOCATION_NIVEAU_TITLE),
            labelStyle: styles.action,
            size: 'small',
            onPress: () => handleAction(TKeys.INVOCATION_NIVEAU_TITLE),
          },
          {
            icon: 'seal-variant',
            label: formatMessage(TKeys.CONCLUSION),
            labelStyle: styles.action,
            size: 'small',
            onPress: () => handleAction(TKeys.CONCLUSION),
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
        visible={true}
        variant="primary"
        fabStyle={{ ...GlobalStyles.center, width: 45, aspectRatio: 1 }}
        style={styles.fab}
      />
      <SimpleDialog ref={ref} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: Color.backgroundColor,
  },
  top: {
    ...GlobalStyles.center,
    marginTop: -40,
  },
  title: {
    fontWeight: '800',
    textShadowRadius: 2,
    color: 'black',
    fontSize: Font.size(18),
  },
  part: {
    width: SCREEN_WIDTH - 110,
    paddingVertical: 5,
    borderRadius: 25,
    elevation: 6,
  },
  sourat: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: Font.size(12),
    color: 'seagreen',
    backgroundColor: '#66cdaa0d',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    opacity: 0.9,
  },
  fab: { right: -5, bottom: -5, position: 'absolute' },
  action: { fontSize: 20, fontWeight: '900', textShadowRadius: 5 },
});
