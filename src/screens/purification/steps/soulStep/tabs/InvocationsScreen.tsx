import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import Text from '../../../../../components/Text';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import VStack from '../../../../../components/stack/VStack';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import InvocationAccordion from '../../../common/InvocationAccordion';
import { purificationStyles } from '../../../common/Style';

export default function InvocationsScreen() {
  const { formatMessage } = useMessage();

  return (
    <ScrollViewLayout>
      <Text variant="bodyLarge" style={purificationStyles.title} color="seagreen">
        {formatMessage(TKeys.INVOCATION_STEP_3)}
      </Text>
      <List.AccordionGroup>
        <InvocationAccordion id={1} titleKey={TKeys.INVOCATION_STEP_3_RULE_1_SUMMARY} duration={30}>
          <VStack spacing={10}>
            <Text variant="headlineSmall" style={{ fontWeight: '900', textAlign: 'justify' }} color="seagreen">
              {formatMessage(TKeys.INVOCATION_STEP_3_RULE_1_BODY)}
            </Text>
            <Text variant="bodyLarge" color="black" style={{ textAlign: 'justify' }}>
              {formatMessage(TKeys.INVOCATION_STEP_3_RULE_1_DESC)}
            </Text>
          </VStack>
        </InvocationAccordion>
        <InvocationAccordion id={2} titleKey={TKeys.INVOCATION_STEP_3_RULE_2} duration={30}>
          <Text variant="bodyLarge" style={{ textAlign: 'justify' }}>
            {formatMessage(TKeys.INVOCATION_STEP_3_RULE_2_DESC)}
          </Text>
        </InvocationAccordion>
        <InvocationAccordion id={3} titleKey={TKeys.INVOCATION_STEP_3_RULE_3} duration={15}>
          <Text variant="bodyLarge" style={{ textAlign: 'justify' }}>
            {formatMessage(TKeys.INVOCATION_STEP_3_RULE_3_DESC)}
          </Text>
        </InvocationAccordion>
      </List.AccordionGroup>
      <Text variant="bodyLarge" style={styles.importance}>
        {formatMessage(TKeys.INVOCATION_STEP_3_IMPORTANCE)}
      </Text>
    </ScrollViewLayout>
  );
}

const styles = StyleSheet.create({
  importance: { textAlign: 'justify', fontSize: 16, fontWeight: '500', marginTop: 20 },
});
