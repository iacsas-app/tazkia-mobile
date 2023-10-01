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
      <HStack spacing={10} style={styles.chip} reverse={arabicOrientation}>
        <VStack style={GlobalStyles.center}>
          <Avatar size={30} image={findPartProps(value.name)} />
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
        <VStack spacing={5} style={{ alignItems: `flex-${arabicOrientation ? 'end' : 'start'}` }}>
          <Text variant="body1" style={{ ...styles.partName, fontSize: arabicOrientation ? 18 : 12 }}>
            {formatMessage(`purification.body-parts.${value.name}`)}
          </Text>
          <VStack style={{ alignItems: 'flex-start' }}>
            <ProgressStatus items={value.purification} title={formatMessage(TKeys.BUTTON_PURIFICATION)} />
            <ProgressStatus items={value.illumination} title={formatMessage(TKeys.BUTTON_ILLUMINATION)} />
          </VStack>
        </VStack>
      </HStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 75,
    backgroundColor: '#fffafa',
    marginBottom: 7,
    paddingLeft: 5,
    paddingTop: 1,
    paddingRight: 5,
    paddingBottom: 18,
    borderRadius: 20,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 0.3,
    borderTopWidth: 0.3,
    borderColor: '#87ceeb',
  },
  partName: {
    fontWeight: 'bold',
  },
  numberAvatar: { marginTop: -6, opacity: 0.8, fontSize: 18 },
  numberText: { fontWeight: '900' },
});
