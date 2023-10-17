import OctIcon from '@expo/vector-icons/Octicons';
import { Box, Button, HStack, IconButton, Pressable } from '@react-native-material/core';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Rule from '../../domains/common/Rule';
import { useApplication } from '../../hooks/use-application';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import { isCompleted } from '../../services/Helpers';
import GlobalStyles from '../../styles/GlobalStyles';
import Text from '../Text';
import { ProgressStatus } from './progressStatus/ProgressStatus';

interface Props {
  rule: Rule;
  maxDays: number;
  onEvaluate: (rule: Rule) => void;
}

export default function RuleProgress({ rule, maxDays, ...props }: Props) {
  const { formatMessage } = useMessage();
  const { width } = useWindowDimensions();
  const { arabic } = useApplication();
  const [show, setShow] = useState(false);

  const countProgress = rule.progress ? rule.progress.length - 1 : 0;
  const lastProgress = rule.progress ? rule.progress[countProgress] : undefined;
  const isLastCompleted = isCompleted(rule.progress, maxDays);

  function handleCollapse() {
    setShow(!show);
  }

  function handleOpen() {
    setShow(!show);
  }

  function handleEvaluate() {
    setShow(false);
    props.onEvaluate(rule);
  }

  return (
    <Box
      style={{
        ...styles.box,
        width: width - 48,
        borderRightWidth: isLastCompleted && arabic ? 8 : 0,
        borderLeftWidth: isLastCompleted && !arabic ? 8 : 0,
        borderColor: 'green',
        backgroundColor: '#fffafa',
      }}
    >
      <Pressable onLongPress={handleOpen} onPress={() => setShow(false)}>
        <HStack spacing={1} reverse={arabic} style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <HStack spacing={2} reverse={arabic} style={{ alignItems: 'center', paddingHorizontal: 2 }}>
            <IconButton
              icon={(_, ...props) => <OctIcon name={show ? 'chevron-up' : 'chevron-down'} size={15} {...props} />}
              style={{ width: 20, height: 20 }}
              onPressIn={handleCollapse}
            />
            <HStack spacing={10} reverse={arabic} style={{ width: width - (arabic ? 195 : 200), alignItems: 'center' }}>
              <Text style={{ fontWeight: '900', fontSize: arabic ? 12 : 10, color: '#ff4500' }}>{rule.title}</Text>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: arabic ? 12 : 10,
                }}
              >
                {rule.summary}
              </Text>
            </HStack>
          </HStack>
          <Box style={{ paddingHorizontal: 10 }}>
            <ProgressStatus last={lastProgress} count={countProgress} maxDays={maxDays} completed={isLastCompleted} />
          </Box>
        </HStack>
        {show && (
          <Box style={{ padding: 15 }}>
            <Text style={{ textAlign: arabic ? 'auto' : 'justify', fontSize: arabic ? 14 : 12 }}>
              {rule.description}
            </Text>
          </Box>
        )}
      </Pressable>
      {show && !isLastCompleted && (
        <Box style={{ ...GlobalStyles.center, paddingBottom: 15, paddingTop: 5 }}>
          <Button
            title={formatMessage(TKeys.PROGRESS_START_DAILY_EVALUATION)}
            onPress={handleEvaluate}
            titleStyle={{ fontSize: arabic ? 16 : 14 }}
            uppercase={false}
          />
        </Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingVertical: 5,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: 'white',
  },
});
