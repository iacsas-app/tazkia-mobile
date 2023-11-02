import { Box, VStack } from '@react-native-material/core';
import { useMemo } from 'react';

import ProgressContainer from '../../../../../components/progress/ProgressContainer';
import BodyPart from '../../../../../domains/purification/BodyPart';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { PurificationParamList } from '../../../../../navigation/types';
import BodyPartProgressItem from './BodyPartProgressItem';

interface BodyPartsProgressProps {
  items: BodyPart[];
  onAdd: (route: keyof PurificationParamList) => void;
}
export default function BodyPartsProgress({ items, onAdd }: BodyPartsProgressProps) {
  const { formatMessage } = useMessage();

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
      variant="blue"
      disableAdd={allInProgress}
      onAdd={handleAddAction}
    >
      <VStack spacing={5}>
        {items.map((item, index) => (
          <Box key={index}>
            <BodyPartProgressItem key={`entry_${index}`} value={item} />
          </Box>
        ))}
      </VStack>
    </ProgressContainer>
  );
}
