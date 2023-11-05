import { Stack, VStack } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { I18nManager, Text } from 'react-native';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { InvocationsScreenRouteProp } from '../../../navigation/types';
import BasePresentationLayout from '../../presentation/common/BasePresentationLayout';
import Immunization from './Immunization';

export default function ImmunizationInvocationsScreen() {
  const { formatMessage } = useMessage();
  const { period } = useRoute<InvocationsScreenRouteProp>().params;

  return (
    <BasePresentationLayout>
      <VStack
        spacing={2}
        style={{
          alignItems: 'center',
        }}
      >
        <VStack spacing={10}>
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
        <Stack
          items="center"
          spacing={15}
          mt={13}
          style={{ marginRight: I18nManager.isRTL ? 60 : 11, marginLeft: I18nManager.isRTL ? 11 : 60 }}
        >
          <Immunization period={period} />
        </Stack>
        <Text style={{ textAlign: 'justify', fontWeight: '600', marginTop: -25 }}>
          {formatMessage(TKeys.INVOCATIONS_IMMUNIZATION_CONCLUSION)}
        </Text>
      </VStack>
    </BasePresentationLayout>
  );
}
