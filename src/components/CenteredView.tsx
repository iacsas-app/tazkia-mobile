import { View, ViewProps } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

export default function CenteredView({ children, ...props }: ViewProps) {
  return (
    <View {...props} style={GlobalStyles.container}>
      {children}
    </View>
  );
}
