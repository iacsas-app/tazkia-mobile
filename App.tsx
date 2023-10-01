import { Provider } from '@react-native-material/core';
import { StatusBar } from 'react-native';
import RootNavigator from './src/navigation';
import Providers from './src/providers';

export default function App() {
  const props: any = {};
  return (
    <Providers>
      <Provider {...props}>
        <RootNavigator />
        <StatusBar animated={true} backgroundColor="white" showHideTransition={'fade'} hidden={false} />
      </Provider>
    </Providers>
  );
}
