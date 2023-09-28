import { Action, action, persist } from 'easy-peasy';
import { storageEngine } from '../storage-engine';

export interface GlobalModel {
  arabicOrientation: boolean; // Text orientation

  // Actions
  setArabicOrientation: Action<GlobalModel, boolean>;
}

const globalModel: GlobalModel = {
  arabicOrientation: false,

  // Actions
  setArabicOrientation: action((state, payload: boolean) => {
    state.arabicOrientation = payload;
  }),
};

export default persist(globalModel, {
  storage: storageEngine,
  allow: ['arabicOrientation'],
});
