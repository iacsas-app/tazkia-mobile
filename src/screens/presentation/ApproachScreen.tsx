import { Box, VStack } from '@react-native-material/core';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import Text from '../../components/Text';
import { useApplication } from '../../hooks/use-application';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import BasePresentationLayout from './common/BasePresentationLayout';

/**
 * Manhaj
 * @returns
 */
export default function ApproachScreen() {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const { width, height } = useWindowDimensions();

  return (
    <BasePresentationLayout>
      <VStack>
        <Box style={{ width: width - 40 }}>
          <Text style={{ fontSize: 20, fontWeight: '700' }}>{formatMessage(TKeys.PRESENTATION_APPROACH_TITLE)}</Text>
          <Text style={{ ...styles.description, fontSize: arabic ? 18 : 15 }}>
            {formatMessage(TKeys.PRESENTATION_APPROACH)}
          </Text>
        </Box>
      </VStack>
      <Image
        source={require('./../../../assets/img/presentation/manhajTargets.jpg')}
        style={{ width: width, height: height - 260, marginBottom: 10 }}
      />
    </BasePresentationLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    textAlign: 'justify',
  },
  description: {
    marginTop: 22,
    fontWeight: '500',
    textAlign: 'justify',
  },
});
