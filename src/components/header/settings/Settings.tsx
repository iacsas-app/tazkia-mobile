import { Divider, VStack } from '@react-native-material/core';
import { ResetSetting } from './ResetSetting';
import LanguageSetting from './language/LanguageSetting';

export default function Settings() {
  return (
    <VStack>
      <LanguageSetting />
      <Divider />
      <ResetSetting />
    </VStack>
  );
}
