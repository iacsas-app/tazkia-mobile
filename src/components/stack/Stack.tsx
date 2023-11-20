import { ReactNode } from 'react';
import { StyleProp, Touchable, View } from 'react-native';

export interface StackProps extends Touchable {
  children: ReactNode;
  spacing?: number;
  flexDirection?: 'column' | 'row';
  center?: boolean;
  style?: StyleProp<any>;
}
export default function Stack({ style, flexDirection, spacing, center, children, ...props }: StackProps) {
  let styles: StyleProp<any> = [{ flexDirection, gap: spacing }];
  if (center) {
    styles = [{ alignItems: 'center', justifyContent: 'center' }, styles];
  }

  return (
    <View style={[styles, style]} {...props}>
      {children}
    </View>
  );
}

Stack.defaultProps = {
  flexDirection: 'row',
};
