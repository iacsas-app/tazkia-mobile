import { Avatar, HStack, Text } from '@react-native-material/core';
import { RuleStyles } from './Styles';
import { RuleBaseProps } from './types';

export default function SimpleRule({ id, item, reverse }: RuleBaseProps) {
  return (
    <HStack spacing={10} style={RuleStyles.container} reverse={reverse}>
      <Avatar label={<Text variant="subtitle2">{id}</Text>} size={28} />
      <Text variant="body1" style={RuleStyles.text}>
        {item}
      </Text>
    </HStack>
  );
}
