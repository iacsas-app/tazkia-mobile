import { useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Basmalah from '../../../components/Basmalah';
import Text from '../../../components/Text';
import ReaderDialog from '../../../components/dialogs/reader/ReaderDialog';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { ImmunizationScreenRouteProp } from '../../../navigation/types';
import Immunization from './Immunization';
import { immunizationData } from './data';

export default function ImmunizationInvocationsScreen() {
  const { formatMessage } = useMessage();
  const { period } = useRoute<ImmunizationScreenRouteProp>().params;
  const data: InvocationRepeat[] = useMemo(() => immunizationData[period], []);

  return (
    <>
      <View style={styles.header}>
        <Basmalah />
        <Text variant="bodyLarge" style={styles.introduction}>
          {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_INTRODUCTION)}
        </Text>
      </View>
      <Immunization items={data} />
      <ReaderDialog items={data} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: 'mintcream',
  },
  introduction: { textAlign: 'justify', fontWeight: '600', marginTop: 10, paddingBottom: 5 },
});
