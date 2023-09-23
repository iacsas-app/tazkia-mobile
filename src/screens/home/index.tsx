import { ReactElement } from 'react';
import { ScrollView } from 'react-native';
import { useApplication } from '../../hooks/use-application';
import { commonStyles } from '../../styles/CommonStyles';
import MyProgress from './MyProgress';
import Welcome from './Welcome';

/**
 * Main screen
 * @returns {ReactElement}
 */
export default function HomeScreen(): ReactElement {
  const { userHasProgress } = useApplication();

  return (
    <ScrollView contentContainerStyle={commonStyles.container}>
      {userHasProgress ? <MyProgress /> : <Welcome />}
    </ScrollView>
  );
}
