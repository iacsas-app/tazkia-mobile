import { Box, VStack } from '@react-native-material/core';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import ImageLayout from '../../../components/ImageLayout';
import Text from '../../../components/Text';
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

  return (
    <BasePresentationLayout>
      <VStack spacing={20}>
        {props.source && (
          <Box>
            <ImageLayout source={props.source} />
          </Box>
        )}
        <Box>
          <Text variant="bodyLarge" style={{ fontSize: 18, fontWeight: '700' }}>
            {formatMessage(props.title)}
          </Text>
          <Text variant="bodyLarge" style={{ ...styles.description, fontSize: 15 }}>
            {formatMessage(props.description)}
          </Text>
        </Box>
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
