import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Box, HStack, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet } from 'react-native';
import { MD3Colors, ProgressBar } from 'react-native-paper';
import Text from '../../../../../components/Text';
import BodyPart, { BodyPartsOrder } from '../../../../../domains/purification/BodyPart';
import { useApplication } from '../../../../../hooks/use-application';
import { useMessage } from '../../../../../hooks/use-message';
import { TKeys } from '../../../../../locales/constants';
import { PurificationStackNavigationProp } from '../../../../../navigation/types';
import { PURIFICATION_MAX_DAYS, percentage } from '../../../../../services/Helpers';
import { findPartProps } from '../common/Helper';
import ProgressStatus from './ProgressStatus';

interface ProgressItemProps {
  value: BodyPart;
}
export default function BodyPartProgressItem({ value }: ProgressItemProps) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const navigation = useNavigation<PurificationStackNavigationProp>();

  const cleaningCount = value.cleaning ? value.cleaning.length - 1 : 0;
  const lastCleaning = value.cleaning?.at(cleaningCount);
  const cleaningCompleted = lastCleaning
    ? lastCleaning.day === PURIFICATION_MAX_DAYS && lastCleaning.errors.length === 0
    : false;

  const enlightenmentCount = value.enlightenment ? value.enlightenment.length - 1 : 0;
  const lastEnlightenment = value.enlightenment?.at(enlightenmentCount);
  const enlightenmentCompleted = lastEnlightenment
    ? lastEnlightenment.day === PURIFICATION_MAX_DAYS && lastEnlightenment.errors.length === 0
    : false;

  const fullyCompleted = cleaningCompleted && enlightenmentCompleted;

  const cleanPercent = lastCleaning ? percentage(lastCleaning.day, PURIFICATION_MAX_DAYS) / 100 : 0;
  const enlightPercent = lastEnlightenment ? percentage(lastEnlightenment.day, PURIFICATION_MAX_DAYS) / 100 : 0;

  const globalPercentage = (cleanPercent + enlightPercent) / 2;

  function handlePress() {
    navigation.navigate('BodyPartProgress', { value });
  }

  return (
    <Pressable onPress={handlePress}>
      <VStack>
        <HStack
          spacing={10}
          style={{
            ...styles.chip,
            paddingHorizontal: arabic ? 17 : 7,
            borderRightWidth: fullyCompleted && arabic ? 10 : 0,
            borderLeftWidth: fullyCompleted && !arabic ? 10 : 0,
            borderBottomLeftRadius: fullyCompleted ? 15 : 0,
            borderBottomRightRadius: fullyCompleted ? 15 : 0,
            minWidth: 180,
            borderColor: 'green',
          }}
        >
          <VStack style={{ justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 10 }}>
            <Avatar size={55} image={findPartProps(value.name)} />
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
          <VStack spacing={5} style={{ marginHorizontal: 10 }}>
            <Text variant="body1" style={{ ...styles.partName, fontSize: arabic ? 17 : 13 }}>
              {formatMessage(`purification.body-parts.${value.name}`)}
            </Text>
            <HStack spacing={8}>
              <VStack spacing={1} style={{ alignItems: 'flex-start' }}>
                <Box>
                  <ProgressStatus
                    title={formatMessage(TKeys.BUTTON_CLEANING)}
                    last={lastCleaning}
                    count={cleaningCount}
                    completed={cleaningCompleted}
                  />
                </Box>
                <Box>
                  <ProgressStatus
                    title={formatMessage(TKeys.BUTTON_ENLIGHTENMENT)}
                    last={lastEnlightenment}
                    count={enlightenmentCount}
                    completed={enlightenmentCompleted}
                  />
                </Box>
              </VStack>
              {fullyCompleted && (
                <Box mt={8}>
                  <Icon name="hand-clap" size={25} color="green" style={{ opacity: 0.7 }} />
                </Box>
              )}
            </HStack>
          </VStack>
        </HStack>
        {!fullyCompleted && <ProgressBar progress={globalPercentage} color={MD3Colors.primary70} />}
      </VStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 75,
    backgroundColor: '#fff',
    marginBottom: 5,
    paddingVertical: 4,
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
