import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import Text from '../../components/Text';
import VStack from '../../components/stack/VStack';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import BasePresentationLayout from './common/BasePresentationLayout';

/**
 * Manhaj
 * @returns
 */
export default function ApproachScreen() {
  const { formatMessage } = useMessage();
  const { width, height } = useWindowDimensions();

  return (
    <BasePresentationLayout>
      <VStack spacing={20} style={GlobalStyles.center}>
        <View>
          <Image
            source={require('./../../../assets/img/presentation/manhaj.jpg')}
            style={{ width: width - 150, borderRadius: 30 }}
          />
        </View>
        <View style={{ width: width - 40 }}>
          <Text variant="bodyLarge" style={{ fontSize: 20, fontWeight: '700' }}>
            {formatMessage(TKeys.PRESENTATION_APPROACH_TITLE)}
          </Text>
          <Text variant="bodyLarge" style={{ ...styles.description, fontSize: 15 }}>
            {formatMessage(TKeys.PRESENTATION_APPROACH)}
          </Text>
        </View>
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
