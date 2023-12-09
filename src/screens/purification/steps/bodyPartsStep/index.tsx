import usePurification from '../../../../hooks/use-purification';
import TabNavigator from '../../common/TabNavigator';
import HomeScreen from './tabs/HomeScreen';
import InvocationsScreen from './tabs/InvocationsScreen';
import PresentationScreen from './tabs/PresentationScreen';
import SunnahsScreen from './tabs/SunnahsScreen';

export default function BodyPartsScreen() {
  const { hasProgress } = usePurification();
  return (
    <TabNavigator
      hasProgress={hasProgress('bodyParts')}
      presentationComponent={PresentationScreen}
      purificationComponent={HomeScreen}
      invocationComponent={InvocationsScreen}
      sunnahsComponent={SunnahsScreen}
    />
  );
}
