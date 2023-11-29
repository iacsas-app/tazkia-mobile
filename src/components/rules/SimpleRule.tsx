import { Avatar } from 'react-native-paper';
import { SCREEN_WIDTH } from '../../constants/Screen';
import { useApplication } from '../../hooks/use-application';
import GlobalStyles from '../../styles/GlobalStyles';
import Text from '../Text';
import HStack from '../stack/HStack';
import { RuleStyles } from './Styles';
import { RuleBaseProps } from './types';

export default function SimpleRule({ id, item }: RuleBaseProps) {
  const { arabic } = useApplication();

  return (
    <HStack spacing={10} style={GlobalStyles.center}>
      <Avatar.Text label={id.toString()} size={18} labelStyle={{ color: 'white' }} />
      <Text variant="bodySmall" style={{ ...RuleStyles.text, fontSize: arabic ? 14 : 12, width: SCREEN_WIDTH - 110 }}>
        {item}
      </Text>
    </HStack>
  );
}
