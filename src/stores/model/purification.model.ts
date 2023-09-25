import { Action, Thunk, action, thunk } from 'easy-peasy';
import Purification from '../../domains/purification/Purification';
import { Injections } from '../injections';

export interface PurificationModel {
  isLoaded: boolean;
  item: Purification;

  // Actions
  load: Action<PurificationModel, Purification>;

  // Thunk
  find: Thunk<PurificationModel, void, Injections>;
  createOrUpdate: Thunk<PurificationModel, Purification, Injections>;
}

export const purificationModel: PurificationModel = {
  isLoaded: false,
  item: { id: 0, step1: [], step2: [], step3: [] },

  // Actions
  load: action((state, payload: Purification) => {
    state.item = payload;
    state.isLoaded = true;
  }),

  // Thunks
  find: thunk(async (actions, _void, { injections }) => {
    const { tazkiaService } = injections;
    const item = await tazkiaService.find();
    actions.load(item);
  }),
  createOrUpdate: thunk(async (actions, payload: Purification, { injections }) => {
    const { tazkiaService } = injections;
    const item = await tazkiaService.createOrUpdate(payload);
    actions.load(item);
  }),
};
