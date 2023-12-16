import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { capitalize } from 'lodash';
import * as React from 'react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import Text from '../../../../../../components/Text';
import VStack from '../../../../../../components/stack/VStack';
import { Font } from '../../../../../../constants/Font';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../../../constants/Screen';
import { BodyPartType, PurificationStage } from '../../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../../hooks/use-message';
import { TKeys } from '../../../../../../locales/constants';
import { arabic } from '../../../../../../locales/messages/arabic';
import GlobalStyles from '../../../../../../styles/GlobalStyles';
import Rules from './Rules';

export type RulesDialogRef = {
  show(part: BodyPartType, stage: PurificationStage): void;
  evaluate(part: BodyPartType, stage: PurificationStage): void;
  close(): void;
};
export type ShowingMode = 'show' | 'evaluate';
type Props = {
  onEvaluate: (errors: number[]) => void;
};
type State = {
  mode: ShowingMode;
  part: BodyPartType;
  stage: PurificationStage;
  errors: number[];
};

const RulesDialog = forwardRef<RulesDialogRef, Props>((props, ref) => {
  const [state, setState] = useState<State>();
  const { formatMessage } = useMessage();

  useImperativeHandle(
    ref,
    () => {
      return {
        show(part: BodyPartType, stage: PurificationStage) {
          setState({ mode: 'show', part, stage, errors: [] });
        },
        evaluate(part: BodyPartType, stage: PurificationStage) {
          setState({ mode: 'evaluate', part, stage, errors: [] });
        },
        close() {
          handleClose();
        },
      };
    },
    [],
  );

  function handleErrorsChange(errors: number[]) {
    if (state) {
      setState({ ...state, errors });
    }
  }

  function handleEvaluate() {
    handleClose();
    if (state) {
      props.onEvaluate(state.errors.sort());
    }
  }

  function handleClose() {
    setState(undefined);
  }

  function stepTitle(): string {
    if (!state) {
      return '';
    }
    const partName = formatMessage(`purification.body-parts.${state.part}`).toLowerCase();
    return capitalize(formatMessage(`purification.bodypart.${state.stage}.phase`, { part: partName }));
  }

  if (!state) {
    return <></>;
  }

  const isEvaluateMode = state.mode === 'evaluate';

  return (
    <Portal>
      <Dialog onDismiss={handleClose} visible={state !== undefined} style={styles.dialog}>
        <Dialog.Title style={{ paddingTop: 20 }}>
          <VStack style={GlobalStyles.center} spacing={7}>
            <Text variant="bodyMedium" style={styles.title}>
              {stepTitle()}
            </Text>
            <Text variant="bodySmall" style={{ ...styles.system, fontSize: Font.size(arabic ? 14 : 12) }}>
              {formatMessage(
                state.mode === 'evaluate'
                  ? TKeys.PROGRESS_EVALUATION_MESSAGE
                  : `${state.stage}.bodypart.disciplinary-system`,
              )}
            </Text>
          </VStack>
        </Dialog.Title>
        <Dialog.ScrollArea style={styles.smallPadding}>
          <Rules mode={state.mode} part={state.part} step={state.stage} onChange={handleErrorsChange} />
        </Dialog.ScrollArea>
        <Dialog.Actions style={{ ...GlobalStyles.center, gap: 10 }}>
          {isEvaluateMode && (
            <Button
              mode="elevated"
              icon={() => <Icon name="check-all" size={20} color="seagreen" />}
              labelStyle={styles.labelBtn}
              style={styles.btn}
              uppercase={false}
              onPressIn={handleEvaluate}
            >
              {formatMessage(TKeys.BUTTON_SAVE)}
            </Button>
          )}
          <Button
            mode="contained-tonal"
            icon={() => <Icon name="close" size={20} color="black" />}
            labelStyle={{ ...styles.labelBtn, color: '#000' }}
            style={{ ...styles.btn, backgroundColor: '#95a59a38' }}
            uppercase={false}
            onPressIn={handleClose}
          >
            {formatMessage(isEvaluateMode ? TKeys.BUTTON_CANCEL : TKeys.BUTTON_CLOSE)}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

const styles = StyleSheet.create({
  dialog: { maxHeight: 0.9 * SCREEN_HEIGHT, backgroundColor: 'white' },
  title: {
    ...GlobalStyles.center,
    width: SCREEN_WIDTH - 90,
    color: 'seagreen',
    fontWeight: '900',
    fontSize: Font.size(16),
  },
  smallPadding: {
    paddingHorizontal: 0,
  },
  system: {
    fontWeight: '900',
    marginHorizontal: 5,
  },
  labelBtn: { fontSize: 15, fontWeight: '900', color: 'seagreen' },
  btn: { paddingVertical: 4 },
});

export default RulesDialog;
