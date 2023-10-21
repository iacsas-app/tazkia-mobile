import ProgressLine from '../common/ProgressLine';

export type SunnahType = 'verbal' | 'actional';

export default interface Sunnah {
  id: number;
  progress: ProgressLine[];
  failedAttempts: number;
}
