import { useNavigation } from '@react-navigation/native';
import { ReactNode, useState } from 'react';
import EvaluationDialog from '../../components/EvaluationDialog';
import Text from '../../components/Text';
import ScrollViewLayout from '../../components/layout/ScrollViewLayout';
import Rule from '../../domains/common/Rule';
import Sunnah from '../../domains/sunnahs/Sunnah';
import { SunnahStage } from '../../domains/sunnahs/Sunnahs';
import { useApplication } from '../../hooks/use-application';
import { useMessage } from '../../hooks/use-message';
import { SunnahsParamList, SunnahsStackNavigationProp } from '../../navigation/types';
import { capitalize } from '../../services/Helpers';
import { useStoreActions, useStoreState } from '../../stores/hooks';
import SunnahPart from './SunnahPart';
import SunnahRule from './common/SunnahRule';
import SunnahStepProgress from './common/SunnahStepProgress';
import { habitsRules } from './common/data';

export default function SunnahsProgressScreen() {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const [current, setCurrent] = useState<Rule>();
  const [stage, setStage] = useState<SunnahStage>();
  const navigation = useNavigation<SunnahsStackNavigationProp>();
  const sunnahs = useStoreState((state) => state.sunnahs.item);

  const evaluate = useStoreActions((actions) => actions.sunnahs.evaluate);

  function handleAdd(route: keyof SunnahsParamList) {
    navigation.navigate(capitalize(route) as any);
  }

  function handleEvaluate(ruleId: number, checked: boolean) {
    if (stage) {
      evaluate([ruleId, stage, checked]).then(() => {
        setCurrent(undefined);
        setStage(undefined);
      });
    }
  }

  function handleDialogClose() {
    setCurrent(undefined);
  }

  function handleShowEvaluate(rule: Rule, stage: SunnahStage) {
    setCurrent(rule);
    setStage(stage);
  }

  function habitSummaryFormat(id: number): string {
    return formatMessage(`sunnahs.habits.${id}.title`);
  }

  function habitDescriptionFormat(sunnah: Sunnah): ReactNode {
    const rules = habitsRules[sunnah.id];
    const verbals = rules.verbal;
    const actionals = rules.actional;

    return <SunnahRule verbals={verbals} actionals={actionals} arabic={arabic} />;
  }

  function worshipSummaryFormat(id: number): string {
    return 'worship summary';
  }

  function worshipDescriptionFormat(): ReactNode {
    return <Text>worship description</Text>;
  }

  function truthsSummaryFormat(id: number): string {
    return 'truths summary';
  }

  function truthsDescriptionFormat(sunnah: Sunnah): ReactNode {
    return <Text>truths description</Text>;
  }

  if (!sunnahs) {
    return <></>;
  }

  const parts: SunnahPart[] = [
    {
      part: 'habits',
      items: sunnahs.habits,
      summaryFormatter: habitSummaryFormat,
      descriptionFormatter: habitDescriptionFormat,
    },
    {
      part: 'worship',
      items: sunnahs.worship,
      summaryFormatter: worshipSummaryFormat,
      descriptionFormatter: worshipDescriptionFormat,
    },
    {
      part: 'truths',
      items: sunnahs.truths,
      summaryFormatter: truthsSummaryFormat,
      descriptionFormatter: truthsDescriptionFormat,
    },
  ];

  return (
    <ScrollViewLayout>
      {parts.map((part, index: number) => (
        <SunnahStepProgress
          key={index}
          index={index + 1}
          stage={part.part}
          items={part.items}
          summaryFormatter={part.summaryFormatter}
          descriptionFormatter={part.descriptionFormatter}
          onAdd={handleAdd}
          onShowEvaluate={handleShowEvaluate}
        />
      ))}
      {current && <EvaluationDialog rule={current} onEvaluate={handleEvaluate} onClose={handleDialogClose} />}
    </ScrollViewLayout>
  );
}
