import { Box, BoxProps } from '@react-native-material/core';
import GlobalStyles from '../styles/GlobalStyles';

export default function CenteredBox({ children, ...props }: BoxProps) {
  return (
    <Box {...props} style={GlobalStyles.container}>
      {children}
    </Box>
  );
}
