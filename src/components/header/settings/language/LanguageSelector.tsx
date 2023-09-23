import { Box, Divider, VStack } from '@react-native-material/core';
import { useMemo } from 'react';
import { ImageSourcePropType } from 'react-native';
import { useApplication } from '../../../../hooks/use-application';
import { localesTranslation } from '../../../../locales';
import { SupportedLocale } from '../../../../locales/types';
import LanguageOption from './LanguageOption';

export default function LanguageSelector() {
  const { setLocale } = useApplication();
  const languageKeys = useMemo(() => Object.keys(localesTranslation) as SupportedLocale[], []);
  const languageFlags: Map<SupportedLocale, ImageSourcePropType> = useMemo(() => {
    return new Map([
      ['ar', require('./../../../../../assets/img/arabic-flag.png')],
      ['fr', require('./../../../../../assets/img/french-flag.png')],
      ['en', require('./../../../../../assets/img/english-flag.png')],
      ['hi', require('./../../../../../assets/img/hinduism-flag.png')],
    ]);
  }, []);
  return (
    <Box mt={20}>
      <VStack divider={<Divider />}>
        {languageKeys.map((key) => (
          <LanguageOption key={key} icon={languageFlags.get(key)} value={key} onChange={setLocale} />
        ))}
      </VStack>
    </Box>
  );
}
