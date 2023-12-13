import { StoreProvider as ReactStoreProvider } from 'easy-peasy';
import { PropsWithChildren } from 'react';
import store from '../stores';

export default function StoreProvider({ children }: PropsWithChildren<unknown>) {
  return <ReactStoreProvider store={store}>{children}</ReactStoreProvider>;
}
