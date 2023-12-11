import { ImageSourcePropType } from 'react-native';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import BodyPart, { BodyPartType, PurificationStage } from '../../../../../domains/purification/BodyPart';
import { PURIFICATION_MAX_DAYS, isCompleted } from '../../../../../services/Helpers';

export function isFullyCompleted(part: BodyPart) {
  return isCompleted(part.cleaning, PURIFICATION_MAX_DAYS) && isCompleted(part.enlightenment, PURIFICATION_MAX_DAYS);
}

export function findPartImageSource(type: BodyPartType | undefined): ImageSourcePropType | null {
  if (!type) {
    return null;
  }
  const result = bodyParts.find((part) => part.part === type);
  return result ? result.imageSource : null;
}

export function findStage(value: BodyPart | undefined, stage: PurificationStage): ProgressLine[] | undefined {
  if (!value) {
    return undefined;
  }
  return value[stage];
}

export type PartItem = {
  part: BodyPartType;
  line: number;
  imageSource: ImageSourcePropType;
};

export const bodyParts: PartItem[] = [
  {
    part: 'eye',
    line: 1,
    imageSource: require('./../../../../../../assets/img/purification/body-parts/eye.jpg'),
  },
  {
    part: 'hands',
    line: 1,
    imageSource: require('./../../../../../../assets/img/purification/body-parts/hands.jpg'),
  },
  {
    part: 'tongue',
    line: 2,
    imageSource: require('./../../../../../../assets/img/purification/body-parts/tongue.jpg'),
  },
  {
    part: 'ear',
    line: 2,
    imageSource: require('./../../../../../../assets/img/purification/body-parts/ear.jpg'),
  },
  {
    part: 'belly',
    line: 3,
    imageSource: require('./../../../../../../assets/img/purification/body-parts/belly.png'),
  },
  {
    part: 'feet',
    line: 3,
    imageSource: require('./../../../../../../assets/img/purification/body-parts/feet.jpg'),
  },
  {
    part: 'private-parts',
    line: 4,
    imageSource: require('./../../../../../../assets/img/purification/body-parts/private-parts.png'),
  },
];
