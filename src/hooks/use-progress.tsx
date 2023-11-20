import ProgressLine from '../domains/common/ProgressLine';
import { isCompleted } from '../services/Helpers';

export type ProgressProps = {
  countProgress: number;
  countDays: number;
  endDate: number | undefined;
  failed: number;
  completed: boolean;
  lastDay: ProgressLine | undefined;
};
export default function useProgress(progress: ProgressLine[] | undefined, maxDays: number): ProgressProps {
  const countDays = progress
    ? progress.map((p) => p.day).reduce((total, currentValue) => (total += currentValue), 0)
    : 0;
  const countProgress = progress ? progress.length - 1 : 0;
  const lastDay = progress ? progress[countProgress] : undefined;

  const endDate = lastDay
    ? lastDay.day >= maxDays && lastDay.evaluated === true && lastDay.errors.length === 0
      ? lastDay.startDate + lastDay.day
      : undefined
    : undefined;
  const failed = lastDay ? (lastDay.failedAttempts ? lastDay.failedAttempts : 0) : 0;
  const completed = isCompleted(progress, maxDays);

  return {
    countDays,
    countProgress,
    endDate,
    failed,
    completed,
    lastDay,
  };
}
