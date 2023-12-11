import { registerRootComponent } from 'expo';
import { useKeepAwake } from 'expo-keep-awake';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import Providers from './src/providers';

export default function App() {
  useKeepAwake();

  return (
    <Providers>
      <StatusBar animated={true} hidden={true} />
      <RootNavigator />
    </Providers>
  );
}

registerRootComponent(App);
