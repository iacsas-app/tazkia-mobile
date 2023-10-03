import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Box, HStack, Text, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet } from 'react-native';
import BodyPart, { BodyPartsOrder } from '../../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { PurificationStackNavigationProp } from '../../../../../navigation/types';
import { PURIFICATION_MAX_DAYS } from '../../../../../services/Helpers';
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

  const cleaningCount = value.cleaning ? value.cleaning.length : 0;
  const lastCleaning = value.cleaning?.at(cleaningCount - 1);
  const cleaningCompleted = lastCleaning
    ? lastCleaning.day === PURIFICATION_MAX_DAYS && lastCleaning.errors.length === 0
    : false;

  const enlightenmentCount = value.enlightenment ? value.enlightenment.length : 0;
  const lastEnlightenment = value.enlightenment?.at(enlightenmentCount - 1);
  const enlightenmentCompleted = lastEnlightenment
    ? lastEnlightenment.day === PURIFICATION_MAX_DAYS && lastEnlightenment.errors.length === 0
    : false;

  const fullyCompleted = cleaningCompleted && enlightenmentCompleted;

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
          <Box>
            <Text variant="body1" style={{ ...styles.partName, fontSize: arabicOrientation ? 17 : 14 }}>
              {formatMessage(`purification.body-parts.${value.name}`)}
            </Text>
          </Box>
          <VStack style={{ alignItems: 'flex-start' }}>
            <ProgressStatus
              title={formatMessage(TKeys.BUTTON_CLEANING)}
              last={lastCleaning}
              count={cleaningCount}
              completed={cleaningCompleted}
            />
            <ProgressStatus
              title={formatMessage(TKeys.BUTTON_ENLIGHTENMENT)}
              last={lastEnlightenment}
              count={enlightenmentCount}
              completed={enlightenmentCompleted}
            />
          </VStack>
        </VStack>
        <Box>{fullyCompleted && <Icon name="hand-clap" size={25} color="#4682b4" style={{ opacity: 0.9 }} />}</Box>
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
