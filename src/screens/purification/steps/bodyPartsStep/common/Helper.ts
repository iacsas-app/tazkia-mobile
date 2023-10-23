import { ImageSourcePropType } from 'react-native';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import BodyPart, { BodyPartType, BodyPartsOrder } from '../../../../../domains/purification/BodyPart';
import Purification from '../../../../../domains/purification/Purification';
import { TKeys } from '../../../../../locales/constants';
import { PURIFICATION_MAX_DAYS, isCompleted } from '../../../../../services/Helpers';
import { PurificationStep } from '../BodyPartsScreen';

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

export function buildBodyParts(part: BodyPartType, mode: PurificationStep, purification: Purification | undefined) {
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

export const rules: Record<BodyPartType, Record<PurificationStep, string[]>> = {
  eye: {
    cleaning: [
      TKeys.PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_1,
      TKeys.PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_2,
      TKeys.PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_3,
      TKeys.PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_4,
      TKeys.PURIFICATION_BODY_PARTS_EYE_CLEANING_RULE_5,
    ],
    enlightenment: [
      TKeys.PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_1,
      TKeys.PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_2,
      TKeys.PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_3,
      TKeys.PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_4,
      TKeys.PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_5,
      TKeys.PURIFICATION_BODY_PARTS_EYE_ENLIGHTENMENT_RULE_6,
    ],
  },
  hands: {
    cleaning: [
      TKeys.PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_1,
      TKeys.PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_2,
      TKeys.PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_3,
      TKeys.PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_4,
      TKeys.PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_5,
      TKeys.PURIFICATION_BODY_PARTS_HANDS_CLEANING_RULE_6,
    ],
    enlightenment: [],
  },
  tongue: {
    cleaning: [
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_1,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_2,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_3,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_4,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_5,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_6,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_7,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_8,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_9,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_10,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_11,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_12,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_13,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_14,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_15,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_16,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_17,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_18,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_19,
      TKeys.PURIFICATION_BODY_PARTS_TONGUE_CLEANING_RULE_20,
    ],
    enlightenment: [],
  },
  ear: {
    cleaning: [],
    enlightenment: [],
  },
  belly: {
    cleaning: [],
    enlightenment: [],
  },
  feet: {
    cleaning: [],
    enlightenment: [],
  },
  'private-parts': {
    cleaning: [],
    enlightenment: [],
  },
};
