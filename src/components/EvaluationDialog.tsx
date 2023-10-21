import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Box, Button, Dialog, DialogContent, HStack, VStack } from '@react-native-material/core';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Rule from '../domains/common/Rule';
import { useApplication } from '../hooks/use-application';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import GlobalStyles from '../styles/GlobalStyles';
import Text from './Text';

interface Props {
  rule: Rule;
  onClose: () => void;
  onEvaluate: (ruleId: number, checked: boolean) => void;
}

export default function EvaluationDialog({ rule, ...props }: Props) {
  const { formatMessage } = useMessage();
  const { arabic, isDarkMode } = useApplication();
  const insets = useSafeAreaInsets();
  const paddingHorizontal = useMemo(() => Math.max(1, insets.left + insets.right), []);

  const btnTextSize = arabic ? 18 : 16;
  const color = isDarkMode ? 'white' : 'black';

  function handleYesPress() {
    evaluate(true);
  }

  function handleNoPress() {
    evaluate(false);
  }

  function evaluate(checked: boolean) {
    rule && props.onEvaluate(rule.id, checked);
  }

  const p: any = {};

  return (
    <Dialog visible={true} onDismiss={props.onClose} {...p}>
      <DialogContent>
        <VStack spacing={20} pt={20} style={GlobalStyles.center}>
          <Text color={color} variant="h6" style={styles.question}>
            {formatMessage(TKeys.PROGRESS_EVALUATION_QUESTION)}
          </Text>
          <Box style={{ paddingHorizontal }}>{rule.description}</Box>
          <HStack spacing={15} style={GlobalStyles.center}>
            <Button
              title={
                <Text color={color} style={{ fontSize: btnTextSize, fontWeight: '900' }}>
                  {formatMessage(TKeys.BUTTON_YES)}
                </Text>
              }
              compact
              style={styles.btn}
              uppercase={false}
              color="#66cdaa"
              leading={() => <Icon name="thumb-up-outline" size={btnTextSize} color={color} {...props} />}
              onPress={handleYesPress}
            />
            <Button
              title={
                <Text color={color} style={{ fontSize: btnTextSize, fontWeight: '900' }}>
                  {formatMessage(TKeys.BUTTON_NO)}
                </Text>
              }
              style={styles.btn}
              uppercase={false}
              color="#c0c0c0"
              compact
              leading={() => <Icon name="thumb-down-outline" size={btnTextSize} color={color} {...props} />}
              onPress={handleNoPress}
            />
          </HStack>
        </VStack>
      </DialogContent>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  question: { fontWeight: '700', textAlign: 'justify' },
  btn: { minWidth: 65 },
});
