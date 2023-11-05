import { VStack } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { InvocationsScreenRouteProp } from '../../../navigation/types';
import BasePresentationLayout from '../../presentation/common/BasePresentationLayout';
import Immunization from './Immunization';

export default function ImmunizationInvocationsScreen() {
  const { formatMessage } = useMessage();
  const { period } = useRoute<InvocationsScreenRouteProp>().params;
  const { width } = useWindowDimensions();

  return (
    <BasePresentationLayout>
      <View style={{ width: width - 15 }}>
        <VStack spacing={10} style={{ marginBottom: 15 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '900',
              textAlign: 'justify',
            }}
          >
            {formatMessage(TKeys.BASMALAH)}
          </Text>
          <Text style={{ textAlign: 'justify', fontWeight: '600' }}>
            {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_INTRODUCTION)}
          </Text>
        </VStack>
        <Immunization period={period} />
        <Text style={{ textAlign: 'justify', fontWeight: '600', marginTop: 10 }}>
          {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_CONCLUSION)}
        </Text>
      </View>
    </BasePresentationLayout>
  );
}
