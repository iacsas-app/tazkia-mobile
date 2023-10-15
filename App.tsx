import { Provider } from '@react-native-material/core';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation';
import Providers from './src/providers';

export default function App() {
  const props: any = {};
  return (
    <Providers>
      <Provider {...props}>
        <StatusBar animated={true} hidden={true} />
        <RootNavigator />
      </Provider>
    </Providers>
  );
}

registerRootComponent(App);
