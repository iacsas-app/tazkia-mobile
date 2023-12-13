import { PropsWithChildren } from 'react';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { lightGreenColors } from '../constants/Theme';
import IntlProvider from './IntlProvider';
import SnackbarProvider from './SnackbarProvider';
import StoreProvider from './StoreProvider';

export default function Providers({ children }: PropsWithChildren<unknown>) {
  const theme = { ...DefaultTheme, colors: { ...lightGreenColors } };

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
