import { ReactElement } from 'react';
import { View } from 'react-native';
import Text from '../../components/Text';
import GlobalStyles from '../../styles/GlobalStyles';

/**
 * Main screen
 * @returns {ReactElement}
 */
export default function ProgressScreen(): ReactElement {
  return (
    <View style={GlobalStyles.container}>
      <Text variant="h5">My global progress and statistics</Text>
    </View>
  );
}
