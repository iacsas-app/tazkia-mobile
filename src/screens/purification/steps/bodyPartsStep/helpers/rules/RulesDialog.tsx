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
    if (state) {
      props.onEvaluate(state.errors.sort());
    }
    handleClose();
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

  return (
    <Portal>
      <Dialog
        onDismiss={handleClose}
        visible={state !== undefined}
        style={{ maxHeight: 0.9 * SCREEN_HEIGHT, backgroundColor: 'white' }}
      >
        <Dialog.Title style={{ paddingTop: 20 }}>
          <VStack style={GlobalStyles.center} spacing={5}>
            <Text variant="bodyLarge" style={styles.title} color="seagreen">
              {stepTitle()}
            </Text>
            <Text variant="bodySmall" style={styles.system}>
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
          {state.mode === 'evaluate' && (
            <Button
              mode="elevated"
              labelStyle={styles.labelBtn}
              style={styles.btn}
              uppercase={false}
              onPressIn={handleEvaluate}
            >
              {formatMessage(TKeys.BUTTON_SAVE)}
            </Button>
          )}
          <Button
            mode="text"
            labelStyle={{ ...styles.labelBtn, color: 'black' }}
            style={styles.btn}
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
  title: {
    ...GlobalStyles.center,
    fontWeight: '900',
    fontSize: Font.size(18),
    width: SCREEN_WIDTH - 90,
  },
  smallPadding: {
    paddingHorizontal: 0,
  },
  system: {
    fontSize: Font.size(14),
    fontWeight: '700',
  },
  labelBtn: { fontSize: 18, fontWeight: '900', color: 'seagreen' },
  btn: { paddingHorizontal: 15 },
});

export default RulesDialog;
