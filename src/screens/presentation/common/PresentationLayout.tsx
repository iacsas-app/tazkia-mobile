import { Box, VStack } from '@react-native-material/core';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import ImageLayout from '../../../components/ImageLayout';
import Text from '../../../components/Text';
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
      <VStack spacing={25}>
        {props.source && (
          <Box>
            <ImageLayout source={props.source} />
          </Box>
        )}
        <Box>
          <Text variant="h4">{formatMessage(props.title)}</Text>
          <Text style={{ ...styles.description, fontSize: arabic ? 18 : 15 }}>{formatMessage(props.description)}</Text>
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
