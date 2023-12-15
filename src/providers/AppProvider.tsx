import {
  Dispatch,
  PropsWithChildren,
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { defaultLanguage, localesTranslation } from '../locales';
import { LOCALE_KEY, SupportedLocale } from '../locales/types';
import { FIRST_VISIT_DATE, deviceLanguage, reloadIfNecessary } from '../services/Helpers';
import { storageEngine } from '../stores/storage-engine';

interface GlobalState {
  locale: SupportedLocale | undefined;
  firstVisitDate: number | undefined | null;
}
const defaultState: GlobalState = { locale: undefined, firstVisitDate: undefined };

enum GlobalActionKeys {
  SET_LOCALE = 'SET_LOCALE',
  SET_FIST_VISIT_DATE = 'SET_FIST_VISIT_DATE',
}

export type GlobalAction =
  | { type: GlobalActionKeys.SET_LOCALE; payload: SupportedLocale }
  | { type: GlobalActionKeys.SET_FIST_VISIT_DATE; payload: number | null };

const languageKeys = Object.keys(localesTranslation) as SupportedLocale[];
const systemLanguage = deviceLanguage();

function reducer(state: GlobalState, action: GlobalAction): GlobalState {
  switch (action.type) {
    case GlobalActionKeys.SET_LOCALE: {
      let locale = action.payload;
      if (!locale) {
        const isLangSupported = languageKeys.find((item) => item === systemLanguage) !== undefined;
        locale = isLangSupported ? (systemLanguage as SupportedLocale) : defaultLanguage;
      }
      storageEngine.setItem(LOCALE_KEY, locale).then(() => reloadIfNecessary(locale));
      return { ...state, locale };
    }
    case GlobalActionKeys.SET_FIST_VISIT_DATE: {
      storageEngine.setItem(FIRST_VISIT_DATE, action.payload);
      return { ...state, firstVisitDate: action.payload };
    }
  }
}

const StateContext = createContext<GlobalState | undefined>(undefined);
const DispatchContext = createContext<Dispatch<GlobalAction> | undefined>(undefined);

function useGlobalDispatch(): Dispatch<GlobalAction> {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error('Must be used within a GlobalProvider');
  }
  return context;
}
function useGlobalState(): GlobalState {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('Must be used within a GlobalProvider');
  }
  return context;
}

export function useGlobal() {
  const dispatch = useGlobalDispatch();
  const state = useGlobalState();
  const systemLanguage = useMemo(() => deviceLanguage(), []);
  const isSystemLanguageSupported = useMemo(
    () => Object.keys(localesTranslation).find((item) => item === systemLanguage) !== undefined,
    [],
  );
  const defaultLang = useMemo(
    () => (isSystemLanguageSupported ? (systemLanguage as SupportedLocale) : defaultLanguage),
    [],
  );

  function setLocale(payload: SupportedLocale) {
    dispatch({ type: GlobalActionKeys.SET_LOCALE, payload });
  }
  function setFirstVisitDate(payload: number | null) {
    dispatch({ type: GlobalActionKeys.SET_FIST_VISIT_DATE, payload });
  }

  return {
    ...state,
    arabic: state.locale === 'ar',
    defaultLang,
    systemLanguage,
    isSystemLanguageSupported,
    setLocale,
    setFirstVisitDate,
  };
}

export default function AppProvider({ children }: PropsWithChildren<unknown>): ReactElement {
  const [state, dispatch] = useReducer(reducer, { ...defaultState });

  useEffect(() => {
    if (!state.locale) {
      try {
        storageEngine.getItem(LOCALE_KEY).then((lang) => {
          dispatch({ type: GlobalActionKeys.SET_LOCALE, payload: lang });
        });
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (state.firstVisitDate === undefined) {
      try {
        storageEngine
          .getItem(FIRST_VISIT_DATE)
          .then((date) => dispatch({ type: GlobalActionKeys.SET_FIST_VISIT_DATE, payload: date }));
      } catch (e) {}
    }
  }, []);

  if (!state.locale || state.firstVisitDate === undefined) {
    return <></>;
  }

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
}
