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

export const langFlags: Record<SupportedLocale, ImageSourcePropType> = {
  ar: require('./../../../../../assets/img/flags/arabic-flag.png'),
  fr: require('./../../../../../assets/img/flags/french-flag.png'),
  en: require('./../../../../../assets/img/flags/english-flag.png'),
  in: require('./../../../../../assets/img/flags/indonesian-flag.png'),
};

interface Props {
  color?: string;
  open?: boolean;
  borderRadius?: number;
}
export default function LanguageSetting({ open, borderRadius }: Props) {
  const { formatMessage } = useMessage();
  const [show, setShow] = useState(open === true);
  const { locale, defaultLang } = useApplication();
  const lang = locale ? locale : defaultLang;
  const languageKey = localesTranslation[lang];
  const { width } = useWindowDimensions();

  const languageFlags: Record<SupportedLocale, ImageSourcePropType> = useMemo(() => langFlags, []);

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
          elevation: borderRadius ? 6 : 0,
          backgroundColor: 'white',
          paddingTop: 1,
          borderRadius: borderRadius ? borderRadius : 5,
        }}
      >
        <VStack spacing={10}>
          <Pressable onPress={handlePress} style={SettingsStyles.surface}>
            <HStack spacing={17}>
              <Avatar image={languageFlags[lang]} size={40} />
              <VStack>
                <Text variant="titleSmall" color="black" style={{ fontWeight: 'bold' }}>
                  {formatMessage(TKeys.SETTINGS_LANGUAGE)}
                </Text>
                <Text variant="titleSmall" color="black">
                  {formatMessage(`language.${languageKey.key}`)}
                </Text>
              </VStack>
            </HStack>
          </Pressable>
        </VStack>
      </Box>
      {show && <LanguageSelector flags={languageFlags} color="black" />}
    </View>
  );
}
