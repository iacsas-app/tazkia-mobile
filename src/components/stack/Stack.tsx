import { ReactNode, useEffect } from 'react';
import { StyleProp, Touchable } from 'react-native';
import Animated, { useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

const DURATION = 1000;
const DELAY = 500;

export interface StackProps extends Touchable {
  children: ReactNode;
  spacing?: number;
  index?: number;
  flexDirection?: 'column' | 'row';
  center?: boolean;
  style?: StyleProp<any>;
}
export default function Stack({ index, style, flexDirection, spacing, center, children, ...props }: StackProps) {
  const opacity = useSharedValue(0);

  let styles: StyleProp<any> = [{ flexDirection, gap: spacing }];
  if (center) {
    styles = [{ alignItems: 'center', justifyContent: 'center' }, styles];
  }

  useEffect(() => {
    opacity.value = withDelay(0 * DELAY, withTiming(index ? index * 1 : 2, { duration: DURATION }));
  }, []);

  return (
    <Animated.View style={[styles, style, { opacity: opacity }]} {...props}>
      {children}
    </Animated.View>
  );
}

Stack.defaultProps = {
  flexDirection: 'row',
};
