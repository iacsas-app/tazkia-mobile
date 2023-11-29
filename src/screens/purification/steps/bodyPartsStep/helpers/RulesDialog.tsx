import { capitalize } from 'lodash';
import * as React from 'react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import Text from '../../../../../components/Text';
import VStack from '../../../../../components/stack/VStack';
import { Font } from '../../../../../constants/Font';
import { SCREEN_HEIGHT } from '../../../../../constants/Screen';
import { BodyPartType, PurificationStage } from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import BodyPartsRules from '../rules/BodyPartRules';

export type RulesDialogRef = {
  open(part: BodyPartType, stage: PurificationStage): void;
  close(): void;
};
type State = {
  part: BodyPartType;
  stage: PurificationStage;
};
const RulesDialog = forwardRef<RulesDialogRef>(function RulesDialog(_, ref) {
  const [state, setState] = useState<State>();
  const { formatMessage } = useMessage();

  useImperativeHandle(
    ref,
    () => {
      return {
        open(part: BodyPartType, stage: PurificationStage) {
          setState({ part, stage });
        },
        close() {
          close();
        },
      };
    },
    [],
  );

  function close() {
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
        onDismiss={close}
        visible={state !== undefined}
        style={{ maxHeight: 0.9 * SCREEN_HEIGHT, backgroundColor: 'white' }}
      >
        <Dialog.Title style={{ paddingTop: 5 }}>
          <VStack style={GlobalStyles.center} spacing={5}>
            <Text variant="bodyLarge" style={styles.title} color="green">
              {stepTitle()}
            </Text>
            <Text variant="bodySmall" style={styles.system}>
              {formatMessage(`${state.stage}.bodypart.disciplinary-system`)}
            </Text>
          </VStack>
        </Dialog.Title>

        <Dialog.ScrollArea style={styles.smallPadding}>
          <BodyPartsRules part={state.part} step={state.stage} />
        </Dialog.ScrollArea>

        <Dialog.Actions>
          <Button onPress={close}>{formatMessage(TKeys.BUTTON_CLOSE)}</Button>
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
  },
  smallPadding: {
    paddingHorizontal: 0,
  },
  system: {
    fontSize: Font.size(14),
    fontWeight: '700',
  },
});

export default RulesDialog;
