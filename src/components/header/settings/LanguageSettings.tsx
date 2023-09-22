import { Button, Text } from '@react-native-material/core';
import { View } from 'react-native';
import { SupportedLocale } from '../../../locales/types';

export interface LanguageSettingsProps {
  locale: SupportedLocale;
  onLocaleChange: (value: SupportedLocale) => void;
}

export default function LanguageSettings({ locale, onLocaleChange }: LanguageSettingsProps) {
  function switchLang(): SupportedLocale {
    switch (locale) {
      case 'ar':
        return 'fr';
      case 'fr':
        return 'en';
      case 'en':
        return 'hi';
      case 'hi':
        return 'ar';
    }
  }
  return (
    <View>
      <Text>Language : {locale}</Text>
      <Button
        title="Switch language"
        onPress={() => {
          let lang = switchLang();
          onLocaleChange(lang);
        }}
      ></Button>
    </View>
  );
}
