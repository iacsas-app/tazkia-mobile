import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import OctIcon from '@expo/vector-icons/Octicons';
import { Box, HStack, IconButton, Pressable, Text } from '@react-native-material/core';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { MindLevel } from '../../../../domains/purification/Mind';
import { useApplication } from '../../../../hooks/use-application';
import { useMessage } from '../../../../hooks/use-message';
import { TKeys } from '../../../../locales/constants';

interface Props {
  level: MindLevel;
  disabled?: boolean;
  collapse?: boolean;
  onAdd: (level: MindLevel) => void;
}

export default function MindItem({ level, ...props }: Props) {
  const { arabic } = useApplication();
  const { formatMessage } = useMessage();
  const [show, setShow] = useState(false);

  function handleCollapse() {
    setShow(!show);
  }

  return (
    <Box w={400} style={styles.box}>
      <Pressable onPressIn={handleCollapse}>
        <HStack spacing={2} reverse={arabic} style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <HStack spacing={2} reverse={arabic} style={{ alignItems: 'center', paddingHorizontal: 5 }}>
            <IconButton
              icon={(_, ...props) => <OctIcon name={show ? 'chevron-up' : 'chevron-down'} size={20} {...props} />}
              style={{ width: 35, height: 35 }}
              onPressIn={handleCollapse}
            />
            <HStack spacing={12} reverse={arabic} style={{ width: 255, alignItems: 'center' }}>
              <Text style={{ fontWeight: '900', fontSize: 13, color: 'green' }}>
                {formatMessage(TKeys.LEVEL, { value: level })}
              </Text>
              <Text style={{ fontSize: arabic ? 15 : 13 }}>
                {formatMessage(`purification.mind.summary.level-${level}`)}
              </Text>
            </HStack>
          </HStack>
          <Box>
            {!props.disabled && (
              <IconButton
                icon={(_, ...props) => <Icon name="plus-circle" size={20} {...props} />}
                style={{ width: 35, height: 35 }}
                onPressIn={() => props.onAdd(level)}
              />
            )}
          </Box>
        </HStack>
        {show && (
          <Box style={{ padding: 15 }}>
            <Text>Description of level {level}</Text>
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
    backgroundColor: 'white',
    elevation: 5,
  },
});
