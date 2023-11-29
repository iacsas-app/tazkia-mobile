import { Action, Computed, Thunk, action, computed, persist, thunk } from 'easy-peasy';
import ProgressLine from '../../domains/common/ProgressLine';
import BodyPart, { BodyPartType, PurificationStage } from '../../domains/purification/BodyPart';
import Mind, { MindLevel } from '../../domains/purification/Mind';
import Purification from '../../domains/purification/Purification';
import Soul, { SoulPart, SoulPartLevel } from '../../domains/purification/Soul';
import { PURIFICATION_MAX_DAYS } from '../../services/Helpers';
import { Injections } from '../injections';
import { storageEngine } from '../storage-engine';

export interface PurificationModel {
  isLoaded: boolean;
  item: Purification | undefined;

  // Actions
  load: Action<PurificationModel, Purification>;
  bodyPartEvaluation: Action<PurificationModel, [BodyPartType, PurificationStage, number[]]>;
  resetBodyPart: Action<PurificationModel, [BodyPartType, PurificationStage]>;
  mindEvaluation: Action<PurificationModel, [MindLevel, boolean]>;
  resetMind: Action<PurificationModel, MindLevel>;
  soulEvaluation: Action<PurificationModel, [SoulPart, SoulPartLevel, boolean]>;
  resetSoul: Action<PurificationModel, [SoulPart, SoulPartLevel]>;
  reset: Action<PurificationModel>;

  // Thunk
  find: Thunk<PurificationModel, void, Injections>;
  createOrUpdate: Thunk<PurificationModel, Purification, Injections>;
  evaluateBodyPart: Thunk<PurificationModel, [BodyPartType, PurificationStage, number[]], Injections>;
  restartBodyPart: Thunk<PurificationModel, [BodyPartType, PurificationStage], Injections>;
  evaluateMind: Thunk<PurificationModel, [MindLevel, boolean], Injections>;
  restartMind: Thunk<PurificationModel, MindLevel, Injections>;
  evaluateSoul: Thunk<PurificationModel, [SoulPart, SoulPartLevel, boolean], Injections>;
  restartSoul: Thunk<PurificationModel, [SoulPart, SoulPartLevel], Injections>;

  // Computed
  findBodyPart: Computed<PurificationModel, (part: BodyPartType) => BodyPart | undefined>;
  findByMind: Computed<PurificationModel, (level: MindLevel) => Mind | undefined>;
  findSoul: Computed<PurificationModel, (part: SoulPart, level?: SoulPartLevel) => Soul | undefined>;
  lastMindLevel: Computed<PurificationModel, () => Mind | undefined>;

  findByPartTypeAndStage: Computed<
    PurificationModel,
    (type: BodyPartType, stage: PurificationStage) => ProgressLine[] | undefined
  >;
  hasBodyPartProgress: Computed<PurificationModel, (part: BodyPartType, step: PurificationStage) => boolean>;
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
  bodyPartEvaluation: action((state, payload: [BodyPartType, PurificationStage, number[]]) => {
    if (!state.item) {
      return;
    }
    const [type, step, errors] = payload;

    state.item.bodyParts.forEach((part) => {
      if (part.name === type) {
        part[step] = updateProgress(part[step], errors)[0];
        return;
      }
    });
  }),
  resetBodyPart: action((state, payload: [BodyPartType, PurificationStage]) => {
    if (!state.item) {
      return;
    }
    const [part, stage] = payload;
    state.item.bodyParts = state.item.bodyParts.map((item) => {
      if (item.name === part) {
        return {
          ...item,
          [stage]: undefined,
        };
      }
      return item;
    });
  }),
  mindEvaluation: action((state, payload: [MindLevel, boolean]) => {
    const [level, checked] = payload;
    if (!state.item) {
      return;
    }

    const errors: number[] = [];
    if (!checked) {
      errors.push(1);
    }
    let isLastCompletedWithSuccess = false;
    state.item.mind.forEach((item) => {
      if (item.level === level) {
        const [progress, isLastSuccess] = updateProgress(item.progress, errors);
        item.progress = progress;
        isLastCompletedWithSuccess = isLastSuccess;
        return;
      }
    });
    // Add automatically new level
    if (isLastCompletedWithSuccess && level !== 9) {
      state.item.mind.push({
        level: (level + 1) as MindLevel,
        progress: [{ startDate: Date.now(), day: 0, evaluated: false, errors: [] }],
      });
    }
  }),

  resetMind: action((state, payload: MindLevel) => {
    if (!state.item) {
      return;
    }
    state.item.mind = state.item.mind.map((item) => ({
      ...item,
      progress:
        item.level === payload ? [{ startDate: Date.now(), day: 0, evaluated: false, errors: [] }] : item.progress,
    }));
  }),

