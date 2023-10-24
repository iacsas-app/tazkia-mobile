import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Box, VStack } from '@react-native-material/core';
import { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import Text from '../components/Text';
import TextSection from '../components/TextSection';
import LanguageSetting from '../components/header/settings/language/LanguageSetting';
import ScreenLayout from '../components/layout/ScreenLayout';
import { useApplication } from '../hooks/use-application';
import { useMessage } from '../hooks/use-message';
import { localesTranslation } from '../locales';
import { TKeys } from '../locales/constants';
import { SupportedLocale } from '../locales/types';
import { deviceLanguage } from '../services/Helpers';
import GlobalStyles from '../styles/GlobalStyles';

export default function FirstVisitScreen() {
  const { locale, setLocale, setFirstVisit } = useApplication();
  const { formatMessage } = useMessage();

  const defaultDeviceLanguage = useMemo(() => deviceLanguage(), []);
  const languageKeys = useMemo(() => Object.keys(localesTranslation) as SupportedLocale[], []);
  const language = defaultDeviceLanguage.split('_')[0];
  const isSupported = isDeviceLanguageHandled();

  function isDeviceLanguageHandled() {
    return languageKeys.find((item) => item === language) !== undefined;
  }

  function handleSave() {
    setFirstVisit(false);
  }

  useEffect(() => {
    let lang: SupportedLocale = 'ar';
    if (isSupported) {
      lang = language as SupportedLocale;
    }
    setLocale(lang);
  }, []);

  return (
    <ScreenLayout>
      <View>
        <VStack spacing={25}>
          <Box style={{ ...GlobalStyles.center }}>
            <Text variant="h6">{formatMessage(TKeys.WELCOME)}</Text>
          </Box>
          <Box style={{ ...GlobalStyles.center }}>
            {isDeviceLanguageHandled() ? (
              <TextSection
                color="green"
                title={formatMessage(TKeys.SETTINGS_LANGUAGE_DEFAULT, {
                  lang: formatMessage(`language.${localesTranslation[locale].key}`),
                })}
              />
            ) : (
              <TextSection title="نعتذر، لغة هاتفكم غير مدعومة" color="red">
                المرجو اختيار لغة أخرى من بين القائمة التالية :
              </TextSection>
            )}
          </Box>
          <Box>
            <LanguageSetting open={true} borderRadius={15} />
          </Box>
          <Box style={{ ...GlobalStyles.center }}>
            <Button
              icon={() => <Icon name="check-circle" size={20} color="white" />}
              style={{ backgroundColor: '#4682b4' }}
              onPress={handleSave}
            >
              {formatMessage(TKeys.BUTTON_SAVE)}
            </Button>
          </Box>
        </VStack>
      </View>
    </ScreenLayout>
  );
}
