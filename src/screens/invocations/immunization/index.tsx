import { VStack } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import Basmalah from '../../../components/Basmalah';
import Text from '../../../components/Text';
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
          <Basmalah />
          <Text variant="bodyLarge" style={{ textAlign: 'justify', fontWeight: '600' }}>
            {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_INTRODUCTION)}
          </Text>
        </VStack>
        <Immunization period={period} />
        <Text variant="bodyLarge" style={{ textAlign: 'justify', fontWeight: '600', marginTop: 10 }}>
          {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_CONCLUSION)}
        </Text>
      </View>
    </BasePresentationLayout>
  );
}
