import { VStack } from '@react-native-material/core';
import { List } from 'react-native-paper';
import Text from '../../../../../components/Text';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import InvocationAccordion from '../../../common/InvocationAccordion';
import { purificationStyles } from '../../../common/Style';

export default function InvocationsScreen() {
  const { formatMessage } = useMessage();

  return (
    <ScrollViewLayout>
      <Text variant="bodyMedium" style={purificationStyles.title} color="seagreen">
        {formatMessage(TKeys.INVOCATION_STEP_2)}
      </Text>
      <List.AccordionGroup>
        <InvocationAccordion id={1} titleKey={TKeys.INVOCATION_STEP_2_RULE_1} duration={5}>
          <Text variant="bodyMedium" style={{ textAlign: 'justify' }}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_1_DESC)}
          </Text>
        </InvocationAccordion>
        <InvocationAccordion id={2} titleKey={TKeys.INVOCATION_STEP_2_RULE_2_SUMMARY} duration={30}>
          <VStack spacing={10}>
            <Text variant="bodyMedium" style={{ fontWeight: '900', textAlign: 'justify' }} color="seagreen">
              {formatMessage(TKeys.INVOCATION_STEP_2_RULE_2_BODY)}
            </Text>
            <Text variant="bodyMedium" style={{ textAlign: 'justify' }}>
              {formatMessage(TKeys.INVOCATION_STEP_2_RULE_2_DESC)}
            </Text>
            <VStack spacing={10}>
              <Text variant="bodySmall" style={{ textAlign: 'justify', fontWeight: '700', color: '#ff6347' }}>
                {formatMessage(TKeys.INVOCATION_STEP_2_RULE_2_CROYANCE_1)}
              </Text>
              <Text variant="bodySmall" style={{ textAlign: 'justify', fontWeight: '700', color: '#ff6347' }}>
                {formatMessage(TKeys.INVOCATION_STEP_2_RULE_2_CROYANCE_2)}
              </Text>
              <Text variant="bodySmall" style={{ textAlign: 'justify', fontWeight: '700', color: '#ff6347' }}>
                {formatMessage(TKeys.INVOCATION_STEP_2_RULE_2_CROYANCE_3)}
              </Text>
            </VStack>
          </VStack>
        </InvocationAccordion>
        <InvocationAccordion id={3} titleKey={TKeys.INVOCATION_STEP_2_RULE_3} duration={20}>
          <Text variant="bodyMedium" style={{ textAlign: 'justify' }}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_3_DESC)}
          </Text>
        </InvocationAccordion>
        <InvocationAccordion id={4} titleKey={TKeys.INVOCATION_STEP_2_RULE_4} duration={15}>
          <Text variant="bodyMedium" style={{ textAlign: 'justify' }}>
            {formatMessage(TKeys.INVOCATION_STEP_2_RULE_4_DESC)}
          </Text>
        </InvocationAccordion>
      </List.AccordionGroup>
    </ScrollViewLayout>
  );
}
