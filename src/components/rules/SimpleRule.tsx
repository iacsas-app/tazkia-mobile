import { Avatar, Box, HStack, Text } from '@react-native-material/core';
import { useApplication } from '../../hooks/use-application';
import { RuleStyles } from './Styles';
import { RuleBaseProps } from './types';

export default function SimpleRule({ id, item }: RuleBaseProps) {
  const { arabic } = useApplication();
  const ml = arabic ? 25 : 5;
  const mr = arabic ? 5 : 25;

  return (
    <Box style={{ marginLeft: ml, marginRight: mr }}>
      <HStack spacing={10} style={RuleStyles.stack} reverse={arabic}>
        <Avatar label={<Text variant="subtitle2">{id}</Text>} size={22} />
        <Text variant="body1" style={RuleStyles.text}>
          {item}
        </Text>
      </HStack>
    </Box>
  );
}
