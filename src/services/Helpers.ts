import * as ExpoUpdates from 'expo-updates';
import { I18nManager, NativeModules, Platform } from 'react-native';
import ProgressLine from '../domains/common/ProgressLine';
import { SupportedLocale } from '../locales/types';

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

/**
 *
 * @param day Retreive progress
 * @param maxDays
 * @returns
 */
export function progressPercentage(day: number, maxDays: number): number {
  const result = percentage(day, maxDays);
  return parseFloat(result.toPrecision(day === 0 ? 1 : 2));
}

export function percentageCallback(accumulator: number, currentValue: ProgressLine[]) {
  const percent = progressPercentage2(currentValue, PURIFICATION_MAX_DAYS);
  return accumulator + percent;
}

export function progressPercentage2(lines: ProgressLine[] | undefined, maxDays: number): number {
  if (!lines || lines.length === 0) {
    return 0;
  }
  const lastDay = lines[lines.length - 1];
  if (lastDay.failedAttempts) {
    return 0;
  }
  const day = lastDay.day;
  const result = percentage(day, maxDays);
  return parseFloat(result.toPrecision(day === 0 ? 1 : 2));
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

export function deviceLanguage(): string {
  const systemLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  return systemLanguage.split('_')[0];
}

export async function reloadIfNecessary(lang: SupportedLocale) {
  const isArabic = lang === 'ar';
  I18nManager.allowRTL(isArabic);
  I18nManager.forceRTL(isArabic);
  I18nManager.swapLeftAndRightInRTL(true);

  if ((isArabic && !I18nManager.isRTL) || (!isArabic && I18nManager.isRTL)) {
    await ExpoUpdates.reloadAsync();
  }
}
