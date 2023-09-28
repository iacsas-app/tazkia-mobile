import { Action, action, persist } from 'easy-peasy';
import Sunnahs from '../../domains/sunnahs/Sunnahs';
import { storageEngine } from '../storage-engine';

export interface SunnahsModel {
  isLoaded: boolean;
  item: Sunnahs | undefined;

  // Actions
  load: Action<SunnahsModel, Sunnahs>;

  // Thunk
  //find: Thunk<SunnahsModel, void, Injections>;
  //createOrUpdate: Thunk<SunnahsModel, Purification, Injections>;
}

const sunnahsModel: SunnahsModel = {
  isLoaded: false,
  item: undefined,

  // Actions
  load: action((state, payload: Sunnahs) => {
    state.item = payload;
    state.isLoaded = true;
  }),

  // Thunks
  /* find: thunk(async (actions, _void, { injections }) => {
    const { tazkiaService } = injections;
    const item = await tazkiaService.find();
    actions.load(item);
  }),
  createOrUpdate: thunk(async (actions, payload: Purification, { injections }) => {
    const { tazkiaService } = injections;
    const item = await tazkiaService.createOrUpdate(payload);
    actions.load(item);
  }),*/
};

export default persist(sunnahsModel, {
  storage: storageEngine,
  allow: ['item'],
});
