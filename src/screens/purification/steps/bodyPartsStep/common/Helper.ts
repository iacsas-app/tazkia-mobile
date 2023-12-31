import { ImageSourcePropType } from 'react-native';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import BodyPart, { BodyPartType, BodyPartsOrder } from '../../../../../domains/purification/BodyPart';
import Purification from '../../../../../domains/purification/Purification';
import { TKeys } from '../../../../../locales/constants';
import { PURIFICATION_MAX_DAYS, isCompleted } from '../../../../../services/Helpers';
import { PurificationStage } from '../BodyPartsScreen';

export function isFullyCompleted(part: BodyPart) {
  return isCompleted(part.cleaning, PURIFICATION_MAX_DAYS) && isCompleted(part.enlightenment, PURIFICATION_MAX_DAYS);
}

export function findPartProps(type: BodyPartType): ImageSourcePropType | null {
  const result = bodyParts.find((part) => part.type === type);
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

export function buildBodyParts(part: BodyPartType, mode: PurificationStage, purification: Purification | undefined) {
  const newLine: ProgressLine = { startDate: Date.now(), day: 0, errors: [], evaluated: false };
  const newPart: BodyPart = { name: part, [mode]: [newLine] };

  if (!purification) {
    purification = { id: 0, bodyParts: [newPart], mind: [], soul: [] };
  } else {
    if (!purification.bodyParts.find((item) => item.name === part)) {
      purification.bodyParts.push(newPart);
    } else {
      purification.bodyParts = purification.bodyParts.map((item) =>
        item.name === part ? { ...item, [mode]: [newLine] } : item,
      );
    }
    purification.bodyParts = orderBodyParts(purification.bodyParts);
  }
  return purification;
}

function orderBodyParts(items: BodyPart[]) {
  return items.sort((a: BodyPart, b: BodyPart) => {
    if (BodyPartsOrder[a.name] < BodyPartsOrder[b.name]) {
      return -1;
    } else if (BodyPartsOrder[a.name] > BodyPartsOrder[b.name]) {
      return 1;
    }
    return 0;
  });
}

export type PartItem = {
  type: BodyPartType;
  line: number;
  nameKey: string;
  imageSource: ImageSourcePropType;
};

export const bodyParts: PartItem[] = [
  {
    type: 'eye',
    line: 1,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_EYE,
    imageSource: require('./../../../../../../assets/img/purification/body-parts/eye.jpg'),
  },
  {
    type: 'hands',
    line: 1,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_HANDS,
    imageSource: require('./../../../../../../assets/img/purification/body-parts/hands.jpg'),
  },
  {
    type: 'tongue',
    line: 2,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_TONGUE,
    imageSource: require('./../../../../../../assets/img/purification/body-parts/tongue.jpg'),
  },
  {
    type: 'ear',
    line: 2,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_EAR,
    imageSource: require('./../../../../../../assets/img/purification/body-parts/ear.jpg'),
  },
  {
    type: 'belly',
    line: 3,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_BELLY,
    imageSource: require('./../../../../../../assets/img/purification/body-parts/belly.png'),
  },
  {
    type: 'feet',
    line: 3,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_FEET,
    imageSource: require('./../../../../../../assets/img/purification/body-parts/feet.jpg'),
  },
  {
    type: 'private-parts',
    line: 4,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_PRIVATE_PARTS,
    imageSource: require('./../../../../../../assets/img/purification/body-parts/private-parts.png'),
  },
];
