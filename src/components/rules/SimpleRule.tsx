import { Avatar, Box, HStack, Text } from '@react-native-material/core';
import { RuleStyles } from './Styles';
import { RuleBaseProps } from './types';

export default function SimpleRule({ id, item, reverse }: RuleBaseProps) {
  return (
    <Box style={RuleStyles.box}>
      <HStack spacing={10} style={RuleStyles.stack} reverse={reverse}>
        <Avatar label={<Text variant="subtitle2">{id}</Text>} size={22} />
        <Text variant="body1" style={RuleStyles.text}>
          {item}
        </Text>
      </HStack>
    </Box>
  );
}
