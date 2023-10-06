import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Box, HStack, Pressable, Text } from '@react-native-material/core';
import { useState } from 'react';
import { useApplication } from '../../hooks/use-application';
import { RuleStyles } from './Styles';
import { RuleBaseProps } from './types';

interface RuleProps extends RuleBaseProps {
  onSelect: (id: number) => void;
  onUnselect: (id: number) => void;
}

export default function CheckableRule({ id, item, ...props }: RuleProps) {
  const [checked, setChecked] = useState(false);
  const { arabic } = useApplication();

  const ml = arabic ? 25 : 5;
  const mr = arabic ? 5 : 25;

  function handlePress() {
    checked ? props.onUnselect(id) : props.onSelect(id);
    setChecked(!checked);
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{
        ...RuleStyles.pressable,
        backgroundColor: checked ? '#ffb6c1' : 'white',
      }}
    >
      <Box style={{ marginLeft: ml, marginRight: mr }}>
        <HStack spacing={10} style={RuleStyles.stack} reverse={arabic}>
          <Avatar
            label={
              checked ? undefined : (
                <Text variant="subtitle2" color="white">
                  {id}
                </Text>
              )
            }
            size={25}
            color={checked ? 'error' : '#228b22'}
            tintColor="white"
            icon={(props) => <Icon name="check-bold" {...props} />}
          />
          <Text variant="body1" style={{ ...RuleStyles.text, fontSize: arabic ? 16 : 14 }}>
            {item}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
}
