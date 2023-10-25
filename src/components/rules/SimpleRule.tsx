import { Avatar, Box, HStack } from '@react-native-material/core';
import { useApplication } from '../../hooks/use-application';
import Text from '../Text';
import { RuleStyles } from './Styles';
import { RuleBaseProps } from './types';

export default function SimpleRule({ id, item }: RuleBaseProps) {
  const { arabic } = useApplication();

  return (
    <Box style={{ marginHorizontal: 25 }}>
      <HStack spacing={10} style={RuleStyles.stack}>
        <Avatar
          label={
            <Text variant="subtitle2" color="white">
              {id}
            </Text>
          }
          tintColor="white"
          color="#228b22"
          size={22}
        />
        <Text variant="body1" style={{ ...RuleStyles.text, fontSize: arabic ? 16 : 12 }}>
          {item}
        </Text>
      </HStack>
    </Box>
  );
}
