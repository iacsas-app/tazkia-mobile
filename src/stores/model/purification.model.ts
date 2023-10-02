import { Action, Computed, Thunk, action, computed, persist, thunk } from 'easy-peasy';
import ProgressLine from '../../domains/common/ProgressLine';
import BodyPart, { BodyPartType } from '../../domains/purification/BodyPart';
import Purification from '../../domains/purification/Purification';
import { PurificationStep } from '../../screens/purification/steps/bodyPartsStep/BodyPartsScreen';
import { isBodyPartStepInProgress } from '../../services/Helpers';
import { Injections } from '../injections';
import { storageEngine } from '../storage-engine';

export interface PurificationModel {
  isLoaded: boolean;
  item: Purification | undefined;

  // Actions
  load: Action<PurificationModel, Purification>;
  reset: Action<PurificationModel>;

  // Thunk
  find: Thunk<PurificationModel, void, Injections>;
  createOrUpdate: Thunk<PurificationModel, Purification, Injections>;

  // Computed
  findByPart: Computed<PurificationModel, (part: BodyPartType) => BodyPart | undefined>;

  findByPartAndStep: Computed<
    PurificationModel,
    (part: BodyPartType, step: PurificationStep) => ProgressLine[] | undefined
  >;
  hasBodyPartProgress: Computed<PurificationModel, (part: BodyPartType, step: PurificationStep) => boolean>;
}

const purificationModel: PurificationModel = {
  isLoaded: false,
  item: undefined,

  // Actions
  load: action((state, payload: Purification) => {
    state.item = payload;
    state.isLoaded = true;
  }),
  reset: action((state) => {
    state.item = undefined;
    state.isLoaded = false;
  }),

  // Thunks
  find: thunk(async (actions, _void, { injections }) => {
    const { tazkiaService } = injections;
    const item = await tazkiaService.find();
    actions.load(item);
  }),
  createOrUpdate: thunk(async (actions, payload: Purification, { injections }) => {
    //const { tazkiaService } = injections;
    //const item = await tazkiaService.createOrUpdate(payload);
    actions.load(payload);
  }),

  // Computed
  findByPart: computed((state) => (part: BodyPartType): BodyPart | undefined => {
    if (!state.item) {
      return undefined;
    }
    return state.item.bodyParts.find((item) => item.name === part);
  }),
  findByPartAndStep: computed((state) => (part: BodyPartType, step: PurificationStep): ProgressLine[] | undefined => {
    if (!state.item) {
      return undefined;
    }
    const result = state.item.bodyParts.find((item) => item.name === part && item[step]?.length !== 0);
    return isBodyPartStepInProgress(result, step);
  }),
  hasBodyPartProgress: computed((state) => (part: BodyPartType, mode: PurificationStep): boolean => {
    return state.findByPartAndStep(part, mode) !== undefined;
  }),
};

export default persist(purificationModel, {
  storage: storageEngine,
  allow: ['item'],
});
