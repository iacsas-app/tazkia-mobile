import Icon from '@expo/vector-icons/Ionicons';
import { HStack } from '@react-native-material/core';
import { Dispatch, PropsWithChildren, ReactElement, createContext, useContext, useReducer } from 'react';
import { Snackbar } from 'react-native-paper';
import Text from '../components/Text';

export type SnackbarVariant = 'info' | 'success' | 'warning' | 'error';

interface SnackbarState {
  visible: boolean;
  content: string;
  variant: SnackbarVariant;
}
const defaultState: SnackbarState = { visible: false, content: '', variant: 'info' };

enum SnackbarActionKeys {
  SHOW = 'SHOW',
  CLOSE = 'CLOSE',
}

export type SnackbarAction =
  | { type: SnackbarActionKeys.SHOW; payload: [string, SnackbarVariant] }
  | { type: SnackbarActionKeys.CLOSE };

function reducer(state: SnackbarState, action: SnackbarAction): SnackbarState {
  switch (action.type) {
    case SnackbarActionKeys.SHOW:
      const [message, variant] = action.payload;
      return { ...state, visible: true, content: message, variant };
    case SnackbarActionKeys.CLOSE:
      return { ...state, visible: false, content: '' };
  }
}

const StateContext = createContext<SnackbarState | undefined>(undefined);
const DispatchContext = createContext<Dispatch<SnackbarAction> | undefined>(undefined);

function useSnackbarDispatch(): Dispatch<SnackbarAction> {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error('Must be used within a SnackbarProvider');
  }
  return context;
}

export function useSnackbar() {
  const dispatch = useSnackbarDispatch();

  function displaySnackbar(message: string, variant: SnackbarVariant) {
    dispatch({ type: SnackbarActionKeys.SHOW, payload: [message, variant] });
  }

  return {
    displaySnackbar,
  };
}

function backgroundColor(variant: SnackbarVariant) {
  switch (variant) {
    case 'info':
      return '#4169e1';
    case 'success':
      return '#3cb371';
    case 'warning':
      return '#ffa500';
    case 'error':
      return '#ff4500';
  }
}

function iconName(variant: SnackbarVariant) {
  switch (variant) {
    case 'info':
      return 'bulb-outline';
    case 'success':
      return 'checkmark-circle-outline';
    case 'warning':
      return 'warning-outline';
    case 'error':
      return 'alert-circle-outline';
  }
}

export default function SnackbarProvider({ children }: PropsWithChildren<unknown>): ReactElement {
  const [state, dispatch] = useReducer(reducer, { ...defaultState });

  function onDismiss() {
    dispatch({ type: SnackbarActionKeys.CLOSE });
  }

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
        <Snackbar
          visible={state.visible}
          style={{ backgroundColor: backgroundColor(state.variant) }}
          elevation={5}
          onDismiss={onDismiss}
          duration={500}
        >
          <HStack style={{ alignContent: 'center', justifyContent: 'space-between' }}>
            <Text variant="h6" color="white">
              {state.content}
            </Text>
            <Icon name={iconName(state.variant)} size={30} color="white" />
          </HStack>
        </Snackbar>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
