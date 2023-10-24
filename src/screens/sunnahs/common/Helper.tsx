import { Part } from '../../../components/PressableStep';
import { TKeys } from '../../../locales/constants';

export const sunnahsStages: Part[] = [
  {
    route: 'Habits',
    name: TKeys.PHASE_1,
    description: TKeys.SUNNAHS_HABITS_TITLE,
    imageSource: require('./../../../../assets/img/sunnahs/step1.jpg'),
  },
  {
    route: 'Worship',
    name: TKeys.PHASE_2,
    description: TKeys.SUNNAHS_WORSHIP_TITLE,
    imageSource: require('./../../../../assets/img/sunnahs/step2.jpg'),
  },
  {
    route: 'Truths',
    name: TKeys.PHASE_3,
    description: TKeys.SUNNAHS_TRUTHS_TITLE,
    imageSource: require('./../../../../assets/img/sunnahs/step3.jpg'),
  },
];
