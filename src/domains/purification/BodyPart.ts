import ProgressLine from '../common/ProgressLine';

export type BodyPartType = 'eye' | 'hands' | 'tongue' | 'ear' | 'belly' | 'feet' | 'private-parts';
export enum BodyPartsOrder {
  'eye' = 1,
  'hands' = 2,
  'tongue' = 3,
  'ear' = 4,
  'belly' = 5,
  'feet' = 6,
  'private-parts' = 7,
}

export type PurificationStage = 'cleaning' | 'enlightenment';

export default interface BodyPart {
  name: BodyPartType;
  cleaning?: ProgressLine[];
  enlightenment?: ProgressLine[];
}
