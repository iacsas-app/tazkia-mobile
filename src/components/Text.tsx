import { Text as CoreText, TextProps } from '@react-native-material/core';

export default function Text({ color, children, ...props }: TextProps) {
  //const isDarkMode = useColorScheme() === 'dark';
  const newColor = color ? color : 'black';

  return (
    <CoreText color={newColor} {...props}>
      {children}
    </CoreText>
  );
}
