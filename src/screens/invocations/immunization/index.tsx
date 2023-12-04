import { VStack } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Basmalah from '../../../components/Basmalah';
import Text from '../../../components/Text';
import ReaderDialog from '../../../components/dialogs/reader/ReaderDialog';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { InvocationsScreenRouteProp } from '../../../navigation/types';
import BasePresentationLayout from '../../presentation/common/BasePresentationLayout';
import Immunization from './Immunization';
import { immunizationData } from './data';

export default function ImmunizationInvocationsScreen() {
  const { formatMessage } = useMessage();
  const { period } = useRoute<InvocationsScreenRouteProp>().params;

  const data: InvocationRepeat[] = useMemo(() => immunizationData[period], []);

  return (
    <>
      <BasePresentationLayout>
        <View style={styles.container}>
          <VStack spacing={10}>
            <Basmalah />
            <Text variant="bodyLarge" style={styles.introduction}>
              {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_INTRODUCTION)}
            </Text>
          </VStack>
          <Immunization period={period} items={data} />
          <Text variant="bodyLarge" style={styles.conclusion}>
            {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_CONCLUSION)}
          </Text>
        </View>
      </BasePresentationLayout>
      <ReaderDialog items={data} />
    </>
  );
}

const styles = StyleSheet.create({
  container: { width: SCREEN_WIDTH - 15, paddingBottom: 70, paddingHorizontal: 5 },
  introduction: { textAlign: 'justify', fontWeight: '600', paddingHorizontal: 10, paddingTop: 20 },
  conclusion: { textAlign: 'justify', fontWeight: '600', marginTop: 30, paddingHorizontal: 10 },
});
