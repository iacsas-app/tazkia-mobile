import { useMemo, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage';
import { useApplication } from '../../../../hooks/use-application';
import { useMessage } from '../../../../hooks/use-message';
import { localesTranslation } from '../../../../locales';
import { TKeys } from '../../../../locales/constants';
import { SupportedLocale } from '../../../../locales/types';
import GlobalStyles from '../../../../styles/GlobalStyles';
import Text from '../../../Text';
import HStack from '../../../stack/HStack';
import VStack from '../../../stack/VStack';
import { SettingsStyles } from '../SettingsStyles';
import LanguageSelector from './LanguageSelector';

export const langFlags: Record<SupportedLocale, AvatarImageSource> = {
  ar: require('./../../../../../assets/img/flags/arabic-flag.png'),
  fr: require('./../../../../../assets/img/flags/french-flag.png'),
  en: require('./../../../../../assets/img/flags/english-flag.png'),
  in: require('./../../../../../assets/img/flags/indonesian-flag.png'),
};

interface Props {
  color?: string;
  open?: boolean;
  borderRadius?: number;
  onClick?(): void;
}
export default function LanguageSetting({ open, borderRadius, onClick }: Props) {
  const { formatMessage } = useMessage();
  const [show, setShow] = useState(open === true);
  const { locale, defaultLang } = useApplication();
  const lang = locale ? locale : defaultLang;
  const languageKey = localesTranslation[lang];
  const { width } = useWindowDimensions();

  const languageFlags: Record<SupportedLocale, AvatarImageSource> = useMemo(() => langFlags, []);

  function handlePress() {
    setShow(!show);
  }

  return (
    <View>
      <TouchableOpacity onPress={handlePress} style={SettingsStyles.surface}>
        <HStack spacing={17} style={GlobalStyles.centerAlign}>
          <Avatar.Image source={languageFlags[lang]} size={30} />
          <VStack>
            <Text variant="titleMedium" color="black" style={{ fontWeight: '700' }}>
              {formatMessage(TKeys.SETTINGS_LANGUAGE)}
            </Text>
            <Text variant="titleSmall" color="black">
              {formatMessage(`language.${languageKey.key}`)}
            </Text>
          </VStack>
        </HStack>
      </TouchableOpacity>
      {show && <LanguageSelector flags={languageFlags} color="black" onChange={onClick} />}
    </View>
  );
}
