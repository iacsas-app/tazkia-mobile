import ProgressLine from '../domains/common/ProgressLine';
import BodyPart from '../domains/purification/BodyPart';
import { PurificationStep } from '../screens/purification/steps/bodyPartsStep/BodyPartsScreen';

export const PURIFICATION_MAX_DAYS = 30;
export const SUNNAHS_MAX_DAYS = 15;

export const groupBy = (items: any, key: any) =>
  items.reduce(
    (result: { [x: string]: any }, item: { [x: string]: string | number }) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {},
  );

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function progressPercentage(day: number, maxDays: number): string {
  const precision = day < 3 ? 1 : 2;
  return `${((day * 100) / maxDays).toPrecision(precision)}%`;
}

export function isCompleted(progress: ProgressLine[] | undefined, maxDays: number) {
  if (!progress) {
    return false;
  }
  const last = progress.at(progress.length - 1);
  return last && last.day === maxDays && last.errors.length === 0;
}

export function isBodyPartStepInProgress(part: BodyPart | undefined, step: PurificationStep) {
  return part ? part[step] : undefined;
}
