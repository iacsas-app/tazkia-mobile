import { Avatar, Box, HStack, Pressable, VStack } from '@react-native-material/core';
import { useMemo, useState } from 'react';
import { ImageSourcePropType, View, useWindowDimensions } from 'react-native';
import { useApplication } from '../../../../hooks/use-application';
import { useMessage } from '../../../../hooks/use-message';
import { localesTranslation } from '../../../../locales';
import { TKeys } from '../../../../locales/constants';
import { SupportedLocale } from '../../../../locales/types';
import Text from '../../../Text';
import { SettingsStyles } from '../SettingsStyles';
import LanguageSelector from './LanguageSelector';

interface Props {
  color?: string;
  open?: boolean;
  borderRadius?: number;
}
export default function LanguageSetting({ open, color, borderRadius }: Props) {
  const { formatMessage } = useMessage();
  const [show, setShow] = useState(open === true);
  const { locale, arabic } = useApplication();
  const languageKey = localesTranslation[locale];
  const { width } = useWindowDimensions();

  const languageFlags: Record<SupportedLocale, ImageSourcePropType> = useMemo(() => {
    return {
      ar: require('./../../../../../assets/img/flags/arabic-flag.png'),
      fr: require('./../../../../../assets/img/flags/french-flag.png'),
      en: require('./../../../../../assets/img/flags/english-flag.png'),
      in: require('./../../../../../assets/img/flags/indonesian-flag.png'),
    };
  }, []);

  function handlePress() {
    setShow(!show);
  }

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        style={{
          width: width - 110,
          elevation: borderRadius ? 6 : 3,
          backgroundColor: borderRadius ? 'white' : 'transparent',
          paddingTop: 1,
          borderRadius: borderRadius,
        }}
      >
        <VStack spacing={10}>
          <Pressable onPress={handlePress} style={SettingsStyles.surface}>
            <HStack spacing={17} reverse={arabic}>
              <Avatar image={languageFlags[locale]} size={40} />
              <VStack>
                <Text color={color} variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  {formatMessage(TKeys.SETTINGS_LANGUAGE)}
                </Text>
                <Text color={color} variant="subtitle1">
                  {formatMessage(`language.${languageKey.key}`)}
                </Text>
              </VStack>
            </HStack>
          </Pressable>
        </VStack>
      </Box>
      {show && <LanguageSelector flags={languageFlags} color={color} />}
    </View>
  );
}
