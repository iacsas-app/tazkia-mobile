import { Box, HStack } from 'react-native-flex-layout';
import { Chip } from 'react-native-paper';
import Text from './Text';

interface Props {
  summary: string;
  repeat: number;
}
export default function InvocationItem({ summary, repeat }: Props) {
  return (
    <Box>
      <HStack
        spacing={5}
        style={{ alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}
      >
        <Chip>{repeat}</Chip>
        <Text variant="body1" style={{ fontSize: 14, textAlign: 'justify' }}>
          {summary}
        </Text>
      </HStack>
    </Box>
  );
}
