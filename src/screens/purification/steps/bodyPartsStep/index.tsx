import usePurification from '../../../../hooks/use-purification';
import TabNavigator from '../../common/TabNavigator';
import HomeScreen from './tabs/HomeScreen';
import InvocationsScreen from './tabs/InvocationsScreen';
import ObstaclesScreen from './tabs/ObstaclesScreen';
import PresentationScreen from './tabs/PresentationScreen';

export default function BodyPartsScreen() {
  const { hasBodyPartsProgress } = usePurification();
  return (
    <TabNavigator
      hasProgress={hasBodyPartsProgress}
      presentationComponent={PresentationScreen}
      purificationComponent={HomeScreen}
      invocationComponent={InvocationsScreen}
      obstaclesComponent={ObstaclesScreen}
    />
  );
}
