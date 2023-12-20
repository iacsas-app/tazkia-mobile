import React, { useCallback, useRef, useState } from 'react';
import { Easing, Image, StyleSheet } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import SettingsDialog, { SettingsDialogRef } from '../components/dialogs/SettingsDialog';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';
import { useGlobal } from '../providers/AppProvider';
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
  const { arabic } = useGlobal();
  const { formatMessage } = useMessage();
  const ref = useRef<SettingsDialogRef>(null);
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const openSettingDialog = useCallback(() => ref.current?.open(), []);

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
        <Image source={require('./../../assets/logo.png')} style={styles.logo} />
        <Appbar.Content
          title={formatMessage(TKeys.APPLICATION_TITLE_PRIMARY)}
          titleStyle={arabic ? styles.headerContentTitleAr : styles.headerContentTitle}
          style={styles.headerContent}
        />
        <Appbar.Action icon="dots-vertical" style={styles.headerAction} size={32} onPressIn={openSettingDialog} />
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
  logo: {
    width: 50,
    resizeMode: 'contain',
    marginStart: 3,
    aspectRatio: 1,
  },
  headerContentTitleAr: {
    fontSize: 17,
    verticalAlign: 'middle',
    fontFamily: 'Cairo',
    color: 'seagreen',
    height: '100%',
  },
  headerContentTitle: {
    fontSize: 16,
    fontWeight: '900',
    verticalAlign: 'middle',
    color: 'seagreen',
  },
  headerContent: { ...GlobalStyles.center, paddingEnd: 60 },
  headerAction: { right: 0, position: 'absolute' },
  bottomNav: { height: 67 },
});

export default RootNavigator;
