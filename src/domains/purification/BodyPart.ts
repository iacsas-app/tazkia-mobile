import { ImageSourcePropType } from 'react-native';
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

export type PartItem = {
  part: BodyPartType;
  line: number;
  imageSource: ImageSourcePropType;
};

export const bodyParts: PartItem[] = [
  {
    part: 'eye',
    line: 1,
    imageSource: require('./../../../assets/img/purification/body-parts/eye.jpg'),
  },
  {
    part: 'hands',
    line: 1,
    imageSource: require('./../../../assets/img/purification/body-parts/hands.jpg'),
  },
  {
    part: 'tongue',
    line: 2,
    imageSource: require('./../../../assets/img/purification/body-parts/tongue.jpg'),
  },
  {
    part: 'ear',
    line: 2,
    imageSource: require('./../../../assets/img/purification/body-parts/ear.jpg'),
  },
  {
    part: 'belly',
    line: 3,
    imageSource: require('./../../../assets/img/purification/body-parts/belly.png'),
  },
  {
    part: 'feet',
    line: 3,
    imageSource: require('./../../../assets/img/purification/body-parts/feet.jpg'),
  },
  {
    part: 'private-parts',
    line: 4,
    imageSource: require('./../../../assets/img/purification/body-parts/private-parts.png'),
  },
];
