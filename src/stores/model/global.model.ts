import { Action, action, persist } from 'easy-peasy';
import { storageEngine } from '../storage-engine';

export interface GlobalModel {
  arabic: boolean; // Text orientation

  // Actions
  setArabicOrientation: Action<GlobalModel, boolean>;
}

const globalModel: GlobalModel = {
  arabic: false,

  // Actions
  setArabicOrientation: action((state, payload: boolean) => {
    state.arabic = payload;
  }),
};

export default persist(globalModel, {
  storage: storageEngine,
  allow: ['arabic'],
});
