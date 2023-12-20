import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import Providers from './src/providers';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    AmiriQuran: require('./assets/fonts/AmiriQuran.ttf'),
    ReemKufiFun: require('./assets/fonts/ReemKufiFun.ttf'),
    Cairo: require('./assets/fonts/Cairo.ttf'),
  });

  const onLayoutRootView = async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Providers>
      <StatusBar animated={true} hidden={true} backgroundColor="transparent" />
      <RootNavigator />
    </Providers>
  );
}
registerRootComponent(App);
