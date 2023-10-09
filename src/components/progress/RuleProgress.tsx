import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import OctIcon from '@expo/vector-icons/Octicons';
import { Box, Button, HStack, IconButton, Pressable, Text } from '@react-native-material/core';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import RuleResult from '../../domains/common/RuleResult';
import { useApplication } from '../../hooks/use-application';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';

interface Props {
  rule: RuleResult;
  maxDays: number;
  onEvaluate: (checked: boolean) => void;
}

export default function RuleProgress({ rule, ...props }: Props) {
  const { formatMessage } = useMessage();
  const { width } = useWindowDimensions();
  const { arabic } = useApplication();
  const [show, setShow] = useState(false);

  function handleCollapse() {
    setShow(!show);
  }

  function handleOpen() {
    setShow(true);
  }

  function handleEvaluate() {}

  return (
    <Box style={{ ...styles.box, width: width - 28 }}>
      <Pressable onPressIn={handleOpen}>
        <HStack spacing={1} reverse={arabic} style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <HStack spacing={2} reverse={arabic} style={{ alignItems: 'center', paddingHorizontal: 2 }}>
            <IconButton
              icon={(_, ...props) => <OctIcon name={show ? 'chevron-up' : 'chevron-down'} size={20} {...props} />}
              style={{ width: 30, height: 30 }}
              onPressIn={handleCollapse}
            />
            <HStack spacing={12} reverse={arabic} style={{ width: width - 170, alignItems: 'center' }}>
              <Text style={{ fontWeight: '900', fontSize: 13 }}>{rule.title}</Text>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: arabic ? 15 : 13,
                }}
              >
                {rule.summary}
              </Text>
            </HStack>
          </HStack>
          <Box style={{ paddingHorizontal: 8 }}>
            <Icon name={'check-bold'} size={25} />
          </Box>
        </HStack>
        {show && (
          <Box style={{ padding: 15 }}>
            <Text style={{ textAlign: arabic ? 'auto' : 'justify', fontSize: arabic ? 16 : 14 }}>
              {rule.description}
            </Text>
          </Box>
        )}
      </Pressable>
      {show && (
        <Box style={{ ...GlobalStyles.center, paddingBottom: 15, paddingTop: 5 }}>
          <Button
            title={formatMessage(TKeys.PROGRESS_START_DAILY_EVALUATION)}
            onPress={handleEvaluate}
            titleStyle={{ fontSize: arabic ? 18 : 15 }}
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
