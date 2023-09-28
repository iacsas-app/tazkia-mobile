import ProgressLine from '../common/ProgressLine';

export type BodyPartType = 'eye' | 'hands' | 'tongue' | 'ear' | 'belly' | 'feet' | 'private-parts';

export default interface BodyPart {
  name: BodyPartType;
  purification: ProgressLine[];
  illumination: ProgressLine[];
}
