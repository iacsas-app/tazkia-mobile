import { Avatar, HStack, Text, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet } from 'react-native';
import BodyPart, { BodyPartsOrder } from '../../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { PurificationStackNavigationProp } from '../../../../../navigation/types';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import { findPartProps } from '../common/Helper';
import ProgressStatus from './ProgressStatus';

interface ProgressItemProps {
  value: BodyPart;
}
export default function BodyPartProgressItem({ value }: ProgressItemProps) {
  const { formatMessage } = useMessage();
  const { arabicOrientation } = useApplication();
  const navigation = useNavigation<PurificationStackNavigationProp>();

  function handlePress() {
    navigation.navigate('BodyPartProgress', { value });
  }

  return (
    <Pressable onPress={handlePress}>
      <HStack
        spacing={10}
        style={{ ...styles.chip, paddingHorizontal: arabicOrientation ? 17 : 7 }}
        reverse={arabicOrientation}
      >
        <VStack style={GlobalStyles.center}>
          <Avatar size={25} image={findPartProps(value.name)} />
          <Avatar
            label={
              <Text variant="caption" style={styles.numberText}>
                {BodyPartsOrder[value.name]}
              </Text>
            }
            size={20}
            color="white"
            style={styles.numberAvatar}
          />
        </VStack>
        <VStack spacing={5} style={{ alignItems: 'baseline' }}>
          <Text variant="body1" style={{ ...styles.partName, fontSize: arabicOrientation ? 17 : 14 }}>
            {formatMessage(`purification.body-parts.${value.name}`)}
          </Text>
          <VStack style={{ alignItems: 'flex-start' }}>
            <ProgressStatus items={value.cleaning} title={formatMessage(TKeys.BUTTON_CLEANING)} />
            <ProgressStatus items={value.enlightenment} title={formatMessage(TKeys.BUTTON_ENLIGHTENMENT)} />
          </VStack>
        </VStack>
      </HStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 78,
    backgroundColor: '#fff',
    marginBottom: 7,
    paddingTop: 4,
    paddingBottom: 30,
    borderRadius: 15,
    elevation: 5,
  },
  partName: {
    fontWeight: 'bold',
  },
  numberAvatar: { marginTop: -6, opacity: 0.8, fontSize: 18 },
  numberText: { fontWeight: '600' },
});
