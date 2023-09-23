import { Action, Thunk, action, persist, thunk } from 'easy-peasy';
import { Injections } from '../injections';
import { storageEngine } from '../storage-engine';

export interface GlobalModel {
  userHasProgress: boolean;
  arabicOrientation: boolean;

  // Actions
  setProgress: Action<GlobalModel, boolean>;
  setArabicOrientation: Action<GlobalModel, boolean>;

  // Thunk
  findProgress: Thunk<GlobalModel, void, Injections>;
  startProgress: Thunk<GlobalModel, void, Injections>;
}

const globalModel: GlobalModel = {
  userHasProgress: false,
  arabicOrientation: false,

  // Actions
  setProgress: action((state, payload: boolean) => {
    state.userHasProgress = payload;
  }),
  setArabicOrientation: action((state, payload: boolean) => {
    state.arabicOrientation = payload;
  }),

  // Thunks
  findProgress: thunk(async (actions, _, { injections }) => {
    const { globalService } = injections;
    const value = await globalService.findProgress();
    actions.setProgress(value);
  }),
  startProgress: thunk(async (actions, _, { injections }) => {
    const { globalService } = injections;
    await globalService.startProgress();
    actions.setProgress(true);
  }),
};

export default persist(globalModel, {
  storage: storageEngine,
  allow: ['userHasProgress', 'arabicOrientation'],
});
