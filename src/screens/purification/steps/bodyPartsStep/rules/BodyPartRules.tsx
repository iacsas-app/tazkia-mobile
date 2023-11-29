import { BodyPartType, PurificationStage } from '../../../../../domains/purification/BodyPart';

import { useMemo } from 'react';
import { ScrollView } from 'react-native';
import SimpleRule from '../../../../../components/rules/SimpleRule';
import VStack from '../../../../../components/stack/VStack';
import { useMessage } from '../../../../../hooks/use-message';
import { rules } from '../common/data';

interface BodyPartsRulesProps {
  part: BodyPartType;
  step: PurificationStage;
}
export default function BodyPartsRules({ part, step }: BodyPartsRulesProps) {
  const { formatMessage } = useMessage();
  const items: string[] = useMemo(() => rules[part][step], []);

  return (
    <ScrollView>
      <VStack spacing={5} style={{ paddingVertical: 10 }}>
        {items.map((rule: string, index: number) => (
          <SimpleRule key={index} id={index + 1} item={formatMessage(rule)} />
        ))}
      </VStack>
    </ScrollView>
  );
}
