import { ColorValue } from 'react-native';
import { Text as TextPaper, TextProps } from 'react-native-paper';

type Props = TextProps<any> & {
  color?: ColorValue;
};
export default function Text({ color, children, ...props }: Props) {
  const newColor = color ?? 'black';
  const style = [props.style, { color: newColor }];

  return (
    <TextPaper {...props} style={style}>
      {children}
    </TextPaper>
  );
}

Text.defaultProps = {
  variant: 'bodyMedium',
};
