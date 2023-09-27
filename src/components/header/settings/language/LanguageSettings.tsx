import { Avatar, HStack, Pressable, Surface, Text, VStack } from '@react-native-material/core';
import { useMemo, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { useApplication } from '../../../../hooks/use-application';
import { useMessage } from '../../../../hooks/use-message';
import { localesTranslation } from '../../../../locales';
import { TKeys } from '../../../../locales/constants';
import { SupportedLocale } from '../../../../locales/types';
import LanguageSelector from './LanguageSelector';

export default function LanguageSettings() {
  const { formatMessage } = useMessage();
  const [show, setShow] = useState(false);
  const { locale, arabicOrientation } = useApplication();

  const languageFlags: Record<SupportedLocale, ImageSourcePropType> = useMemo(() => {
    return {
      ar: require('./../../../../../assets/img/flags/arabic-flag.png'),
      fr: require('./../../../../../assets/img/flags/french-flag.png'),
      en: require('./../../../../../assets/img/flags/english-flag.png'),
      in: require('./../../../../../assets/img/flags/indonesian-flag.png'),
    };
  }, []);

  const languageKey = localesTranslation[locale];

  function handlePress() {
    setShow(!show);
  }

  return (
    <Surface
      elevation={1}
      style={{ padding: 10, minWidth: 250, marginLeft: -10, backgroundColor: '#fffff0' }}
      category="large"
    >
      <VStack spacing={10}>
        <Pressable onPress={handlePress}>
          <HStack spacing={17} mt={15} reverse={arabicOrientation}>
            <Avatar image={languageFlags[locale]} size={40} />
            <VStack>
              <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
                {formatMessage(TKeys.SETTINGS_LANGUAGE)}
              </Text>
              <Text variant="subtitle1">{formatMessage(`language.${languageKey.key}`)}</Text>
            </VStack>
          </HStack>
        </Pressable>
        {show && <LanguageSelector flags={languageFlags} />}
      </VStack>
    </Surface>
  );
}
