import ProgressLine from '../../../../../domains/common/ProgressLine';
import { BodyPartType } from '../../../../../domains/purification/BodyPart';
import Purification from '../../../../../domains/purification/Purification';
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
  const result = purification?.bodyParts.find((item) => item.name === part && item[mode].length !== 0);
  return result ? result[mode] : undefined;
}

export const rules: Record<BodyPartType, Record<PurificationType, string[]>> = {
  eye: {
    purification: [
      'Aliquid tempora, possimus totam maxime Aliquid tempora',
      'Cumque repellat optio aliquid tempora',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      'Dolor sit amet consectetur adipisicing elit',
    ],
    illumination: ['test illumination'],
  },
  hands: {
    purification: [],
    illumination: [],
  },
  tongue: {
    purification: [],
    illumination: [],
  },
  ear: {
    purification: ['test purification'],
    illumination: ['test illumination'],
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
