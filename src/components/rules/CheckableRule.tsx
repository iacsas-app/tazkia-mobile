import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, HStack, Pressable, Text } from '@react-native-material/core';
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
    <Pressable onPress={handlePress}>
      <HStack spacing={10} style={RuleStyles.container} reverse={reverse}>
        <Avatar
          label={checked ? undefined : <Text variant="subtitle2">{id}</Text>}
          size={32}
          color={checked ? 'error' : 'secondary'}
          tintColor="white"
          icon={(props) => <Icon name="check-bold" {...props} />}
        />
        <Text variant="body1" style={RuleStyles.text}>
          {item}
        </Text>
      </HStack>
    </Pressable>
  );
}
