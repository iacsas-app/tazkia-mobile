import { Avatar, VStack } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import BodyPart, { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { BodyPartProgressScreenRouteProp } from '../../../../../navigation/types';
import { useSnackbar } from '../../../../../providers/SnackbarProvider';
import { PurificationStage } from '../tabs/HomeScreen';
import { findPartProps } from '../common/Helper';
import BodyPartEvaluationDialog from '../evaluation/BodyPartEvaluationDialog';
import BodyPartProgress from './BodyPartProgress';

interface State {
  type: BodyPartType;
  stage: PurificationStage;
}

export default function BodyPartProgressScreen() {
  const { value } = useRoute<BodyPartProgressScreenRouteProp>().params;
  const { formatMessage } = useMessage();
  const [state, setState] = useState<State>();
  const { displaySnackbar } = useSnackbar();

  function handleShowEvaluate(type: BodyPartType, stage: PurificationStage) {
    setState({ type, stage });
  }

  function handleSaveEvaluate() {
    setState(undefined);
    displaySnackbar(formatMessage(TKeys.MESSAGE_EVALUATED_SUCCESSFULLY), 'success');
  }

  return (
    <>
      <ScrollViewLayout>
        <Avatar image={findPartProps(value.name)} size={80} />
        <VStack spacing={15} mt={15} mb={15}>
          {['cleaning', 'enlightenment'].map((step) => {
            const lines: ProgressLine[] = value[step as keyof BodyPart['cleaning' | 'enlightenment']];
            return (
              lines && (
                <VStack key={step}>
                  <BodyPartProgress stage={step as any} type={value.name} onShowEvaluate={handleShowEvaluate} />
                </VStack>
              )
            );
          })}
        </VStack>
      </ScrollViewLayout>
      {state && <BodyPartEvaluationDialog {...state} onSave={handleSaveEvaluate} />}
    </>
  );
}
