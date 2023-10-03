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
  bodyPartEvaluation: Action<PurificationModel, [BodyPartType, PurificationStep, number[]]>;
  reset: Action<PurificationModel>;

  // Thunk
  find: Thunk<PurificationModel, void, Injections>;
  createOrUpdate: Thunk<PurificationModel, Purification, Injections>;
  evaluateBodyPart: Thunk<PurificationModel, [BodyPartType, PurificationStep, number[]], Injections>;

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
  bodyPartEvaluation: action((state, payload: [BodyPartType, PurificationStep, number[]]) => {
    const [type, step, errors] = payload;
    if (!state.item) {
      return;
    }
    state.item.bodyParts.forEach((part) => {
      if (part.name === type) {
        part[step] = updateProgress(part[step], errors);
        return;
      }
    });
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
  evaluateBodyPart: thunk(async (actions, payload: [BodyPartType, PurificationStep, number[]], { injections }) => {
    actions.bodyPartEvaluation(payload);
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

function updateProgress(progress: ProgressLine[] | undefined, errors: number[]): ProgressLine[] {
  if (!progress || progress.length === 0) {
    return [];
  }
  const lastIndex = progress.length - 1;
  let last = progress.at(lastIndex);
  if (last) {
    const newValue = { ...last, evaluated: true, day: last.day < 30 ? last.day + 1 : last.day };
    if (errors.length === 0) {
      progress[lastIndex] = newValue;
    } else {
      progress[lastIndex] = { ...newValue, errors };
      progress.push({ startDate: Date.now(), day: 0, errors: [], evaluated: false });
    }
  }
  return progress;
}

export default persist(purificationModel, {
  storage: storageEngine,
  allow: ['item'],
});
