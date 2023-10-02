import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Box, HStack, Pressable, Text } from '@react-native-material/core';
import { useState } from 'react';
import { RuleStyles } from './Styles';
import { RuleBaseProps } from './types';

interface RuleProps extends RuleBaseProps {}

export default function CheckableRule({ id, item, reverse }: RuleProps) {
  const [checked, setChecked] = useState(false);

  function handlePress() {
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
      <Box style={RuleStyles.box}>
        <HStack spacing={10} style={RuleStyles.stack} reverse={reverse}>
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
          <Text variant="body1" style={RuleStyles.text}>
            {item}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
}
