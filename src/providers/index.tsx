import { PropsWithChildren } from 'react';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import IntlProvider from './IntlProvider';
import SnackbarProvider from './SnackbarProvider';
import StoreProvider from './StoreProvider';

export default function Providers({ children }: PropsWithChildren<unknown>) {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'green',
      secondary: 'red',
    },
  };

  return (
    <StoreProvider>
      <IntlProvider>
        <PaperProvider theme={theme}>
          <SnackbarProvider>{children}</SnackbarProvider>
        </PaperProvider>
      </IntlProvider>
    </StoreProvider>
  );
}
