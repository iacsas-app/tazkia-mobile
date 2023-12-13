import { PropsWithChildren } from 'react';
import { ColorValue } from 'react-native';
import Basmalah from '../../../components/Basmalah';
import Text from '../../../components/Text';
import VStack from '../../../components/stack/VStack';
import { Font } from '../../../constants/Font';
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
    <VStack>
      <VStack spacing={2}>
        <Text
          variant="bodyMedium"
          style={{ ...purificationStyles.title, fontSize: Font.size(arabic ? 16 : 14), color: 'seagreen' }}
        >
          {formatMessage(props.summary)}
        </Text>
        <Basmalah />
        <Text
          variant="bodyMedium"
          style={{
            paddingTop: 10,
            textAlign: 'justify',
          }}
        >
          {formatMessage(props.body)}
        </Text>
      </VStack>
      {props.children}
    </VStack>
  );
}
