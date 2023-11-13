import Purification from '../domains/purification/Purification';
import Soul, { SoulPart, SoulPartLevel } from '../domains/purification/Soul';
import { useStoreActions, useStoreState } from '../stores/hooks';

export interface IPurification {
  createSoul(part: SoulPart, level: SoulPartLevel): void;
  findSoul(part: SoulPart, level?: SoulPartLevel): Soul | undefined;
}
export default function usePurification(): IPurification {
  const purification = useStoreState((state) => state.purification.item);
  const findSoul = useStoreState((actions) => actions.purification.findSoul);
  const createOrUpdate = useStoreActions((actions) => actions.purification.createOrUpdate);

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

  function getProgress(): Purification {
    if (!purification) {
      return { id: 0, bodyParts: [], mind: [], soul: [] };
    }
    return purification;
  }

  return {
    createSoul,
    findSoul,
  };
}
