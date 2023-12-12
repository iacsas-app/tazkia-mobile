import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import Text from '../components/Text';
import LanguageSelector from '../components/header/settings/language/LanguageSelector';
import { langFlags } from '../components/header/settings/language/LanguageSetting';
import ScreenLayout from '../components/layout/ScreenLayout';
import HStack from '../components/stack/HStack';
import VStack from '../components/stack/VStack';
import { useApplication } from '../hooks/use-application';
import { useMessage } from '../hooks/use-message';
import { localesTranslation } from '../locales';
import { TKeys } from '../locales/constants';
import { SupportedLocale } from '../locales/types';
import { FIRST_VISIT_DATE, deviceLanguage } from '../services/Helpers';
import { storageEngine } from '../stores/storage-engine';
import GlobalStyles from '../styles/GlobalStyles';

export default function FirstVisitScreen() {
  const { locale, setLocale, setFirstVisitDate } = useApplication();
  const { formatMessage } = useMessage();
  const [chooseLanguage, setChooseLanguage] = useState<boolean>();
  const systemLanguage = useMemo(() => deviceLanguage(), []);
  const languageKeys = useMemo(() => Object.keys(localesTranslation) as SupportedLocale[], []);
  const isSupported = isDeviceLanguageHandled();

  function isDeviceLanguageHandled() {
    return languageKeys.find((item) => item === systemLanguage) !== undefined;
  }

  function handlePressYes() {
    setLocale(locale);
    init();
  }

  function handlePressNo() {
    setChooseLanguage(true);
  }

  function handleLanguageChange() {
    init();
  }

  function init() {
    const date = Date.now();
    storageEngine.setItem(FIRST_VISIT_DATE, date);
    setFirstVisitDate(date);
  }

  useEffect(() => {
    setChooseLanguage(!isSupported);
  }, []);

  if (!locale || chooseLanguage === undefined) {
    return <></>;
  }

  return (
    <ScreenLayout>
      <VStack spacing={25} style={{ paddingHorizontal: 15 }}>
        <VStack spacing={35} style={GlobalStyles.center}>
          <Avatar.Image source={require('./../../assets/img/presentation/manhaj1.jpg')} size={200} />
          <Text variant="headlineSmall" style={{ fontWeight: '900', textAlign: 'center' }}>
            {formatMessage(TKeys.WELCOME)}
          </Text>
          {isSupported ? (
            <Text variant="bodyLarge" style={{ color: 'green' }}>
              {formatMessage(TKeys.SETTINGS_LANGUAGE_DEFAULT, {
                lang: formatMessage(`language.${localesTranslation[locale].key}`),
              })}
            </Text>
          ) : (
            <>
              <Text variant="headlineMedium" style={{ color: 'red' }}>
                نعتذر، لغة هاتفكم غير مدعومة
              </Text>
              <Text variant="headlineSmall">المرجو اختيار لغة أخرى من بين القائمة التالية :</Text>
            </>
          )}
        </VStack>
        <View style={GlobalStyles.center}>
          {chooseLanguage ? (
            <LanguageSelector flags={langFlags} all color="black" onChange={handleLanguageChange} />
          ) : (
            <HStack style={{ ...GlobalStyles.center }} spacing={10}>
              <Button
                mode="contained"
                buttonColor="green"
                icon={() => <Icon name="thumb-up-outline" size={20} color="white" />}
                onPress={handlePressYes}
              >
                {formatMessage(TKeys.BUTTON_YES)}
              </Button>
              <Button
                mode="contained"
                buttonColor="grey"
                icon={() => <Icon name="thumb-down-outline" size={20} color="white" />}
                onPress={handlePressNo}
              >
                {formatMessage(TKeys.BUTTON_NO)}
              </Button>
            </HStack>
          )}
        </View>
      </VStack>
    </ScreenLayout>
  );
}
