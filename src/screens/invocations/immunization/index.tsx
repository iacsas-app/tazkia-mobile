import { Stack, VStack } from '@react-native-material/core';
import React from 'react';
import { I18nManager, Text } from 'react-native';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import BasePresentationLayout from '../../presentation/common/BasePresentationLayout';
import Immunization from './Immunization';

export default function ImmunizationInvocationsScreen() {
  const { formatMessage } = useMessage();

  return (
    <BasePresentationLayout>
      <VStack
        spacing={2}
        style={{
          alignItems: 'center',
        }}
      >
        <VStack>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '900',
              textAlign: 'justify',
            }}
          >
            {formatMessage(TKeys.BASMALAH)}
          </Text>
        </VStack>
        <Stack
          items="center"
          spacing={15}
          mt={13}
          style={{ marginRight: I18nManager.isRTL ? 60 : 11, marginLeft: I18nManager.isRTL ? 11 : 60 }}
        >
          <Immunization type="morning" />
        </Stack>
      </VStack>
    </BasePresentationLayout>
  );
}
