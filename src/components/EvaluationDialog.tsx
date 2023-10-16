import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Button, Dialog, DialogContent, HStack, VStack } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import Rule from '../domains/common/Rule';
import { MindLevel } from '../domains/purification/Mind';
import { useApplication } from '../hooks/use-application';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import GlobalStyles from '../styles/GlobalStyles';
import Text from './Text';

interface Props {
  rule: Rule | undefined;
  onClose: () => void;
  onEvaluate: (level: MindLevel, checked: boolean) => void;
}

export default function EvaluationDialog({ rule, ...props }: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const btnTextSize = arabic ? 20 : 12;

  function handleYesPress() {
    evaluate(true);
  }

  function handleNoPress() {
    evaluate(false);
  }

  function evaluate(checked: boolean) {
    rule && props.onEvaluate(rule.id as MindLevel, checked);
  }

  if (!rule) {
    return <></>;
  }

  const p: any = {};

  return (
    <Dialog visible={true} onDismiss={props.onClose} {...p}>
      <DialogContent>
        <VStack spacing={20} pt={20} style={GlobalStyles.center}>
          <Text variant="h6" style={styles.question}>
            {formatMessage(TKeys.PROGRESS_EVALUATION_QUESTION)}
          </Text>
          <Text style={styles.rule}>{rule.description}</Text>
          <HStack spacing={15} style={GlobalStyles.center} reverse={arabic}>
            <Button
              title={<Text variant="h6">{formatMessage(TKeys.BUTTON_YES)}</Text>}
              uppercase={false}
              color="#66cdaa"
              leading={() => <Icon name="thumb-up-outline" size={btnTextSize} {...props} />}
              onPress={handleYesPress}
            />
            <Button
              title={<Text variant="h6">{formatMessage(TKeys.BUTTON_NO)}</Text>}
              uppercase={false}
              color="#c0c0c0"
              leading={() => <Icon name="thumb-down-outline" size={btnTextSize} {...props} />}
              onPress={handleNoPress}
            />
          </HStack>
        </VStack>
      </DialogContent>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  question: { ...GlobalStyles.text, fontWeight: '700' },
  rule: { ...GlobalStyles.text, fontSize: 14 },
});
