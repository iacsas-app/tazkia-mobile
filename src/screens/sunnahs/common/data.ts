import { SunnahType } from '../../../domains/sunnahs/Sunnah';
import { TKeys } from '../../../locales/constants';

export const habitsRules: Record<number, Record<SunnahType, string[]>> = {
  1: {
    verbal: [
      TKeys.SUNNAHS_HABITS_1_VERBAL_RULE_1,
      TKeys.SUNNAHS_HABITS_1_VERBAL_RULE_2,
      TKeys.SUNNAHS_HABITS_1_VERBAL_RULE_3,
    ],
    actional: [],
  },
  2: { verbal: [TKeys.SUNNAHS_HABITS_2_VERBAL_RULE_1], actional: [] },

  5: {
    verbal: [TKeys.SUNNAHS_HABITS_5_VERBAL_RULE_1],
    actional: [TKeys.SUNNAHS_HABITS_5_ACTIONAL_RULE_1],
  },
};

export const worshipRules: Record<number, Record<SunnahType, string[]>> = {
  1: {
    verbal: [
      TKeys.SUNNAHS_HABITS_1_VERBAL_RULE_1,
      TKeys.SUNNAHS_HABITS_1_VERBAL_RULE_2,
      TKeys.SUNNAHS_HABITS_1_VERBAL_RULE_3,
    ],
    actional: [],
  },
  2: { verbal: [TKeys.SUNNAHS_HABITS_2_VERBAL_RULE_1], actional: [] },
  3: { verbal: [], actional: [] },
  4: { verbal: [], actional: [] },
  5: {
    verbal: [TKeys.SUNNAHS_HABITS_5_VERBAL_RULE_1],
    actional: [TKeys.SUNNAHS_HABITS_5_ACTIONAL_RULE_1],
  },
};

export const truthsRules: Record<number, Record<SunnahType, string[]>> = {
  1: {
    verbal: [
      TKeys.SUNNAHS_HABITS_1_VERBAL_RULE_1,
      TKeys.SUNNAHS_HABITS_1_VERBAL_RULE_2,
      TKeys.SUNNAHS_HABITS_1_VERBAL_RULE_3,
    ],
    actional: [],
  },
  2: { verbal: [TKeys.SUNNAHS_HABITS_2_VERBAL_RULE_1], actional: [] },
  3: { verbal: [], actional: [] },
  4: { verbal: [], actional: [] },
  5: {
    verbal: [TKeys.SUNNAHS_HABITS_5_VERBAL_RULE_1],
    actional: [TKeys.SUNNAHS_HABITS_5_ACTIONAL_RULE_1],
  },
};
