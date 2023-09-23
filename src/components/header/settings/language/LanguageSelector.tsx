import { Box, Divider, VStack } from '@react-native-material/core';
import { useMemo } from 'react';
import { useApplication } from '../../../../hooks/use-application';
import { localesTranslation } from '../../../../locales';
import { SupportedLocale } from '../../../../locales/types';
import LanguageOption from './LanguageOption';

export default function LanguageSelector() {
  const { setLocale } = useApplication();
  const languageKeys = useMemo(() => Object.keys(localesTranslation) as SupportedLocale[], []);

  return (
    <Box mt={20}>
      <VStack divider={<Divider />}>
        {languageKeys.map((key) => (
          <LanguageOption key={key} value={key} onChange={setLocale} />
        ))}
      </VStack>
    </Box>
  );
}
