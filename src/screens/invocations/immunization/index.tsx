import { useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import ReaderDialog from '../../../components/dialogs/reader/ReaderDialog';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import { ImmunizationScreenRouteProp } from '../../../navigation/types';
import Immunizations from './Immunizations';
import { immunizationData } from './data';

export default function ImmunizationInvocationsScreen() {
  const { period } = useRoute<ImmunizationScreenRouteProp>().params;
  const data: InvocationRepeat[] = useMemo(() => immunizationData[period], []);

  return (
    <>
      <Immunizations items={data} onSelect={() => {}} />
      <ReaderDialog items={data} />
    </>
  );
}
