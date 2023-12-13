import { Action, action } from 'easy-peasy';

export interface GlobalModel {
  firstVisitDate: number | undefined | null;
  arabic: boolean; // Text orientation
  isPurification: boolean;

  // Actions
  setArabicOrientation: Action<GlobalModel, boolean>;
  setFirstVisitDate: Action<GlobalModel, number | undefined | null>;
  setIsPurification: Action<GlobalModel, boolean>;
}

const globalModel: GlobalModel = {
  firstVisitDate: undefined,
  arabic: false,
  isPurification: false,

  // Actions
  setArabicOrientation: action((state, payload: boolean) => {
    state.arabic = payload;
  }),
  setFirstVisitDate: action((state, payload: number | undefined | null) => {
    state.firstVisitDate = payload;
  }),
  setIsPurification: action((state, payload: boolean) => {
    state.isPurification = payload;
  }),
};

export default globalModel;
