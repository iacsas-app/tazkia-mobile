import React, { useCallback, useRef } from 'react';
import { Easing } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import SettingsDialog, { SettingsDialogRef } from '../components/dialogs/SettingsDialog';
import Header from '../components/header/Header';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import InvocationsStack from './stacks/InvocationsStack';
import PresentationStack from './stacks/PresentationStack';
import PurificationStack from './stacks/PurificationStack';

type RoutesState = Array<{
  key: string;
  title: string;
  focusedIcon: string;
  unfocusedIcon?: string;
  color?: string;
  badge?: boolean;
  getAccessibilityLabel?: string;
  getTestID?: string;
}>;

const RootNavigator = () => {
  const { formatMessage } = useMessage();
  const ref = useRef<SettingsDialogRef>(null);
  const openSettingDialog = useCallback(() => ref.current?.open(), []);

  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);
  const [sceneAnimation, setSceneAnimation] =
    React.useState<React.ComponentProps<typeof BottomNavigation>['sceneAnimationType']>();

  const [routes] = React.useState<RoutesState>([
    {
      key: 'presentation',
      title: formatMessage(TKeys.MENU_HOME),
      focusedIcon: 'home',
    },
    {
      key: 'purification',
      title: formatMessage(TKeys.MENU_PURIFICATION),
      focusedIcon: 'heart-pulse',
    },
    {
      key: 'invocations',
      title: formatMessage(TKeys.MENU_INVOCATIONS),
      focusedIcon: 'meditation',
    },
  ]);

  return (
    <SafeAreaProvider>
      <Appbar.Header elevated style={{ height: 45 }}>
        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
          <Header />
        </Appbar.Header>
        <Appbar.Action
          icon="dots-vertical"
          style={{ right: 0, position: 'absolute' }}
          size={30}
          onPressIn={openSettingDialog}
        />
      </Appbar.Header>
      <BottomNavigation
        safeAreaInsets={{ bottom: insets.bottom }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        barStyle={{ height: 67 }}
        labelMaxFontSizeMultiplier={2}
        renderScene={BottomNavigation.SceneMap({
          presentation: PresentationStack,
          purification: PurificationStack,
          invocations: InvocationsStack,
        })}
        sceneAnimationEnabled={sceneAnimation !== undefined}
        sceneAnimationType={sceneAnimation}
        sceneAnimationEasing={Easing.ease}
      />
      <SettingsDialog ref={ref} />
    </SafeAreaProvider>
  );
};

export default RootNavigator;
