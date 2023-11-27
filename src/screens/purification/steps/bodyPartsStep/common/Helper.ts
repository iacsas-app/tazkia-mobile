import { ImageSourcePropType } from 'react-native';
import BodyPart, { BodyPartType } from '../../../../../domains/purification/BodyPart';
import { PURIFICATION_MAX_DAYS, isCompleted } from '../../../../../services/Helpers';

export function isFullyCompleted(part: BodyPart) {
  return isCompleted(part.cleaning, PURIFICATION_MAX_DAYS) && isCompleted(part.enlightenment, PURIFICATION_MAX_DAYS);
}

export function findPartProps(type: BodyPartType | undefined): ImageSourcePropType | null {
  if (!type) {
    return null;
  }
  const result = bodyParts.find((part) => part.part === type);
  return result ? result.imageSource : null;
}

export function mapByIndex<T>(items: T[]): Map<number, T[]> {
  const result = new Map<number, T[]>();
  items.forEach((part: T, index: number) => {
    const key = index % 2;
    let entry = result.get(key + 1);
    if (!entry) {
      entry = [];
    }
    entry.push(part);
    result.set(key + 1, entry);
  });
  return result;
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
