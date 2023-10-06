import { Avatar, VStack } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import ScrollViewLayout from '../../../../../components/layout/ScrollViewLayout';
import BodyPart from '../../../../../domains/purification/BodyPart';
import { BodyPartProgressScreenRouteProp } from '../../../../../navigation/types';
import { findPartProps } from '../common/Helper';
import BodyPartProgress from './BodyPartProgress';

export default function BodyPartProgressScreen() {
  const { value } = useRoute<BodyPartProgressScreenRouteProp>().params;

  return (
    <ScrollViewLayout>
      <Avatar image={findPartProps(value.name)} size={80} />
      <VStack spacing={15} mt={15} mb={15}>
        {['cleaning', 'enlightenment'].map((step) => {
          const lines = value[step as keyof BodyPart['cleaning' | 'enlightenment']];
          return (
            lines && (
              <VStack key={step}>
                <BodyPartProgress step={step as any} part={value.name} lines={lines} />
              </VStack>
            )
          );
        })}
      </VStack>
    </ScrollViewLayout>
  );
}
