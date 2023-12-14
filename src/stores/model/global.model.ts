import { Action, action } from 'easy-peasy';

export interface GlobalModel {
  firstVisitDate: number | undefined | null;
  arabic: boolean; // Text orientation

  // Actions
  setArabicOrientation: Action<GlobalModel, boolean>;
  setFirstVisitDate: Action<GlobalModel, number | undefined | null>;
}

const globalModel: GlobalModel = {
  firstVisitDate: undefined,
  arabic: false,

  // Actions
  setArabicOrientation: action((state, payload: boolean) => {
    state.arabic = payload;
  }),
  setFirstVisitDate: action((state, payload: number | undefined | null) => {
    state.firstVisitDate = payload;
  }),
};

export default globalModel;
