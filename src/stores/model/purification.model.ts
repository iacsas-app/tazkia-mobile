import { Action, Thunk, action, persist, thunk } from 'easy-peasy';
import Purification from '../../domains/purification/Purification';
import { Injections } from '../injections';
import { storageEngine } from '../storage-engine';

export interface PurificationModel {
  isLoaded: boolean;
  item: Purification | undefined;

  // Actions
  load: Action<PurificationModel, Purification>;

  // Thunk
  find: Thunk<PurificationModel, void, Injections>;
  createOrUpdate: Thunk<PurificationModel, Purification, Injections>;
}

const purificationModel: PurificationModel = {
  isLoaded: false,
  item: undefined,

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

export default persist(purificationModel, {
  storage: storageEngine,
  allow: ['item'],
});
