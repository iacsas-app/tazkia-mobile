import { VStack } from '@react-native-material/core';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';

import Text from '../../../components/Text';
import ScrollViewLayout from '../../../components/layout/ScrollViewLayout';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';

export default function Step1Screen() {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const { width } = useWindowDimensions();

  return (
    <ScrollViewLayout>
      <Text variant="body1" style={{ ...styles.title, color: '#ff6347', fontSize: arabic ? 28 : 20 }}>
        {formatMessage(TKeys.INVOCATION_STEP_1)}
      </Text>
      <VStack spacing={20}>
        <VStack spacing={10}>
          <Text variant="h6" color="black" style={{ fontWeight: '600' }}>
            {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_SUMMARY)}
          </Text>
          <Text style={{ fontWeight: '900', fontSize: 17, textAlign: 'justify' }} color="green">
            {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_BODY)}
          </Text>
          <Text style={{ textAlign: 'justify', fontSize: 17 }}>
            {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_DESC)}
          </Text>
          <VStack spacing={15}>
            <Text style={{ textAlign: 'justify', fontSize: 14, fontWeight: '700', color: '#ff6347' }}>
              {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_CROYANCE_1)}
            </Text>
            <Text style={{ textAlign: 'justify', fontSize: 14, fontWeight: '700', color: '#ff6347' }}>
              {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_CROYANCE_2)}
            </Text>
            <Text style={{ textAlign: 'justify', fontSize: 14, fontWeight: '700', color: '#ff6347' }}>
              {formatMessage(TKeys.INVOCATION_STEP_1_RULE_1_CROYANCE_3)}
            </Text>
          </VStack>
        </VStack>
        <VStack spacing={10}>
          <Text variant="h6" color="black" style={{ fontWeight: '600' }}>
            {formatMessage(TKeys.INVOCATION_STEP_1_RULE_2)}
          </Text>
          <Text style={{ textAlign: 'justify', fontSize: 17 }}>
            {formatMessage(TKeys.INVOCATION_STEP_1_RULE_2_DESC)}
          </Text>
        </VStack>
        <VStack spacing={10}>
          <Text variant="h6" color="black" style={{ fontWeight: '600' }}>
            {formatMessage(TKeys.INVOCATION_STEP_1_RULE_3)}
          </Text>
          <Text style={{ textAlign: 'justify', fontSize: 17 }}>
            {formatMessage(TKeys.INVOCATION_STEP_1_RULE_3_DESC)}
          </Text>
          <Image
            source={require('../../../../assets/img/purification/soul/mourakaba.png')}
            style={{ width: width - 40, borderRadius: 10 }}
          />
        </VStack>
      </VStack>
    </ScrollViewLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
