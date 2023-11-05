import * as ExpoUpdates from 'expo-updates';
import { I18nManager, NativeModules, Platform } from 'react-native';
import ProgressLine from '../domains/common/ProgressLine';
import BodyPart from '../domains/purification/BodyPart';
import { SupportedLocale } from '../locales/types';
import { PurificationStage } from '../screens/purification/steps/bodyPartsStep/BodyPartsScreen';

export const FIRST_VISIT_DATE = 'firstVisitDate';
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
  const result = percentage(day, maxDays);
  return `${result.toPrecision(day === 0 ? 1 : 2)}%`;
}

export function percentage(day: number, maxDays: number): number {
  return (day * 100) / maxDays;
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

export function deviceLanguage(): string {
  const systemLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  return systemLanguage.split('_')[0];
}

export function reloadIfNecessary(lang: SupportedLocale) {
  const isArabic = lang === 'ar';
  I18nManager.allowRTL(isArabic);
  I18nManager.forceRTL(isArabic);
  I18nManager.swapLeftAndRightInRTL(true);

  if ((isArabic && !I18nManager.isRTL) || (!isArabic && I18nManager.isRTL)) {
    ExpoUpdates.reloadAsync();
    //RNRestart.restart()
  }
}
