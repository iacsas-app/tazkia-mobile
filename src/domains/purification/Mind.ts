import ProgressLine from '../common/ProgressLine';

export type MindLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export const mindLevels: MindLevel[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default interface Mind {
  level: MindLevel;
  progress: ProgressLine[];
}
