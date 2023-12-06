import Icon from '@expo/vector-icons/Fontisto';

import { StyleProp, TextStyle } from 'react-native';

import { Avatar } from 'react-native-paper';
import Text from '../../../../../components/Text';
import HStack from '../../../../../components/stack/HStack';
import VStack from '../../../../../components/stack/VStack';
import { Font } from '../../../../../constants/Font';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { purificationStyles } from '../../../common/Style';

export default function Obstacles() {
  const { arabic } = useApplication();
  const { formatMessage } = useMessage();

  const fontStyle: StyleProp<TextStyle> = {
    fontSize: Font.size(arabic ? 16 : 14),
    fontWeight: arabic ? '600' : 'normal',
    textAlign: 'justify',
  };

  return (
    <VStack spacing={25}>
      <VStack style={GlobalStyles.center}>
        <Text
          variant="bodyMedium"
          style={{ ...purificationStyles.title, fontSize: Font.size(arabic ? 19 : 16) }}
          color="seagreen"
        >
          {formatMessage(TKeys.PURIFICATION_OBSTACLES)}
        </Text>
        <Avatar.Image
          source={require('./../../../../../../assets/img/obstacles.jpg')}
          size={130}
          style={{ opacity: 0.95 }}
        />
      </VStack>
      <VStack spacing={15}>
        <Text variant="bodyMedium" style={fontStyle}>
          {formatMessage(TKeys.PURIFICATION_BODYPART_OBSTACLES_SUMMARY)}
        </Text>
        <VStack spacing={10} style={{ backgroundColor: '#fdfdfdbf', borderRadius: 20, padding: 20 }}>
          <HStack spacing={15} style={GlobalStyles.centerAlign}>
            <Icon name="doctor" size={35} color={'green'} />
            <Text variant="titleSmall" style={{ fontSize: Font.size(arabic ? 17 : 15), fontWeight: '800' }}>
              {formatMessage(TKeys.PURIFICATION_BODYPART_OBSTACLES_HOW_TO_HANDLE_TITLE)}
            </Text>
          </HStack>
          <Text variant="bodyMedium" style={{ ...fontStyle, marginVertical: 10 }}>
            {formatMessage(TKeys.PURIFICATION_BODYPART_OBSTACLES_HOW_TO_HANDLE_SUMMARY)}
          </Text>
          <HStack style={GlobalStyles.centerAlign} spacing={10}>
            <Avatar.Text
              label={formatMessage(TKeys.A)}
              size={22}
              style={{ backgroundColor: 'grey' }}
              labelStyle={{ fontWeight: '900', color: 'white' }}
            />
            <Text variant="bodyMedium" style={{ fontSize: Font.size(arabic ? 16 : 14), fontWeight: '800' }}>
              {formatMessage(TKeys.PURIFICATION_BODYPART_OBSTACLES_HOW_TO_HANDLE_FACE_1_TITLE)}
            </Text>
          </HStack>
          <Text variant="bodyMedium" style={{ ...fontStyle, paddingRight: 20 }}>
            {formatMessage(TKeys.PURIFICATION_BODYPART_OBSTACLES_HOW_TO_HANDLE_FACE_1_SUMMARY)}
          </Text>
          <HStack style={GlobalStyles.centerAlign} spacing={10}>
            <Avatar.Text
              label={formatMessage(TKeys.B)}
              size={22}
              style={{ backgroundColor: 'grey' }}
              labelStyle={{ fontWeight: '900', color: 'white' }}
            />
            <Text variant="bodyMedium" style={{ fontSize: Font.size(arabic ? 16 : 14), fontWeight: '800' }}>
              {formatMessage(TKeys.PURIFICATION_BODYPART_OBSTACLES_HOW_TO_HANDLE_FACE_2_TITLE)}
            </Text>
          </HStack>
          <Text variant="bodyMedium" style={{ ...fontStyle, paddingRight: 20 }}>
            {formatMessage(TKeys.PURIFICATION_BODYPART_OBSTACLES_HOW_TO_HANDLE_FACE_2_SUMMARY)}
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
}