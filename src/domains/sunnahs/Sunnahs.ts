import Sunnah from './Sunnah';

export type SunnahsType = 'habits' | 'worship' | 'truths';

export default interface Sunnahs {
  habits: Sunnah[];
  worship: Sunnah[];
  truths: Sunnah[];
}
