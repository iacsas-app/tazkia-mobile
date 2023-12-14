import React, { useCallback, useRef, useState } from 'react';
import { Easing, Image, StyleSheet } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import SettingsDialog, { SettingsDialogRef } from '../components/dialogs/SettingsDialog';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import GlobalStyles from '../styles/GlobalStyles';
import InvocationsStack from './stacks/InvocationsStack';
import PresentationStack from './stacks/PresentationStack';
import PurificationStack from './stacks/PurificationStack';

type RoutesState = Array<{
  key: string;
  title: string;
  focusedIcon: string;
}>;

const RootNavigator = () => {
  const { formatMessage } = useMessage();
  const ref = useRef<SettingsDialogRef>(null);

  const openSettingDialog = useCallback(() => ref.current?.open(), []);

  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);

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

  return (
    <SafeAreaProvider>
      <Appbar.Header elevated style={styles.header}>
        <Appbar.Header style={styles.logoContainer}>
          <Image source={require('./../../assets/logo.png')} style={styles.logo} />
        </Appbar.Header>
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
        renderScene={BottomNavigation.SceneMap({
          presentation: PresentationStack,
          purification: PurificationStack,
          invocations: InvocationsStack,
        })}
        sceneAnimationEnabled={true}
        sceneAnimationType={'shifting'}
        sceneAnimationEasing={Easing.ease}
      />
      <SettingsDialog ref={ref} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  header: { height: 45 },
  logoContainer: { backgroundColor: 'transparent', height: 45 },
  logo: {
    width: 45,
    resizeMode: 'contain',
    marginStart: 3,
    aspectRatio: 1,
  },
  headerContentTitle: {
    fontSize: 17,
    fontWeight: '900',
    verticalAlign: 'middle',
    color: 'seagreen',
  },
  headerContent: { ...GlobalStyles.center, paddingEnd: 60 },
  headerAction: { right: 0, position: 'absolute' },
  bottomNav: { height: 67 },
});

export default RootNavigator;
