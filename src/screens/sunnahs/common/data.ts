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
  3: { verbal: [TKeys.SUNNAHS_HABITS_3_VERBAL_RULE_1], actional: [] },
  4: { verbal: [TKeys.SUNNAHS_HABITS_4_VERBAL_RULE_1], actional: [] },
  5: {
    verbal: [TKeys.SUNNAHS_HABITS_5_VERBAL_RULE_1],
    actional: [TKeys.SUNNAHS_HABITS_5_ACTIONAL_RULE_1],
  },
  6: { verbal: [TKeys.SUNNAHS_HABITS_6_VERBAL_RULE_1], actional: [] },
  7: {
    verbal: [
      TKeys.SUNNAHS_HABITS_7_VERBAL_RULE_1,
      TKeys.SUNNAHS_HABITS_7_VERBAL_RULE_2,
      TKeys.SUNNAHS_HABITS_7_VERBAL_RULE_3,
    ],
    actional: [TKeys.SUNNAHS_HABITS_7_ACTIONAL_RULE_1],
  },
  8: { verbal: [TKeys.SUNNAHS_HABITS_8_VERBAL_RULE_1], actional: [] },
  9: { verbal: [TKeys.SUNNAHS_HABITS_9_VERBAL_RULE_1], actional: [] },
  10: { verbal: [TKeys.SUNNAHS_HABITS_10_VERBAL_RULE_1], actional: [] },
  11: { verbal: [TKeys.SUNNAHS_HABITS_11_VERBAL_RULE_1], actional: [] },
  12: { verbal: [TKeys.SUNNAHS_HABITS_12_VERBAL_RULE_1], actional: [] },
  13: { verbal: [TKeys.SUNNAHS_HABITS_13_VERBAL_RULE_1], actional: [] },
  14: { verbal: [TKeys.SUNNAHS_HABITS_14_VERBAL_RULE_1], actional: [] },
};

export const worshipRules: Record<number, Record<SunnahType, string[]>> = {
  1: {
    verbal: [
      TKeys.SUNNAHS_WORSHIP_1_VERBAL_RULE_1,
      TKeys.SUNNAHS_WORSHIP_1_VERBAL_RULE_2,
      TKeys.SUNNAHS_WORSHIP_1_VERBAL_RULE_3,
      TKeys.SUNNAHS_WORSHIP_1_VERBAL_RULE_4,
      TKeys.SUNNAHS_WORSHIP_1_VERBAL_RULE_5,
      TKeys.SUNNAHS_WORSHIP_1_VERBAL_RULE_6,
      TKeys.SUNNAHS_WORSHIP_1_VERBAL_RULE_7,
      TKeys.SUNNAHS_WORSHIP_1_VERBAL_RULE_8,
    ],
    actional: [TKeys.SUNNAHS_WORSHIP_1_ACTIONAL_RULE_1],
  },
  2: { verbal: [TKeys.SUNNAHS_WORSHIP_2_VERBAL_RULE_1], actional: [] },
  3: { verbal: [TKeys.SUNNAHS_WORSHIP_3_VERBAL_RULE_1], actional: [] },
  4: {
    verbal: [TKeys.SUNNAHS_WORSHIP_4_VERBAL_RULE_1, TKeys.SUNNAHS_WORSHIP_4_VERBAL_RULE_2],
    actional: [TKeys.SUNNAHS_WORSHIP_4_ACTIONAL_RULE_1],
  },
  5: {
    verbal: [TKeys.SUNNAHS_WORSHIP_5_VERBAL_RULE_1],
    actional: [TKeys.SUNNAHS_WORSHIP_5_ACTIONAL_RULE_1],
  },
  6: { verbal: [TKeys.SUNNAHS_WORSHIP_6_VERBAL_RULE_1], actional: [] },
  7: {
    verbal: [],
    actional: [
      TKeys.SUNNAHS_WORSHIP_7_ACTIONAL_RULE_1,
      TKeys.SUNNAHS_WORSHIP_7_ACTIONAL_RULE_2,
      TKeys.SUNNAHS_WORSHIP_7_ACTIONAL_RULE_3,
      TKeys.SUNNAHS_WORSHIP_7_ACTIONAL_RULE_4,
      TKeys.SUNNAHS_WORSHIP_7_ACTIONAL_RULE_5,
    ],
  },
  8: {
    verbal: [
      TKeys.SUNNAHS_WORSHIP_8_VERBAL_RULE_1,
      TKeys.SUNNAHS_WORSHIP_8_VERBAL_RULE_2,
      TKeys.SUNNAHS_WORSHIP_8_VERBAL_RULE_3,
      TKeys.SUNNAHS_WORSHIP_8_VERBAL_RULE_4,
      TKeys.SUNNAHS_WORSHIP_8_VERBAL_RULE_5,
      TKeys.SUNNAHS_WORSHIP_8_VERBAL_RULE_6,
    ],
    actional: [],
  },
  9: { verbal: [TKeys.SUNNAHS_WORSHIP_9_VERBAL_RULE_1], actional: [] },
  10: { verbal: [TKeys.SUNNAHS_WORSHIP_10_VERBAL_RULE_1], actional: [] },
  11: { verbal: [TKeys.SUNNAHS_WORSHIP_11_VERBAL_RULE_1], actional: [] },
  12: { verbal: [TKeys.SUNNAHS_WORSHIP_12_VERBAL_RULE_1], actional: [] },
  13: { verbal: [TKeys.SUNNAHS_WORSHIP_13_VERBAL_RULE_1], actional: [] },
  14: { verbal: [TKeys.SUNNAHS_WORSHIP_14_VERBAL_RULE_1], actional: [] },
};
export const truthsRules: Record<number, Record<SunnahType, string[]>> = {
  1: { verbal: [], actional: [TKeys.SUNNAHS_TRUTHS_1_ACTIONAL_RULE_1] },
  2: { verbal: [], actional: [TKeys.SUNNAHS_TRUTHS_2_ACTIONAL_RULE_1] },
  3: { verbal: [], actional: [TKeys.SUNNAHS_TRUTHS_3_ACTIONAL_RULE_1] },
  4: { verbal: [], actional: [TKeys.SUNNAHS_TRUTHS_4_ACTIONAL_RULE_1] },
  5: {
    verbal: [],
    actional: [
      TKeys.SUNNAHS_TRUTHS_5_ACTIONAL_RULE_1,
      TKeys.SUNNAHS_TRUTHS_5_ACTIONAL_RULE_2,
      TKeys.SUNNAHS_TRUTHS_5_ACTIONAL_RULE_3,
      TKeys.SUNNAHS_TRUTHS_5_ACTIONAL_RULE_4,
    ],
  },
  6: {
    verbal: [],
    actional: [
      TKeys.SUNNAHS_TRUTHS_6_ACTIONAL_RULE_1,
      TKeys.SUNNAHS_TRUTHS_6_ACTIONAL_RULE_2,
      TKeys.SUNNAHS_TRUTHS_6_ACTIONAL_RULE_3,
      TKeys.SUNNAHS_TRUTHS_6_ACTIONAL_RULE_4,
    ],
  },
  7: {
    verbal: [],
    actional: [
      TKeys.SUNNAHS_TRUTHS_7_ACTIONAL_RULE_1,
      TKeys.SUNNAHS_TRUTHS_7_ACTIONAL_RULE_2,
      TKeys.SUNNAHS_TRUTHS_7_ACTIONAL_RULE_3,
      TKeys.SUNNAHS_TRUTHS_7_ACTIONAL_RULE_4,
      TKeys.SUNNAHS_TRUTHS_7_ACTIONAL_RULE_5,
    ],
  },
};
