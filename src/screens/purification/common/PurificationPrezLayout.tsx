import { PropsWithChildren } from 'react';
import { ColorValue, View } from 'react-native';
import Basmalah from '../../../components/Basmalah';
import Text from '../../../components/Text';
import VStack from '../../../components/stack/VStack';
import { useApplication } from '../../../hooks/use-application';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import { purificationStyles } from './Style';

interface Props extends PropsWithChildren {
  summary: TKeys;
  body: TKeys;
  titleColor?: ColorValue;
}
export default function PurificationPrezLayout(props: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();

  return (
    <VStack spacing={2}>
      <VStack spacing={5}>
        <Text variant="bodyLarge" style={purificationStyles.title} color="blue">
          {formatMessage(props.summary)}
        </Text>
        <Basmalah />
        <Text
          style={{
            paddingTop: arabic ? 8 : 0,
            marginBottom: 30,
            fontSize: arabic ? 16 : 14,
            fontWeight: arabic ? '600' : 'normal',
            textAlign: 'justify',
          }}
        >
          {formatMessage(props.body)}
        </Text>
      </VStack>
      {props.children && <View>{props.children}</View>}
    </VStack>
  );
}
