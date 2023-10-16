import { Divider, VStack } from '@react-native-material/core';
import { ResetSetting } from './ResetSetting';
import LanguageSetting from './language/LanguageSetting';

interface Props {
  color: string;
}
export default function Settings({ color }: Props) {
  return (
    <VStack>
      <LanguageSetting color={color} />
      <Divider />
      <ResetSetting />
    </VStack>
  );
}
