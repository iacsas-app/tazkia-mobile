import { Action, Thunk, action, persist, thunk } from 'easy-peasy';
import { Injections } from '../injections';
import { storageEngine } from '../storage-engine';

export interface Page {
  title: string;
  subTitle: string;
}

export interface GlobalModel {
  hasProgress: boolean;
  arabicOrientation: boolean;
  page: Page;

  // Actions
  setProgress: Action<GlobalModel, boolean>;
  setArabicOrientation: Action<GlobalModel, boolean>;
  setPage: Action<GlobalModel, Page>;

  // Thunk
  findProgress: Thunk<GlobalModel, void, Injections>;
  startProgress: Thunk<GlobalModel, void, Injections>;
}

const globalModel: GlobalModel = {
  hasProgress: false,
  arabicOrientation: false,
  page: { title: 'Main title', subTitle: 'Sub title' },

  // Actions
  setProgress: action((state, payload: boolean) => {
    state.hasProgress = payload;
  }),
  setArabicOrientation: action((state, payload: boolean) => {
    state.arabicOrientation = payload;
  }),
  setPage: action((state, payload: Page) => {
    state.page = payload;
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
  allow: ['hasProgress', 'arabicOrientation'],
});
