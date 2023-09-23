import { ReactElement } from 'react';
import { ScrollView } from 'react-native';
import { useStoreState } from '../../stores/hooks';
import { commonStyles } from '../../styles/CommonStyles';
import MyProgress from './MyProgress';
import Welcome from './Welcome';

/**
 * Main screen
 * @returns {ReactElement}
 */
export default function HomeScreen(): ReactElement {
  const hasProgress = useStoreState((state) => state.global.hasProgress);

  return (
    <ScrollView contentContainerStyle={commonStyles.container}>{hasProgress ? <MyProgress /> : <Welcome />}</ScrollView>
  );
}
