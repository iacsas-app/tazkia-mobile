import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage';
import { useMessage } from '../../../../hooks/use-message';
import { localesTranslation } from '../../../../locales';
import { SupportedLocale } from '../../../../locales/types';
import GlobalStyles from '../../../../styles/GlobalStyles';
import Text from '../../../Text';
import HStack from '../../../stack/HStack';
import VStack from '../../../stack/VStack';

interface LanguageOptionProps {
  value: SupportedLocale;
  icon: AvatarImageSource;
  color?: string;
  onChange: (value: SupportedLocale) => void;
}
export default function LanguageOption({ value, icon, color, onChange }: LanguageOptionProps) {
  const { formatMessage } = useMessage();
  const language = localesTranslation[value];

  function handleChange() {
    onChange(value);
  }

  return (
    <TouchableOpacity onPress={handleChange} style={{ paddingVertical: 4 }}>
      <HStack spacing={12} style={{ ...GlobalStyles.centerAlign, justify: 'between' }}>
        <Avatar.Image source={icon} size={25} />
        <VStack>
          <Text variant="bodyLarge" color={color} style={{ fontWeight: 'bold' }}>
            {language.name}
          </Text>
          <Text variant="bodySmall" color={color}>
            {formatMessage(`language.${language.key}`)}
          </Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}
