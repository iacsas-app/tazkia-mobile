import { Action, action } from 'easy-peasy';
import { locales } from '../../locales';
import { LOCALE_KEY, MessageKeyValue, SupportedLocale } from '../../locales/types';
import { reloadIfNecessary } from '../../services/Helpers';
import { storageEngine } from '../storage-engine';

export interface IntlModel {
  locale: SupportedLocale | undefined;
  messages: MessageKeyValue | undefined;
  update: Action<IntlModel, SupportedLocale | undefined>;
}

const intlModel: IntlModel = {
  locale: undefined,
  messages: undefined,

  update: action((state, payload) => {
    if (payload) {
      state.locale = payload;
      state.messages = locales[payload] as any;
      storageEngine.setItem(LOCALE_KEY, payload);
      reloadIfNecessary(payload);
    }
  }),
};

export default intlModel;
