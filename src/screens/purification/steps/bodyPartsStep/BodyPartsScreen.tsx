import { Box, HStack, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import Text from '../../../../components/Text';
import ScrollViewLayout from '../../../../components/layout/ScrollViewLayout';
import { BodyPartType, BodyPartsOrder } from '../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../hooks/use-application';
import { useMessage } from '../../../../hooks/use-message';
import { TKeys } from '../../../../locales/constants';
import { BodyPartsRulesNavigationProp } from '../../../../navigation/types';
import { groupBy } from '../../../../services/Helpers';
import GlobalStyles from '../../../../styles/GlobalStyles';
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
      <VStack>
        <Text style={GlobalStyles.description}>{formatMessage(TKeys.PURIFICATION_BODYPART_DESCRIPTION)}</Text>
        <Text
          style={{
            paddingVertical: 10,
            fontSize: arabic ? 17 : 14,
            fontWeight: '900',
            textAlign: 'justify',
          }}
        >
          {formatMessage(TKeys.BASMALAH)}
        </Text>
        <Text
          style={{
            paddingTop: arabic ? 8 : 0,
            marginBottom: 30,
            fontSize: arabic ? 16 : 14,
            fontWeight: arabic ? '600' : 'normal',
            textAlign: 'justify',
          }}
        >
          {formatMessage(TKeys.PURIFICATION_INTRODUCTION)}
        </Text>
      </VStack>
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
