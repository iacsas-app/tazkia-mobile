import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import OctIcon from '@expo/vector-icons/Octicons';
import { Box, HStack, IconButton, Pressable, Text } from '@react-native-material/core';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { MindLevel } from '../../../../domains/purification/Mind';
import { useApplication } from '../../../../hooks/use-application';

interface Props {
  level: MindLevel;
  disabled?: boolean;
  collapse?: boolean;
  onAdd: () => void;
}

export default function MindItem({ level, ...props }: Props) {
  const { arabic } = useApplication();
  const [show, setShow] = useState(false);

  function handleCollapse() {
    setShow(!show);
  }

  return (
    <Box w={350} style={styles.box}>
      <Pressable onPressIn={handleCollapse}>
        <HStack spacing={10} reverse={arabic} style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <HStack spacing={10} reverse={arabic} style={{ alignItems: 'center' }}>
            <IconButton
              icon={(_, ...props) => <OctIcon name={show ? 'chevron-up' : 'chevron-down'} size={20} {...props} />}
              onPressIn={handleCollapse}
            />
            <Text style={{ marginLeft: -10 }}>Level {level}</Text>
            <Text style={{ fontWeight: '600' }}>Summary of level {level}</Text>
          </HStack>
          <Box>
            {!props.disabled && (
              <IconButton
                icon={(_, ...props) => <Icon name="plus-circle" size={20} {...props} />}
                onPressIn={props.onAdd}
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
