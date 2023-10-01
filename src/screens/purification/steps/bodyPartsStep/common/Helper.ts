import { ImageSourcePropType } from 'react-native';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import BodyPart, { BodyPartType, BodyPartsOrder } from '../../../../../domains/purification/BodyPart';
import Purification from '../../../../../domains/purification/Purification';
import { TKeys } from '../../../../../locales/constants';
import { PurificationType } from '../BodyPartsScreen';

export function hasBodyPartProgress(
  purification: Purification | undefined,
  part: BodyPartType,
  mode: PurificationType,
): boolean {
  return findBodyPartProgress(purification, part, mode) !== undefined;
}

export function findBodyPartProgress(
  purification: Purification | undefined,
  part: BodyPartType,
  mode: PurificationType,
): ProgressLine[] | undefined {
  const result = purification?.bodyParts.find((item) => item.name === part && item[mode]?.length !== 0);
  return result ? result[mode] : undefined;
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

export function orderBodyParts(items: BodyPart[]) {
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
    nameKey: TKeys.PURIFICATION_BODY_PARTS_EYES,
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

export const rules: Record<BodyPartType, Record<PurificationType, string[]>> = {
  eye: {
    purification: [
      'Aliquid tempora, possimus totam maxime Aliquid tempora',
      'Cumque repellat optio aliquid tempora',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      'Dolor sit amet consectetur adipisicing elit',
    ],
    illumination: ['test illumination', '2'],
  },
  hands: {
    purification: ['2'],
    illumination: [],
  },
  tongue: {
    purification: [],
    illumination: [],
  },
  ear: {
    purification: ['test purification'],
    illumination: ['test illumination', '2', '3', '4', '5', '2', '2', '2', '2', '2', '2', '2'],
  },
  belly: {
    purification: [],
    illumination: [],
  },
  feet: {
    purification: [],
    illumination: [],
  },
  'private-parts': {
    purification: [],
    illumination: [],
  },
};
