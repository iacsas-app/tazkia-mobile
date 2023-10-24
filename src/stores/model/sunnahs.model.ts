import { Action, Computed, Thunk, action, computed, persist, thunk } from 'easy-peasy';
import ProgressLine from '../../domains/common/ProgressLine';
import Sunnah from '../../domains/sunnahs/Sunnah';
import Sunnahs, { SunnahStage } from '../../domains/sunnahs/Sunnahs';
import { SUNNAHS_MAX_DAYS } from '../../services/Helpers';
import { Injections } from '../injections';
import { storageEngine } from '../storage-engine';

export interface SunnahsModel {
  isLoaded: boolean;
  item: Sunnahs | undefined;

  // Actions
  load: Action<SunnahsModel, [SunnahStage, Sunnah]>;
  reset: Action<SunnahsModel>;
  evaluation: Action<SunnahsModel, [number, SunnahStage, boolean]>;

  // Thunk
  //find: Thunk<SunnahsModel, void, Injections>;
  createOrUpdate: Thunk<SunnahsModel, [SunnahStage, Sunnah], Injections>;
  evaluate: Thunk<SunnahsModel, [number, SunnahStage, boolean], Injections>;

  findByIdForStage: Computed<SunnahsModel, (stage: SunnahStage, sunnahId: number) => Sunnah | undefined>;
}

const sunnahsModel: SunnahsModel = {
  isLoaded: false,
  item: undefined,

  // Actions
  load: action((state, payload: [SunnahStage, Sunnah]) => {
    const [stage, sunnah] = payload;
    if (!state.item) {
      state.item = { habits: [], worship: [], truths: [] };
    }
    const current = getStageProgress(stage, state.item);
    if (!current.find((item) => item.id === sunnah.id)) {
      state.item = { ...state.item, [stage]: [...current, sunnah] };
    }
    state.isLoaded = true;
  }),
  reset: action((state) => {
    state.item = undefined;
    state.isLoaded = false;
  }),
  evaluation: action((state, payload: [number, SunnahStage, boolean]) => {
    const [ruleId, stage, checked] = payload;
    if (!state.item) {
      return;
    }

    const errors: number[] = [];
    if (!checked) {
      errors.push(1);
    }
    const current = getStageProgress(stage, state.item);
    current.forEach((item) => {
      if (item.id === ruleId) {
        item = updateProgress(item, errors);
        return;
      }
    });
  }),

  // Thunks
  /* find: thunk(async (actions, _void, { injections }) => {
    const { tazkiaService } = injections;
    const item = await tazkiaService.find();
    actions.load(item);
  }),
  **/
  createOrUpdate: thunk(async (actions, payload: [SunnahStage, Sunnah], { injections }) => {
    //const { tazkiaService } = injections;
    //const item = await tazkiaService.createOrUpdate(payload);

    actions.load(payload);
  }),
  evaluate: thunk(async (actions, payload: [number, SunnahStage, boolean], { injections }) => {
    actions.evaluation(payload);
  }),

  // Computed
  findByIdForStage: computed((state) => (stage: SunnahStage, sunnahId: number): Sunnah | undefined => {
    if (!state.item) {
      return undefined;
    }
    const current = getStageProgress(stage, state.item);
    return current.find((item) => item.id === sunnahId);
  }),
};

function getStageProgress(stage: SunnahStage, item: Sunnahs) {
  switch (stage) {
    case 'habits':
      return item.habits;
    case 'worship':
      return item.worship;
    case 'truths':
      return item.truths;
  }
}

function updateProgress(item: Sunnah, errors: number[]): Sunnah {
  const progress: ProgressLine[] = item.progress;
  if (progress.length === 0) {
    return item;
  }
  const lastIndex = progress.length - 1;
  let last = progress.at(lastIndex);
  if (last) {
    const nextDay = last.day < SUNNAHS_MAX_DAYS ? last.day + 1 : last.day;
    const newValue = { ...last, evaluated: true, day: nextDay };
    if (errors.length === 0) {
      progress[lastIndex] = newValue;
    } else {
      if (last.failedAttempts === 2) {
        progress[lastIndex] = { ...newValue, errors };
        progress.push({ startDate: Date.now(), day: 0, errors: [], evaluated: false });
        last.failedAttempts = 0;
      } else {
        progress[lastIndex] = {
          ...last,
          day: nextDay,
          failedAttempts: last.failedAttempts ? last.failedAttempts + 1 : 1,
        };
      }
    }
  }
  return item;
}

export default persist(sunnahsModel, {
  storage: storageEngine,
  allow: ['item'],
});
