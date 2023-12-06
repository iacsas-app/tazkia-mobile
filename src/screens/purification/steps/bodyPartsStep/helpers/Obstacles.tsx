import Icon from '@expo/vector-icons/Fontisto';

import { StyleProp, TextStyle } from 'react-native';

import { Avatar } from 'react-native-paper';
import Text from '../../../../../components/Text';
import HStack from '../../../../../components/stack/HStack';
import VStack from '../../../../../components/stack/VStack';
import { Font } from '../../../../../constants/Font';
import { SCREEN_WIDTH } from '../../../../../constants/Screen';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { purificationStyles } from '../../../common/Style';

export default function Obstacles() {
  const { arabic } = useApplication();
  const { formatMessage } = useMessage();
  const fontSize = Font.size(arabic ? 15 : 13);

  const fontStyle: StyleProp<TextStyle> = {
    fontSize,
    fontWeight: arabic ? '600' : 'normal',
    textAlign: 'justify',
  };

  return (
    <VStack spacing={25}>
      <VStack style={GlobalStyles.center}>
        <Text
          variant="bodyMedium"
          style={{ ...purificationStyles.title, fontSize: Font.size(arabic ? 17 : 15) }}
          color="seagreen"
        >
          {formatMessage(TKeys.PURIFICATION_OBSTACLES)}
        </Text>
        <Avatar.Image
          source={require('./../../../../../../assets/img/obstacles.jpg')}
          size={130}
          style={{ opacity: 0.9 }}
        />
      </VStack>
      <VStack spacing={15}>
        <Text variant="bodyMedium" style={fontStyle}>
          {formatMessage(TKeys.PURIFICATION_BODYPART_OBSTACLES_SUMMARY)}
        </Text>
        <VStack
          spacing={10}
          style={{ backgroundColor: '#fdfdfdbf', borderRadius: 20, padding: 20, width: SCREEN_WIDTH - 30 }}
        >
          <HStack spacing={15} style={{ ...GlobalStyles.centerAlign }}>
            <Icon name="doctor" size={30} color="teal" />
            <Text
              variant="titleSmall"
              color="teal"
              style={{ fontSize: Font.size(arabic ? 16 : 14), fontWeight: '800', width: SCREEN_WIDTH - 90 }}
            >
              {formatMessage(TKeys.PURIFICATION_BODYPART_OBSTACLES_HOW_TO_HANDLE_TITLE)}
            </Text>
          </HStack>
          <Text variant="bodyMedium" style={{ ...fontStyle, marginTop: 10 }}>
            {formatMessage(TKeys.PURIFICATION_BODYPART_OBSTACLES_HOW_TO_HANDLE_SUMMARY)}
          </Text>
          {[TKeys.A, TKeys.B].map((part) => (
            <VStack key={part} spacing={10} style={{ marginTop: 15 }}>
              <HStack style={GlobalStyles.centerAlign} spacing={15}>
                <Avatar.Text
                  label={formatMessage(TKeys.A)}
                  size={22}
                  style={{ backgroundColor: 'teal' }}
                  labelStyle={{ fontWeight: '900', color: 'white' }}
                />
                <Text variant="bodyMedium" style={{ fontSize, fontWeight: '700' }} color="teal">
                  {formatMessage(`purification.bodypart.obstacles.how-to-handle.face.${part}.title`)}
                </Text>
              </HStack>
              <Text variant="bodyMedium" style={{ ...fontStyle }}>
                {formatMessage(`purification.bodypart.obstacles.how-to-handle.face.${part}.summary`)}
              </Text>
            </VStack>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
}
