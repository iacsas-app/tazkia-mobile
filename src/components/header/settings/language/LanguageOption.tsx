import { HStack, Switch, Text, VStack } from '@react-native-material/core';
import { useEffect, useState } from 'react';
import { useApplication } from '../../../../hooks/use-application';
import { useMessage } from '../../../../hooks/use-message';
import { localesTranslation } from '../../../../locales';
import { SupportedLocale } from '../../../../locales/types';

interface LanguageOptionProps {
  value: SupportedLocale;
  onChange: (value: SupportedLocale) => void;
}
export default function LanguageOption({ value, onChange }: LanguageOptionProps) {
  const { formatMessage } = useMessage();
  const { locale, arabicOrientation } = useApplication();
  const isCurrent = locale === value;
  const [checked, setChecked] = useState(isCurrent);
  const language = localesTranslation[value];

  function handleChange(checked: boolean) {
    if (locale !== value) {
      setChecked(checked);
      onChange(value);
    }
  }

  useEffect(() => {
    if (locale !== value && checked) {
      setChecked(false);
    }
  }, [locale]);

  return (
    <HStack spacing={3} mv={8} justify="between" reverse={arabicOrientation}>
      <VStack justify="start" content="center">
        <Text variant="body1" style={{ fontWeight: 'bold', fontSize: 15 }}>
          {language.name}
        </Text>
        <Text variant="body2">{formatMessage(`language.${language.key}`)}</Text>
      </VStack>
      <Switch value={checked} onValueChange={handleChange} />
    </HStack>
  );
}
