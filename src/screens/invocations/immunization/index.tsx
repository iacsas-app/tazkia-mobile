import { useRoute } from '@react-navigation/native';
import React, { useMemo, useRef } from 'react';
import SimpleDialog, { SimpleDialogRef } from '../../../components/dialogs/SimpleDialog';
import ReaderDialog from '../../../components/dialogs/reader/ReaderDialog';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import { TKeys } from '../../../locales/constants';
import { ImmunizationScreenRouteProp } from '../../../navigation/types';
import Immunizations from './Immunizations';
import { immunizationData } from './data';

export default function ImmunizationInvocationsScreen() {
  const { period } = useRoute<ImmunizationScreenRouteProp>().params;
  const ref = useRef<SimpleDialogRef>(null);
  const data: InvocationRepeat[] = useMemo(() => immunizationData[period], []);

  function handleSelect(key?: TKeys, detailsId?: number) {
    ref.current?.open(key, detailsId);
  }

  return (
    <>
      <Immunizations items={data} onSelect={handleSelect} />
      <ReaderDialog items={data} />
      <SimpleDialog ref={ref} />
    </>
  );
}
