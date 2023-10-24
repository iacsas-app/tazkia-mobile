import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Box, HStack, VStack } from '@react-native-material/core';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
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
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  function handleYesPress() {
    evaluate(true);
  }

  function handleNoPress() {
    evaluate(false);
  }

  function evaluate(checked: boolean) {
    rule && props.onEvaluate(rule.id, checked);
  }

  return (
    <Portal>
      <Modal visible={true} onDismiss={props.onClose} contentContainerStyle={containerStyle}>
        <VStack spacing={20} pt={20} style={GlobalStyles.center}>
          <Text color={color} variant="h6" style={styles.question}>
            {formatMessage(TKeys.PROGRESS_EVALUATION_QUESTION)}
          </Text>
          <Box style={{ paddingHorizontal }}>{rule.description}</Box>
          <HStack spacing={15} style={GlobalStyles.center}>
            <Button
              mode="elevated"
              style={styles.btn}
              uppercase={false}
              textColor="#66cdaa"
              icon={() => <Icon name="thumb-up-outline" size={btnTextSize} color={color} {...props} />}
              compact
              dark
              onPress={handleYesPress}
            >
              <Text color={color} style={{ fontSize: btnTextSize, fontWeight: '900' }}>
                {formatMessage(TKeys.BUTTON_YES)}
              </Text>
            </Button>
            <Button
              mode="elevated"
              style={styles.btn}
              uppercase={false}
              textColor="#c0c0c0"
              icon={() => <Icon name="thumb-down-outline" size={btnTextSize} color={color} {...props} />}
              compact
              dark
              onPress={handleNoPress}
            >
              <Text color={color} style={{ fontSize: btnTextSize, fontWeight: '900' }}>
                {formatMessage(TKeys.BUTTON_NO)}
              </Text>
            </Button>
          </HStack>
        </VStack>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  question: { fontWeight: '700', textAlign: 'justify' },
  btn: { minWidth: 65 },
});
