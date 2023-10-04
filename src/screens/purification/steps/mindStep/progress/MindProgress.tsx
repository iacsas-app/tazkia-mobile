import { Chip, HStack, Stack, Text } from '@react-native-material/core';
import { useMemo } from 'react';
import ProgressContainer from '../../../../../components/progress/ProgressContainer';
import Mind from '../../../../../domains/purification/Mind';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { PurificationParamList } from '../../../../../navigation/types';
import { mapByIndex } from '../../bodyPartsStep/common/Helper';

interface MindProgressProps {
  items: Mind[];
  onAdd: (route: keyof PurificationParamList) => void;
}

export default function MindProgress({ items, onAdd }: MindProgressProps) {
  const { arabicOrientation } = useApplication();
  const { formatMessage } = useMessage();
  const map = useMemo(() => mapByIndex(items), []);

  function handleAddAction() {
    onAdd('Mind');
  }

  return (
    <ProgressContainer
      title={formatMessage(TKeys.PURIFICATION_MIND_TITLE)}
      subtitle={formatMessage(TKeys.PHASE_2)}
      variant="green"
      onAdd={handleAddAction}
    >
      <HStack spacing={15} reverse={arabicOrientation}>
        {Array.from(map.values()).map((values: Mind[], key: number) => (
          <Stack key={`key_${key}`} spacing={5}>
            {values.map((item: Mind, index) => (
              <Chip key={`entry_${index}`} variant="outlined" label={<Text>{item.level}</Text>} />
            ))}
          </Stack>
        ))}
      </HStack>
    </ProgressContainer>
  );
}
