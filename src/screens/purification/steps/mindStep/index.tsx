import usePurification from '../../../../hooks/use-purification';
import TabNavigator from '../../common/TabNavigator';
import HomeScreen from './tabs/HomeScreen';
import InvocationsScreen from './tabs/InvocationsScreen';
import PresentationScreen from './tabs/PresentationScreen';
import SunnahsWorshipScreen from './tabs/SunnahsWorshipScreen';

export default function MindScreen() {
  const { hasMindProgress } = usePurification();
  return (
    <TabNavigator
      hasProgress={hasMindProgress}
      presentationComponent={PresentationScreen}
      purificationComponent={HomeScreen}
      invocationComponent={InvocationsScreen}
      sunnahsComponent={SunnahsWorshipScreen}
    />
  );
}
