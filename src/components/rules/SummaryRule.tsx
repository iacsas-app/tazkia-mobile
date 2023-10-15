import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import OctIcon from '@expo/vector-icons/Octicons';
import { Box, HStack, IconButton, Pressable, Text } from '@react-native-material/core';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Rule from '../../domains/common/Rule';
import { useApplication } from '../../hooks/use-application';

interface Props {
  rule: Rule;
  onAdd: (rule: Rule) => void;
}

export default function SummaryRule({ rule, ...props }: Props) {
  const { width } = useWindowDimensions();
  const { arabic } = useApplication();
  const [show, setShow] = useState(false);

  const bgColor = rule.status === 'completed' ? '#2e8b57' : rule.status === 'progress' ? '#66cdaa' : '#f5fffa';
  const statusIcon = rule.status === 'progress' ? 'progress-check' : 'check';
  const statusColor = rule.status === 'progress' ? '#ffefd5' : '#90ee90';
  const summaryColor = rule.status === 'completed' ? '#fffaf0' : 'black';

  function handleCollapse() {
    setShow(!show);
  }

  function handleOpen() {
    setShow(true);
  }

  return (
    <Box style={{ ...styles.box, width: width - 20, backgroundColor: bgColor }}>
      <Pressable onPressIn={handleOpen}>
        <HStack spacing={1} reverse={arabic} style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <HStack spacing={2} reverse={arabic} style={{ alignItems: 'center', paddingHorizontal: 2 }}>
            <IconButton
              icon={(_, ...props) => <OctIcon name={show ? 'chevron-up' : 'chevron-down'} size={20} {...props} />}
              style={{ width: 30, height: 30 }}
              onPressIn={handleCollapse}
            />
            <HStack
              spacing={12}
              reverse={arabic}
              style={{ width: width - (rule.disabled && !rule.status ? 120 : 170), alignItems: 'center' }}
            >
              <Text style={{ fontWeight: '900', fontSize: 13, color: statusColor }}>{rule.title}</Text>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: arabic ? 15 : 13,
                  color: summaryColor,
                }}
              >
                {rule.summary}
              </Text>
            </HStack>
          </HStack>
          <Box style={{ paddingHorizontal: 5 }}>
            {!rule.status ? (
              !rule.disabled && (
                <IconButton
                  icon={(_, ...props) => <Icon name="plus-circle" size={20} color="#90ee90" {...props} />}
                  style={{ width: 30, height: 30 }}
                  onPressIn={() => props.onAdd(rule)}
                />
              )
            ) : (
              <Icon name={statusIcon} size={25} color={statusColor} />
            )}
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
    </Box>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingVertical: 5,
    borderRadius: 15,
    elevation: 5,
  },
});
