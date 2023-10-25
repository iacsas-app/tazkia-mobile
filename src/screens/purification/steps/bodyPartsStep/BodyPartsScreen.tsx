import { Box, HStack, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import ScrollViewLayout from '../../../../components/layout/ScrollViewLayout';
import { BodyPartType, BodyPartsOrder } from '../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../hooks/use-application';
import { useMessage } from '../../../../hooks/use-message';
import { TKeys } from '../../../../locales/constants';
import { BodyPartsRulesNavigationProp } from '../../../../navigation/types';
import { groupBy } from '../../../../services/Helpers';
import GlobalStyles from '../../../../styles/GlobalStyles';
import PurificationPrezLayout from '../../common/PurificationPrezLayout';
import BodyPartItem from './BodyPartItem';
import { PartItem, bodyParts } from './common/Helper';

export type PurificationStage = 'cleaning' | 'enlightenment';

export default function BodyPartsScreen() {
  const { arabic } = useApplication();
  const { formatMessage } = useMessage();
  const navigation = useNavigation<BodyPartsRulesNavigationProp>();
  const partsByLine = useMemo(() => groupBy(bodyParts, 'line'), []);

  function handleOpenRules(part: BodyPartType, step: PurificationStage) {
    navigation.navigate('BodyPartsRules', { part, step });
  }

  return (
    <ScrollViewLayout>
      <PurificationPrezLayout
        summary={TKeys.PURIFICATION_BODYPART_SUMMARY}
        body={TKeys.PURIFICATION_BODYPART_INTRODUCTION}
      />
      <VStack spacing={15} style={{ ...GlobalStyles.center }}>
        {Object.keys(partsByLine).map((key: string) => (
          <HStack key={key} spacing={10}>
            {partsByLine[key].map(({ line, ...props }: PartItem, index: number) => (
              <Box key={`${key}_${index}_${line}`}>
                <BodyPartItem id={BodyPartsOrder[props.type]} {...props} onOpenRules={handleOpenRules} />
              </Box>
            ))}
          </HStack>
        ))}
      </VStack>
    </ScrollViewLayout>
  );
}
