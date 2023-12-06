import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import InvocationGoodManners from '../../../../../components/InvocationGoodManners';
import Text from '../../../../../components/Text';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import VStack from '../../../../../components/stack/VStack';
import { Color } from '../../../../../constants/Color';
import { Font } from '../../../../../constants/Font';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import InvocationAccordion from '../../../common/InvocationAccordion';
import { purificationStyles } from '../../../common/Style';

export default function InvocationsScreen() {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();

  return (
    <ScrollViewLayout style={{ backgroundColor: Color.backgroundColor, flex: 1 }}>
      <Text variant="bodyMedium" style={purificationStyles.title} color="seagreen">
        {formatMessage(TKeys.INVOCATION_STEP_3)}
      </Text>
      <List.AccordionGroup>
        <InvocationAccordion id={1} titleKey={TKeys.INVOCATION_STEP_3_RULE_1} duration={30}>
          <VStack spacing={10}>
            <Text variant="bodyMedium" style={{ fontWeight: '900', textAlign: 'justify' }} color="seagreen">
              {formatMessage(TKeys.INVOCATION_STEP_3_RULE_1_BODY)}
            </Text>
            <Text variant="bodyMedium" color="black" style={{ textAlign: 'justify' }}>
              {formatMessage(TKeys.INVOCATION_STEP_3_RULE_1_DESC)}
            </Text>
          </VStack>
        </InvocationAccordion>
        <InvocationAccordion id={2} titleKey={TKeys.INVOCATION_STEP_3_RULE_2} duration={30}>
          <Text variant="bodyMedium" style={{ textAlign: 'justify' }}>
            {formatMessage(TKeys.INVOCATION_STEP_3_RULE_2_DESC)}
          </Text>
        </InvocationAccordion>
        <InvocationAccordion id={3} titleKey={TKeys.INVOCATION_STEP_3_RULE_3} duration={15}>
          <Text variant="bodyMedium" style={{ textAlign: 'justify' }}>
            {formatMessage(TKeys.INVOCATION_STEP_3_RULE_3_DESC)}
          </Text>
        </InvocationAccordion>
      </List.AccordionGroup>
      <InvocationGoodManners />
      <VStack style={styles.importanceContainer}>
        <Text variant="bodyMedium" style={purificationStyles.title} color="seagreen">
          {formatMessage(TKeys.INVOCATION_STEP_3_IMPORTANCE_TITLE)}
        </Text>
        <Text
          variant="bodyMedium"
          style={{ ...styles.importance, fontSize: Font.size(arabic ? 15 : 13), fontWeight: arabic ? '600' : 'normal' }}
        >
          {formatMessage(TKeys.INVOCATION_STEP_3_IMPORTANCE_SUMMARY)}
        </Text>
      </VStack>
    </ScrollViewLayout>
  );
}

const styles = StyleSheet.create({
  importanceContainer: { marginTop: 5 },
  importance: { textAlign: 'justify' },
});
