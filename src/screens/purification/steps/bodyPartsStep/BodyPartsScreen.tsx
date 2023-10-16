import { Box, HStack, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();

  function handleOpenRules(part: BodyPartType, step: PurificationStage) {
    navigation.navigate('BodyPartsRules', { part, step });
  }

  return (
    <ScrollViewLayout>
      <VStack>
        <Text style={styles.description}>{formatMessage(TKeys.PURIFICATION_BODYPART_DESCRIPTION)}</Text>
        <Text
          style={{
            paddingHorizontal: 15,
            paddingVertical: 15,
            fontSize: arabic ? 17 : 14,
            fontWeight: '900',
            textAlign: arabic ? 'auto' : 'justify',
          }}
        >
          {formatMessage(TKeys.BASMALAH)}
        </Text>
        <Text
          style={{
            paddingHorizontal: 15,
            paddingTop: arabic ? 8 : 0,
            marginBottom: 30,
            fontSize: arabic ? 16 : 14,
            fontWeight: arabic ? '600' : 'normal',
            textAlign: arabic ? 'auto' : 'justify',
          }}
        >
          {formatMessage(TKeys.PURIFICATION_INTRODUCTION)}
        </Text>
      </VStack>
      <VStack
        spacing={15}
        style={{ ...GlobalStyles.center, paddingHorizontal: Math.max(20, insets.left + insets.right) }}
      >
        {Object.keys(partsByLine).map((key: string) => (
          <HStack key={key} spacing={15} reverse={arabic}>
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

const styles = StyleSheet.create({
  description: {
    marginTop: 15,
    paddingHorizontal: 18,
    fontSize: 19,
    fontWeight: '900',
    color: 'green',
  },
});
