import { HStack, Stack } from '@react-native-material/core';
import { useMemo } from 'react';

import ProgressContainer from '../../../../../components/progress/ProgressContainer';
import BodyPart from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { PurificationParamList } from '../../../../../navigation/types';
import { mapByIndex } from '../common/Helper';
import BodyPartProgressItem from './BodyPartProgressItem';

interface BodyPartsProgressProps {
  items: BodyPart[];
  onAdd: (route: keyof PurificationParamList) => void;
}
export default function BodyPartsProgress({ items, onAdd }: BodyPartsProgressProps) {
  const { formatMessage } = useMessage();
  const map = mapByIndex(items);

  const allInProgress = useMemo(
    () => items.length === 7 && items.every((item: BodyPart) => item.cleaning && item.enlightenment),
    [items],
  );

  function handleAddAction() {
    onAdd('BodyParts');
  }

  return (
    <ProgressContainer
      title={formatMessage(TKeys.PURIFICATION_BODYPART_TITLE)}
      subtitle={formatMessage(TKeys.PHASE_1)}
      variant="green"
      disabled={allInProgress}
      collapse={map.size === 0}
      onAdd={handleAddAction}
    >
      <HStack spacing={11}>
        {Array.from(map.values()).map((values: BodyPart[], key: number) => (
          <Stack key={`key_${key}`}>
            {values.map((item: BodyPart, index) => (
              <BodyPartProgressItem key={`entry_${index}`} value={item} />
            ))}
          </Stack>
        ))}
      </HStack>
    </ProgressContainer>
  );
}
