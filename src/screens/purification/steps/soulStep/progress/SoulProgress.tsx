import { Chip, HStack, Stack, Text } from '@react-native-material/core';
import { useMemo } from 'react';
import ProgressContainer from '../../../../../components/progress/ProgressContainer';
import Soul from '../../../../../domains/purification/Soul';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { PurificationParamList } from '../../../../../navigation/types';
import { mapByIndex } from '../../bodyPartsStep/common/Helper';

interface SoulProgressProps {
  items: Soul[];
  onAdd: (route: keyof PurificationParamList) => void;
}

export default function SoulProgress({ items, onAdd }: SoulProgressProps) {
  const { formatMessage } = useMessage();
  const map = useMemo(() => mapByIndex(items), []);

  function handleAddAction() {
    onAdd('Soul');
  }

  return (
    <ProgressContainer
      title={formatMessage(TKeys.PURIFICATION_SOUL_TITLE)}
      subtitle={formatMessage(TKeys.PHASE_3)}
      variant="blue"
      onAdd={handleAddAction}
    >
      <HStack spacing={15}>
        {Array.from(map.values()).map((values: Soul[], key: number) => (
          <Stack key={`key_${key}`} spacing={5}>
            {values.map((item: Soul, index) => (
              <Chip key={`entry_${index}`} variant="outlined" label={<Text>{item.part}</Text>} />
            ))}
          </Stack>
        ))}
      </HStack>
    </ProgressContainer>
  );
}
