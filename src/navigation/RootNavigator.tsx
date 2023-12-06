import React, { useCallback, useRef, useState } from 'react';
import { Easing, Image, StyleSheet } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from '../components/Text';
import SettingsDialog, { SettingsDialogRef } from '../components/dialogs/SettingsDialog';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import GlobalStyles from '../styles/GlobalStyles';
import InvocationsStack from './stacks/InvocationsStack';
import PresentationStack from './stacks/PresentationStack';
import PurificationStack from './stacks/PurificationStack';

const RootNavigator = () => {
  const { formatMessage } = useMessage();
  const ref = useRef<SettingsDialogRef>(null);
  const openSettingDialog = useCallback(() => ref.current?.open(), []);

  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);
  const [sceneAnimation, setSceneAnimation] =
    useState<React.ComponentProps<typeof BottomNavigation>['sceneAnimationType']>();

  const [routes] = useState<RoutesState>([
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

  const renderScene = BottomNavigation.SceneMap({
    presentation: PresentationStack,
    purification: PurificationStack,
    invocations: InvocationsStack,
  });

  return (
    <SafeAreaProvider>
      <Appbar.Header elevated style={styles.header}>
        <Image source={require('./../../assets/short.png')} style={styles.logo} />
        <Appbar.Content
          title={formatMessage(TKeys.APPLICATION_TITLE_PRIMARY)}
          titleStyle={styles.headerContentTitle}
          style={styles.headerContent}
        />
        <Appbar.Action icon="dots-vertical" style={styles.headerAction} size={25} onPressIn={openSettingDialog} />
      </Appbar.Header>
      <BottomNavigation
        safeAreaInsets={{ bottom: insets.bottom }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        activeColor="seagreen"
        barStyle={styles.bottomNav}
        labelMaxFontSizeMultiplier={2}
        renderScene={renderScene}
        sceneAnimationEnabled={sceneAnimation !== undefined}
        sceneAnimationType={sceneAnimation}
        renderLabel={({ route, color }) => (
          <Text variant="bodyLarge" style={{ ...GlobalStyles.center, marginTop: -4 }} color={color}>
            {route.title}
          </Text>
        )}
        sceneAnimationEasing={Easing.ease}
      />
      <SettingsDialog ref={ref} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  header: { height: 40 },
  logo: { width: 45, resizeMode: 'contain', marginStart: 3 },
  headerContentTitle: {
    fontSize: 17,
    fontWeight: '900',
    verticalAlign: 'middle',
    color: 'seagreen',
  },
  headerContent: { ...GlobalStyles.center, paddingEnd: 55 },
  headerAction: { right: 0, position: 'absolute' },
  bottomNav: { height: 67 },
});

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

export default RootNavigator;
