import React, { FC } from 'react';
import { Text as TextPaper, TextProps } from 'react-native-paper';

const Text: FC<TextProps<any>> = ({ children, ...props }) => {
  return <TextPaper {...props}>{children}</TextPaper>;
};

Text.defaultProps = {
  variant: 'bodyMedium',
};

export default Text;