  soulEvaluation: action((state, payload: [SoulPart, SoulPartLevel, boolean]) => {
    const [part, level, checked] = payload;
    if (!state.item) {
      return;
    }

    const errors: number[] = [];
    if (!checked) {
      errors.push(1);
    }
    state.item.soul.forEach((item) => {
      if (item.part === part) {
        const pp = item.partProgress.find((pp) => pp.level === level);
        if (pp) {
          const [progress, _] = updateProgress(pp.progress, errors);
          pp.progress = progress;
          item.partProgress = item.partProgress.map((i) => (i.level === level ? pp : i));
          return;
        }
      }
    });
  }),

  resetSoul: action((state, payload: [SoulPart, SoulPartLevel]) => {
    if (!state.item) {
      return;
    }
    const [part, level] = payload;
    let empty = false;
    state.item.soul = state.item.soul.map((item) => {
      if (item.part === part) {
        item.partProgress = item.partProgress.filter((pr) => pr.level !== level);
        empty = item.partProgress.length === 0;
      }
      return item;
    });
    if (empty) {
      state.item.soul = state.item.soul.filter((item) => item.part !== part);
    }
  }),

  // Thunks
  find: thunk(async (actions, _void, { injections }) => {
    const { tazkiaService } = injections;
    const item = await tazkiaService.find();
    actions.load(item);
  }),
  createOrUpdate: thunk(async (actions, payload: Purification, { injections }) => {
    actions.load(payload);
  }),
  evaluateBodyPart: thunk(async (actions, payload: [BodyPartType, PurificationStage, number[]], { injections }) => {
    actions.bodyPartEvaluation(payload);
  }),
  restartBodyPart: thunk(async (actions, payload: [BodyPartType, PurificationStage], { injections }) => {
    actions.resetBodyPart(payload);
  }),
  evaluateMind: thunk(async (actions, payload: [MindLevel, boolean], { injections }) => {
    actions.mindEvaluation(payload);
  }),
  restartMind: thunk(async (actions, payload: MindLevel, { injections }) => {
    actions.resetMind(payload);
  }),
  evaluateSoul: thunk(async (actions, payload: [SoulPart, SoulPartLevel, boolean], { injections }) => {
    actions.soulEvaluation(payload);
  }),
  restartSoul: thunk(async (actions, payload: [SoulPart, SoulPartLevel], { injections }) => {
    actions.resetSoul(payload);
  }),

  // Computed
  findBodyPart: computed((state) => (part: BodyPartType): BodyPart | undefined => {
    if (!state.item) {
      return undefined;
    }
    return state.item.bodyParts.find((item) => item.name === part);
  }),
  findByPartTypeAndStage: computed(
    (state) =>
      (part: BodyPartType, step: PurificationStage): ProgressLine[] | undefined => {
        if (!state.item) {
          return undefined;
        }
        const result = state.item.bodyParts.find((item) => item.name === part && item[step]?.length !== 0);
        return result && result[step];
      },
  ),
  hasBodyPartProgress: computed((state) => (part: BodyPartType, mode: PurificationStage): boolean => {
    return state.findByPartTypeAndStage(part, mode) !== undefined;
  }),
  findByMind: computed((state) => (level: MindLevel): Mind | undefined => {
    if (!state.item) {
      return undefined;
    }
    return state.item.mind.find((item) => item.level === level);
  }),
  findSoul: computed((state) => (part: SoulPart, level?: SoulPartLevel): Soul | undefined => {
    if (!state.item) {
      return undefined;
    }
    return state.item.soul.find(
      (item) => item.part == part && (!level || item.partProgress.some((l) => l.level === level)),
    );
  }),
  lastMindLevel: computed((state) => (): Mind | undefined => {
    if (!state.item) {
      return undefined;
    }
    const list = state.item.mind;
    const size = list.length;
    if (size === 0) {
      return undefined;
    }
    return list.at(size - 1);
  }),
};

function updateProgress(progress: ProgressLine[] | undefined, errors: number[]): [ProgressLine[], boolean] {
  if (!progress || progress.length === 0) {
    return [[], false];
  }
  const lastIndex = progress.length - 1;
  let last = progress.at(lastIndex);
  let lastIsSuccess = false;
  if (last) {
    const nextDay = last.day < PURIFICATION_MAX_DAYS ? last.day + 1 : last.day;
    const newValue = { ...last, evaluated: true, day: nextDay };
    if (errors.length === 0) {
      lastIsSuccess = newValue.day === PURIFICATION_MAX_DAYS;
      progress[lastIndex] = newValue;
    } else {
      progress[lastIndex] = { ...newValue, errors };
      progress.push({ startDate: Date.now(), day: 0, errors: [], evaluated: false });
    }
  }
  return [progress, lastIsSuccess];
}

export default persist(purificationModel, {
  storage: storageEngine,
  allow: ['item'],
});
