import { NativeModules, Platform } from 'react-native';
import ProgressLine from '../domains/common/ProgressLine';
import BodyPart from '../domains/purification/BodyPart';
import { PurificationStage } from '../screens/purification/steps/bodyPartsStep/BodyPartsScreen';

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
  return str[0].toUpperCase() + str.slice(1);
}

/**
 *
 * @param day Retreive progress
 * @param maxDays
 * @returns
 */
export function progressPercentage(day: number, maxDays: number): string {
  const precision = day < 3 ? 1 : 2;
  return `${((day * 100) / maxDays).toPrecision(precision)}%`;
}

export function isCompleted(progress: ProgressLine[] | undefined, maxDays: number) {
  if (!progress) {
    return false;
  }
  const last = progress.at(progress.length - 1);
  return last ? last.day === maxDays && last.errors.length === 0 && last.evaluated === true : false;
}

export function isBodyPartStepInProgress(part: BodyPart | undefined, step: PurificationStage) {
  return part ? part[step] : undefined;
}

export function deviceLanguage() {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;
}
