import { Action, action, persist } from 'easy-peasy';
import { defaultLanguage, locales } from '../../locales';
import { MessageKeyValue, SupportedLocale } from '../../locales/types';
import { storageEngine } from '../storage-engine';

export interface IntlModel {
  locale: SupportedLocale;
  messages: MessageKeyValue;
  update: Action<IntlModel, SupportedLocale>;
}

let defaultLocale: SupportedLocale = defaultLanguage;

const intlModel: IntlModel = {
  locale: defaultLocale,
  messages: locales[defaultLocale] as any,

  update: action((state, payload) => {
    state.locale = payload;
    state.messages = locales[payload] as any;
  }),
};

export default persist(intlModel, {
  storage: storageEngine,
  allow: ['locale'],
});
