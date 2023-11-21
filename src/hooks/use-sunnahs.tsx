import _ from 'lodash';
import { useMemo } from 'react';
import Sunnah from '../domains/sunnahs/Sunnah';
import { SunnahStage } from '../domains/sunnahs/Sunnahs';
import { habitsRules, truthsRules, worshipRules } from '../screens/purification/common/sunnahs/data';
import { SUNNAHS_MAX_DAYS, progressPercentage2 } from '../services/Helpers';
import { useStoreActions, useStoreState } from '../stores/hooks';

type StageItem = {
  stage: SunnahStage;
  rulesSize: number;
};

export type ISunnahs = {
  hasHabitsProgress: boolean;
  hasWorshipProgress: boolean;
  hasTruthsProgress: boolean;
  create(stage: SunnahStage, id: number): void;
  find(stage: SunnahStage, id: number): Sunnah | undefined;
  evaluate(stage: SunnahStage, id: number, checked: boolean): void;
  restart(stage: SunnahStage, id: number): void;
  globalPercentage(): number;
};
export default function useSunnahs(): ISunnahs {
  const sunnahs = useStoreState((state) => state.sunnahs.item);
  const createOrUpdate = useStoreActions((actions) => actions.sunnahs.createOrUpdate);
  const evaluate = useStoreActions((actions) => actions.sunnahs.evaluate);
  const restart = useStoreActions((actions) => actions.sunnahs.restart);
  const find = useStoreState((actions) => actions.sunnahs.findByIdForStage);

  const stages: Record<SunnahStage, number> = useMemo(
    () => ({
      habits: Object.keys(habitsRules).length,
      worship: Object.keys(worshipRules).length,
      truths: Object.keys(truthsRules).length,
    }),
    [],
  );

  function create(stage: SunnahStage, id: number): void {
    const sunnah: Sunnah = { id, progress: [{ startDate: Date.now(), day: 0, evaluated: false, errors: [] }] };
    createOrUpdate([stage, sunnah]);
  }

  function globalPercentage(): number {
    if (!sunnahs) {
      return 0;
    }
    return ['habits', 'worship', 'truths']
      .map((stage) => {
        const list: Sunnah[] = _.get(sunnahs, stage);
        const sum = list
          .map((i) => progressPercentage2(i.progress, SUNNAHS_MAX_DAYS))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum / _.get(stages, stage);
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  return {
    hasHabitsProgress: sunnahs !== undefined && sunnahs.habits.length !== 0,
    hasWorshipProgress: sunnahs !== undefined && sunnahs.worship.length !== 0,
    hasTruthsProgress: sunnahs !== undefined && sunnahs.truths.length !== 0,
    create,
    find,
    evaluate: (stage, id, checked) => evaluate([id, stage, checked]),
    restart: (stage, id) => restart([stage, id]),
    globalPercentage,
  };
}
