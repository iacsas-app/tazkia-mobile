import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, Box, HStack, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet } from 'react-native';
import Text from '../../../../../components/Text';
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

  function handlePress() {
    navigation.navigate('BodyPartProgress', { value });
  }

  return (
    <Pressable onPress={handlePress}>
      <HStack
        spacing={7}
        style={{
          ...styles.chip,
          paddingHorizontal: arabic ? 17 : 7,
          borderRightWidth: fullyCompleted && arabic ? 10 : 0,
          borderLeftWidth: fullyCompleted && !arabic ? 10 : 0,
          minWidth: 160,
          borderColor: 'green',
        }}
        reverse={arabic}
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
        <VStack spacing={5} style={{ alignItems: 'stretch' }}>
          <Box>
            <Text variant="body1" style={{ ...styles.partName, fontSize: arabic ? 16 : 13 }}>
              {formatMessage(`purification.body-parts.${value.name}`)}
            </Text>
          </Box>
          <HStack spacing={8} reverse={arabic}>
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 75,
    backgroundColor: '#fff',
    marginBottom: 5,
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
