import { Box, Divider, VStack } from '@react-native-material/core';
import { useMemo } from 'react';
import { ImageSourcePropType } from 'react-native';
import { useApplication } from '../../../../hooks/use-application';
import { localesTranslation } from '../../../../locales';
import { SupportedLocale } from '../../../../locales/types';
import LanguageOption from './LanguageOption';

interface LanguageSelectorProps {
  flags: Record<SupportedLocale, ImageSourcePropType>;
  color?: string;
  all?: boolean;
  onChange?: () => void;
}

export default function LanguageSelector({ flags, color, all, onChange }: LanguageSelectorProps) {
  const { locale, arabic, setLocale } = useApplication();
  const languageKeys = useMemo(() => Object.keys(localesTranslation) as SupportedLocale[], []);
  const keys = all ? languageKeys : languageKeys.filter((item) => locale !== item);
  const m = 30;

  function handleChange(value: SupportedLocale) {
    setLocale(value);
    if (onChange) {
      onChange();
    }
  }

  return (
    <Box mt={10} mb={20} ml={arabic ? 0 : m} mr={arabic ? m : 0}>
      <VStack divider={<Divider leadingInset={20} trailingInset={20} />}>
        {keys.map((key) => (
          <LanguageOption key={key} icon={flags[key]} value={key} color={color} onChange={handleChange} />
        ))}
      </VStack>
    </Box>
  );
}
