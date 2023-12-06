import Icon from '@expo/vector-icons/Fontisto';

import { StyleProp, TextStyle } from 'react-native';

import { useMemo } from 'react';
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

  const items = useMemo(
    () => [
      {
        title: TKeys.PURIFICATION_MIND_OBSTACLES_CASE_1_TITLE,
        summary: TKeys.PURIFICATION_MIND_OBSTACLES_CASE_1_SUMMARY,
        handle: TKeys.PURIFICATION_MIND_OBSTACLES_CASE_1_HOW_TO_HANDLE,
      },
      {
        title: TKeys.PURIFICATION_MIND_OBSTACLES_CASE_2_TITLE,
        summary: TKeys.PURIFICATION_MIND_OBSTACLES_CASE_2_SUMMARY,
      },
      {
        title: TKeys.PURIFICATION_MIND_OBSTACLES_CASE_3_TITLE,
        summary: TKeys.PURIFICATION_MIND_OBSTACLES_CASE_3_SUMMARY,
        handle: TKeys.PURIFICATION_MIND_OBSTACLES_CASE_3_HOW_TO_HANDLE,
      },
    ],
    [],
  );

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
          size={120}
          style={{ opacity: 0.9 }}
        />
      </VStack>
      <VStack spacing={15}>
        <Text variant="bodyMedium" style={fontStyle}>
          {formatMessage(TKeys.PURIFICATION_MIND_OBSTACLES_SUMMARY)}
        </Text>

        {items.map((item, index) => (
          <VStack
            key={index}
            spacing={15}
            style={{
              backgroundColor: '#fdfdfdbf',
              borderRadius: 20,
              paddingVertical: 25,
              paddingHorizontal: 15,
            }}
          >
            <HStack style={{ ...GlobalStyles.centerAlign, width: SCREEN_WIDTH - 80, paddingEnd: 20 }} spacing={15}>
              <Avatar.Text
                label={`${index + 1}`}
                size={25}
                style={{ backgroundColor: 'teal' }}
                labelStyle={{ fontWeight: '900', color: 'white' }}
              />

              <Text variant="bodyMedium" style={{ fontSize, fontWeight: '900' }} color="teal">
                {formatMessage(item.title)}
              </Text>
            </HStack>
            <Text variant="bodyMedium" style={fontStyle}>
              {formatMessage(item.summary)}
            </Text>
            {item.handle && (
              <VStack spacing={10}>
                <HStack spacing={15} style={GlobalStyles.centerAlign}>
                  <Icon name="doctor" size={25} color="black" />
                  <Text variant="titleSmall" style={{ fontSize, fontWeight: '700' }} color="black">
                    {formatMessage(TKeys.PURIFICATION_MIND_OBSTACLES_HOW_TO_HANDLE)}
                  </Text>
                </HStack>
                <Text variant="bodyMedium" style={fontStyle}>
                  {formatMessage(item.handle)}
                </Text>
              </VStack>
            )}
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
}
