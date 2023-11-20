import * as React from 'react';
import { Text as NativeText, Paragraph, Subheading, Text, useTheme } from 'react-native-paper';

type Props = React.ComponentProps<typeof NativeText> & {
  isSubheading?: boolean;
};

export const TextComponent = ({ isSubheading = false, ...props }: Props) => {
  const theme = useTheme();

  if (theme.isV3) {
    return (
      <Text
        variant={isSubheading ? 'bodyLarge' : 'bodyMedium'}
        style={{ color: theme.colors.onSurfaceVariant }}
        {...props}
      />
    );
  } else if (isSubheading) {
    return <Subheading {...props} />;
  }
  return <Paragraph {...props} />;
};
