import { TKeys } from '../../locales/constants';
import ProgressLine from '../common/ProgressLine';

export type SoulPart = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type SoulPartLevel = 1 | 2 | 3 | 4;

export interface SoulPartProgress {
  level: SoulPartLevel;
  progress: ProgressLine[];
}

export default interface Soul {
  part: SoulPart;
  partProgress: SoulPartProgress[];
}

export const soulRules: Record<SoulPart, TKeys[]> = {
  1: [TKeys.PURIFICATION_SOUL_1_LEVEL_1, TKeys.PURIFICATION_SOUL_1_LEVEL_2, TKeys.PURIFICATION_SOUL_1_LEVEL_3],
  2: [
    TKeys.PURIFICATION_SOUL_2_LEVEL_1,
    TKeys.PURIFICATION_SOUL_2_LEVEL_2,
    TKeys.PURIFICATION_SOUL_2_LEVEL_3,
    TKeys.PURIFICATION_SOUL_2_LEVEL_4,
  ],
  3: [
    TKeys.PURIFICATION_SOUL_3_LEVEL_1,
    TKeys.PURIFICATION_SOUL_3_LEVEL_2,
    TKeys.PURIFICATION_SOUL_3_LEVEL_3,
    TKeys.PURIFICATION_SOUL_3_LEVEL_4,
  ],
  4: [
    TKeys.PURIFICATION_SOUL_4_LEVEL_1,
    TKeys.PURIFICATION_SOUL_4_LEVEL_2,
    TKeys.PURIFICATION_SOUL_4_LEVEL_3,
    TKeys.PURIFICATION_SOUL_4_LEVEL_4,
  ],
  5: [TKeys.PURIFICATION_SOUL_5_LEVEL_1, TKeys.PURIFICATION_SOUL_5_LEVEL_2, TKeys.PURIFICATION_SOUL_5_LEVEL_3],
  6: [TKeys.PURIFICATION_SOUL_6_LEVEL_1, TKeys.PURIFICATION_SOUL_6_LEVEL_2, TKeys.PURIFICATION_SOUL_6_LEVEL_3],
  7: [TKeys.PURIFICATION_SOUL_6_LEVEL_1, TKeys.PURIFICATION_SOUL_6_LEVEL_2, TKeys.PURIFICATION_SOUL_6_LEVEL_3],
};

export const hasSubTitle: SoulPart[] = [5, 6];
