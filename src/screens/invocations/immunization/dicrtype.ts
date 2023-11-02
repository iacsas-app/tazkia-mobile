//import ProgressLine from '../locales/dikrtype';

import { DikrType } from './common/dikr';

export const immunizationData: Record<DikrType, Record<string, number>> = {
  morning: {
    'immunization.common.1': 2,
    'immunization.morning.1': 1,
    'immunization.morning.2': 10,
  },
  evening: {
    'immunization.common.1': 2,
    'immunization.evening.1': 1,
    'immunization.evening.2': 10,
  },
};
