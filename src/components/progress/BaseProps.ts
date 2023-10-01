import ProgressLine from '../../domains/common/ProgressLine';

export interface FailedAttemptsBase {
  attemptFormatter: (attempt: ProgressLine) => string;
}
