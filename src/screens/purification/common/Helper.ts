import { Part } from '../../../components/PressableStep';
import { TKeys } from '../../../locales/constants';

export const purificationStages: Part[] = [
  {
    route: 'BodyParts',
    name: TKeys.PHASE_1,
    description: TKeys.PURIFICATION_BODYPART_TITLE,
    imageSource: require('./../../../../assets/img/purification/step1.png'),
  },
  {
    route: 'Mind',
    name: TKeys.PHASE_2,
    description: TKeys.PURIFICATION_MIND_TITLE,
    imageSource: require('./../../../../assets/img/purification/step2.jpg'),
  },
  {
    route: 'Soul',
    name: TKeys.PHASE_3,
    description: TKeys.PURIFICATION_SOUL_TITLE,
    imageSource: require('./../../../../assets/img/purification/step3.jpg'),
  },
];
