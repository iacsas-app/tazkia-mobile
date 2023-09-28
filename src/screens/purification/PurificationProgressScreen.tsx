import { Avatar, Button, Chip, Flex, HStack, Text, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import ProgressContainer from '../../components/progress/ProgressContainer';
import BodyPart from '../../domains/purification/BodyPart';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import { PurificationParamList, PurificationStackNavigationProp } from '../../navigation/types';
import { useStoreActions, useStoreState } from '../../stores/hooks';
import { findPartProps } from './steps/bodyPartsStep/common/Helper';

export default function PurificationProgressScreen() {
  const { formatMessage } = useMessage();
  const navigation = useNavigation<PurificationStackNavigationProp>();
  const purification = useStoreState((state) => state.purification.item);
  const reset = useStoreActions((state) => state.purification.reset);

  function handleAddAction(route: keyof PurificationParamList) {
    navigation.navigate(route as any);
  }

  if (!purification) {
    return <></>;
  }

  purification.mind = [{ level: 1, progress: [] }];
  purification.soul = [{ part: 1, partProgress: [] }];

  return (
    <Flex fill style={styles.container}>
      <HStack spacing={10}>
        <Text variant="h5">My purification progress</Text>
        <Button title="Reset" onPress={() => reset()} />
      </HStack>
      {purification.bodyParts.length !== 0 && (
        <ProgressContainer
          title={formatMessage(TKeys.PURIFICATION_BODYPART_TITLE)}
          subtitle={formatMessage(TKeys.STEP_1)}
          onAdd={() => handleAddAction('BodyParts')}
        >
          <HStack spacing={10}>
            <VStack spacing={9}>
              {purification.bodyParts.map((item: BodyPart, index: number) => (
                <Chip
                  key={index}
                  variant="filled"
                  style={styles.chip}
                  label={
                    <VStack>
                      <Text variant="body1" style={styles.partName}>
                        {formatMessage(`purification.body-parts.${item.name}`)}
                      </Text>
                      {item.purification && <Text variant="caption">{formatMessage(TKeys.BUTTON_PURIFICATION)}</Text>}
                      {item.illumination && <Text variant="caption">{formatMessage(TKeys.BUTTON_ILLUMINATION)}</Text>}
                    </VStack>
                  }
                  leading={() => (
                    <HStack>
                      <Avatar style={styles.chipIcon} size={40} image={findPartProps(item.name)} />

                      <Avatar
                        label={<Text variant="caption">{index + 1}</Text>}
                        size={20}
                        color="white"
                        style={styles.number}
                      />
                    </HStack>
                  )}
                />
              ))}
            </VStack>
          </HStack>
        </ProgressContainer>
      )}
      {purification.mind.length !== 0 && (
        <ProgressContainer
          title={formatMessage(TKeys.PURIFICATION_MIND_TITLE)}
          subtitle={formatMessage(TKeys.STEP_2)}
          onAdd={() => handleAddAction('Mind')}
        >
          {purification.mind.map((item, index: number) => (
            <Chip key={index} variant="outlined" label={<Text>{item.level}</Text>} />
          ))}
        </ProgressContainer>
      )}
      {purification.soul.length !== 0 && (
        <ProgressContainer
          title={formatMessage(TKeys.PURIFICATION_SOUL_TITLE)}
          subtitle={formatMessage(TKeys.STEP_3)}
          onAdd={() => handleAddAction('Soul')}
        >
          {purification.soul.map((item, index: number) => (
            <Chip key={index} variant="outlined" label={<Text>{item.part}</Text>} />
          ))}
        </ProgressContainer>
      )}
    </Flex>
  );
}

const styles = StyleSheet.create({
  container: {
    marginStart: 20,
    paddingTop: 15,
    marginHorizontal: 15,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 18,
    borderRadius: 25,
    borderCurve: 'circular',
    borderLeftWidth: 2,
    borderRightWidth: 8,
    borderRightColor: '#87ceeb',
    borderLeftColor: '#87ceeb',
  },
  chipIcon: {
    marginRight: 10,
  },
  partName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  number: { marginLeft: -22, opacity: 0.8 },
});
