import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import VStack from '../../stack/VStack';
import { ResetSetting } from './ResetSetting';
import LanguageSetting from './language/LanguageSetting';

interface Props {
  onClick?(): void;
}
export default function Settings({ onClick }: Props) {
  const isDarkMode = useColorScheme() === 'dark';
  const color = isDarkMode ? 'white' : 'black';

  return (
    <GestureHandlerRootView>
      <Animated.View entering={FadeInUp.delay(100).duration(10).springify()} style={{ backgroundColor: 'transparent' }}>
        <VStack>
          <LanguageSetting color={color} onClick={onClick} />
          <Divider />
          <ResetSetting onClick={onClick} />
        </VStack>
      </Animated.View>
    </GestureHandlerRootView>
  );
}
