import Mind, { MindLevel } from '../domains/purification/Mind';
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
  restartSoul(part: SoulPart, level: SoulPartLevel): void;
  createMind(level: MindLevel): void;
  findMind(level: MindLevel): Mind | undefined;
  evaluateMind(level: MindLevel, checked: boolean): void;
  restartMind(level: MindLevel): void;
}
export default function usePurification(): IPurification {
  const purification = useStoreState((state) => state.purification.item);
  const createOrUpdate = useStoreActions((actions) => actions.purification.createOrUpdate);
  const evaluateSoul = useStoreActions((actions) => actions.purification.evaluateSoul);
  const restartSoul = useStoreActions((actions) => actions.purification.restartSoul);
  const evaluateMind = useStoreActions((actions) => actions.purification.evaluateMind);
  const restartMind = useStoreActions((actions) => actions.purification.restartMind);

  const findSoul = useStoreState((actions) => actions.purification.findSoul);
  const findMind = useStoreState((state) => state.purification.findByMind);

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

  function createMind(level: MindLevel): void {
    const progress: Purification = getProgress();
    const dbMind = progress.mind.find((item) => item.level === level);
    const next = { startDate: Date.now(), day: 0, evaluated: false, errors: [] };

    if (dbMind) {
      dbMind.progress.push(next);
    } else {
      progress.mind.push({ level, progress: [next] });
    }
    createOrUpdate(progress);
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
    evaluateSoul: (part, level, checked) => evaluateSoul([part, level, checked]),
    restartSoul: (part, level) => restartSoul([part, level]),
    createMind,
    findMind,
    evaluateMind: (level, checked) => evaluateMind([level, checked]),
    restartMind,
  };
}
