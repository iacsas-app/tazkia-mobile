import { Action, action, persist } from 'easy-peasy';
import { storageEngine } from '../storage-engine';

export interface GlobalModel {
  firstVisit: boolean;
  arabic: boolean; // Text orientation

  // Actions
  setArabicOrientation: Action<GlobalModel, boolean>;
  setFirstVisit: Action<GlobalModel, boolean>;
}

const globalModel: GlobalModel = {
  firstVisit: true,
  arabic: false,

  // Actions
  setArabicOrientation: action((state, payload: boolean) => {
    state.arabic = payload;
  }),
  setFirstVisit: action((state, payload: boolean) => {
    state.firstVisit = payload;
  }),
};

export default persist(globalModel, {
  storage: storageEngine,
  allow: ['firstVisit', 'arabic'],
});
