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
