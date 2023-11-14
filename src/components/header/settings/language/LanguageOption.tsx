import { Avatar, HStack, Pressable, VStack } from '@react-native-material/core';
import { ImageSourcePropType } from 'react-native';
import { useMessage } from '../../../../hooks/use-message';
import { localesTranslation } from '../../../../locales';
import { SupportedLocale } from '../../../../locales/types';
import Text from '../../../Text';

interface LanguageOptionProps {
  value: SupportedLocale;
  icon: ImageSourcePropType | undefined;
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
    <Pressable onPress={handleChange}>
      <HStack spacing={3} mv={8} justify="between">
        <HStack spacing={12}>
          <Avatar image={icon} size={30} />
          <VStack justify="start" content="center">
            <Text variant="bodyLarge" color={color} style={{ fontWeight: 'bold', fontSize: 12 }}>
              {language.name}
            </Text>
            <Text variant="bodyLarge" color={color} style={{ fontSize: 11 }}>
              {formatMessage(`language.${language.key}`)}
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Pressable>
  );
}
