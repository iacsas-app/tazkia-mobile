import Icon from '@expo/vector-icons/MaterialIcons';
import { HStack, Pressable, Surface, Text, VStack } from '@react-native-material/core';
import { useState } from 'react';
import { useApplication } from '../../../../hooks/use-application';
import { useMessage } from '../../../../hooks/use-message';
import { localesTranslation } from '../../../../locales';
import { TKeys } from '../../../../locales/constants';
import LanguageSelector from './LanguageSelector';

export default function LanguageSettings() {
  const { formatMessage } = useMessage();
  const [show, setShow] = useState(false);
  const { locale, arabicOrientation } = useApplication();

  const languageKey = localesTranslation[locale];

  function handlePress() {
    setShow(!show);
  }

  return (
    <Surface elevation={1} style={{ padding: 10, minWidth: 250 }} category="large">
      <VStack spacing={25}>
        <Pressable onPress={handlePress}>
          <HStack spacing={17} mt={15} reverse={arabicOrientation}>
            <Icon name="language" size={30} color="green" style={{ marginTop: 8 }} />
            <VStack>
              <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
                {formatMessage(TKeys.SETTINGS_LANGUAGE)}
              </Text>
              <Text variant="subtitle1">{formatMessage(`language.${languageKey.key}`)}</Text>
            </VStack>
          </HStack>
        </Pressable>
        {show && <LanguageSelector />}
      </VStack>
    </Surface>
  );
}
