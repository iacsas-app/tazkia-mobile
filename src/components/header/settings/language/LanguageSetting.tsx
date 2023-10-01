import { Avatar, HStack, Pressable, Surface, Text, VStack } from '@react-native-material/core';
import { useMemo, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { useApplication } from '../../../../hooks/use-application';
import { useMessage } from '../../../../hooks/use-message';
import { localesTranslation } from '../../../../locales';
import { TKeys } from '../../../../locales/constants';
import { SupportedLocale } from '../../../../locales/types';
import { SettingsStyles } from '../SettingsStyles';
import LanguageSelector from './LanguageSelector';

export default function LanguageSetting() {
  const { formatMessage } = useMessage();
  const [show, setShow] = useState(false);
  const { locale, arabicOrientation } = useApplication();
  const languageKey = localesTranslation[locale];

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
    <Surface elevation={3} style={SettingsStyles.container} category="large">
      <VStack spacing={10}>
        <Pressable onPress={handlePress} style={SettingsStyles.surface}>
          <HStack spacing={17} reverse={arabicOrientation}>
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
