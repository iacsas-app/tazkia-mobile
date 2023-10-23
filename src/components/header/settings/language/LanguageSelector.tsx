import { Box, Divider, VStack } from '@react-native-material/core';
import { useMemo } from 'react';
import { ImageSourcePropType } from 'react-native';
import { useApplication } from '../../../../hooks/use-application';
import { localesTranslation } from '../../../../locales';
import { SupportedLocale } from '../../../../locales/types';
import LanguageOption from './LanguageOption';

interface LanguageSelectorProps {
  flags: Record<SupportedLocale, ImageSourcePropType>;
}

export default function LanguageSelector({ flags }: LanguageSelectorProps) {
  const { locale, arabic, setLocale } = useApplication();
  const languageKeys = useMemo(() => Object.keys(localesTranslation) as SupportedLocale[], []);
  const m = 40;

  return (
    <Box mt={40} mb={20} ml={arabic ? 0 : m} mr={arabic ? m : 0}>
      <VStack divider={<Divider leadingInset={20} trailingInset={20} />}>
        {languageKeys
          .filter((item) => locale !== item)
          .map((key) => (
            <LanguageOption key={key} icon={flags[key]} value={key} onChange={setLocale} />
          ))}
      </VStack>
    </Box>
  );
}
