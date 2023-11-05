import { Box, Stack, VStack } from '@react-native-material/core';
import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import PressableStep, { Part } from '../../components/PressableStep';
import Text from '../../components/Text';
import { useApplication } from '../../hooks/use-application';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import BasePresentationLayout from '../presentation/common/BasePresentationLayout';
import SunnahsProgressScreen from './SunnahsProgressScreen';
import { sunnahsStages } from './common/Helper';

export default function SunnahsScreen() {
  const { formatMessage } = useMessage();
  const { width } = useWindowDimensions();
  const { arabic, hasSunnahsProgress } = useApplication();

  const parts: Part[] = useMemo(() => sunnahsStages, []);

  if (hasSunnahsProgress) {
    return <SunnahsProgressScreen />;
  }

  return (
    <BasePresentationLayout>
      <Text style={{ ...GlobalStyles.description, fontSize: 20 }}>{formatMessage(TKeys.SUNNAHS_DESCRIPTION)}</Text>
      <VStack spacing={2} style={{ alignItems: 'center' }}>
        <VStack>
          <Text
            style={{
              paddingVertical: 15,
              fontSize: 12,
              fontWeight: '900',
              textAlign: 'justify',
            }}
          >
            {formatMessage(TKeys.BASMALAH)}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: arabic ? '600' : 'normal',
              textAlign: 'justify',
            }}
          >
            {formatMessage(TKeys.SUNNAHS_INTRODUTION)}
          </Text>
        </VStack>
        <Stack style={GlobalStyles.container} items="center" spacing={24} mt={13}>
          {parts.map((item: Part, index: number) => (
            <Box key={index} style={{ ...styles.part, width: width - 140 }}>
              <PressableStep item={item} nameTextSize={14} descriptionTextSize={14} />
            </Box>
          ))}
        </Stack>
      </VStack>
    </BasePresentationLayout>
  );
}

const styles = StyleSheet.create({
  part: {
    backgroundColor: '#b3f1d5',
    elevation: 6,
    borderRadius: 15,
    paddingBottom: 3,
  },
});
