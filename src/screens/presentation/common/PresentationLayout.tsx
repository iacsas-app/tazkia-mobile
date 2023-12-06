import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import ImageLayout from '../../../components/ImageLayout';
import Text from '../../../components/Text';
import VStack from '../../../components/stack/VStack';
import { Font } from '../../../constants/Font';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import BasePresentationLayout from './BasePresentationLayout';

interface Props {
  title: TKeys;
  description: TKeys;
  source?: ImageSourcePropType;
}
export default function PresentationLayout(props: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();

  return (
    <BasePresentationLayout>
      <VStack spacing={20}>
        {props.source && (
          <View>
            <ImageLayout source={props.source} />
          </View>
        )}
        <View>
          <Text variant="bodyLarge" style={{ fontSize: Font.size(arabic ? 16 : 14), fontWeight: '800' }}>
            {formatMessage(props.title)}
          </Text>
          <Text variant="bodyMedium" style={{ ...styles.description, fontSize: Font.size(arabic ? 15 : 14) }}>
            {formatMessage(props.description)}
          </Text>
        </View>
      </VStack>
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
