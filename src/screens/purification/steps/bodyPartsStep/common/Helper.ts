import { ImageSourcePropType } from 'react-native';
import ProgressLine from '../../../../../domains/common/ProgressLine';
import BodyPart, { BodyPartType, PurificationStage, bodyParts } from '../../../../../domains/purification/BodyPart';
import { PURIFICATION_MAX_DAYS, isCompleted } from '../../../../../services/Helpers';

export function isFullyCompleted(part: BodyPart) {
  return isCompleted(part.cleaning, PURIFICATION_MAX_DAYS) && isCompleted(part.enlightenment, PURIFICATION_MAX_DAYS);
}

export function findPartImageSource(type: BodyPartType | undefined): ImageSourcePropType | null {
  if (!type) {
    return null;
  }
  const result = bodyParts.find((part) => part.part === type);
  return result ? result.imageSource : null;
}

export function findStage(value: BodyPart | undefined, stage: PurificationStage): ProgressLine[] | undefined {
  if (!value) {
    return undefined;
  }
  return value[stage];
}
