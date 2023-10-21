import { ReactNode } from 'react';
import Sunnah from '../../domains/sunnahs/Sunnah';
import { SunnahStage } from '../../domains/sunnahs/Sunnahs';

export default interface SunnahPart {
  part: SunnahStage;
  items: Sunnah[];
  summaryFormatter: (id: number) => string;
  descriptionFormatter: (sunnah: Sunnah) => ReactNode;
}
