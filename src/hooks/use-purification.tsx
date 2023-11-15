import Purification from '../domains/purification/Purification';
import Soul, { SoulPart, SoulPartLevel } from '../domains/purification/Soul';
import { useStoreActions, useStoreState } from '../stores/hooks';

export interface IPurification {
  hasBodyPartsProgress: boolean;
  hasMindProgress: boolean;
  hasSoulProgress: boolean;
  createSoul(part: SoulPart, level: SoulPartLevel): void;
  findSoul(part: SoulPart, level?: SoulPartLevel): Soul | undefined;
  evaluateSoul(part: SoulPart, level: SoulPartLevel, checked: boolean): void;
}
export default function usePurification(): IPurification {
  const purification = useStoreState((state) => state.purification.item);
  const findSoul = useStoreState((actions) => actions.purification.findSoul);
  const createOrUpdate = useStoreActions((actions) => actions.purification.createOrUpdate);
  const evaluateSoul = useStoreActions((actions) => actions.purification.evaluateSoul);

  function createSoul(part: SoulPart, level: SoulPartLevel): void {
    const progress: Purification = getProgress();
    const dbSoul = progress.soul.find((item) => item.part === part);
    const newLevel = { level, progress: [{ startDate: Date.now(), day: 0, evaluated: false, errors: [] }] };

    if (dbSoul) {
      dbSoul.partProgress.push(newLevel);
    } else {
      progress.soul.push({ part, partProgress: [newLevel] });
    }
    createOrUpdate(progress);
  }

  function soulEvaluate(part: SoulPart, level: SoulPartLevel, checked: boolean) {
    evaluateSoul([part, level, checked]);
  }

  function getProgress(): Purification {
    if (!purification) {
      return { id: 0, bodyParts: [], mind: [], soul: [] };
    }
    return purification;
  }

  return {
    hasBodyPartsProgress: purification !== undefined && purification.bodyParts.length !== 0,
    hasMindProgress: purification !== undefined && purification.mind.length !== 0,
    hasSoulProgress: purification !== undefined && purification.soul.length !== 0,
    createSoul,
    findSoul,
    evaluateSoul: soulEvaluate,
  };
}
