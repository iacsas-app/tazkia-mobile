import { Button, Flex, HStack, Text } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useMessage } from '../../hooks/use-message';
import { PurificationParamList, PurificationStackNavigationProp } from '../../navigation/types';
import { useStoreActions, useStoreState } from '../../stores/hooks';
import BodyPartsProgress from './steps/bodyPartsStep/progress/bodyParts/BodyPartsProgress';
import MindProgress from './steps/bodyPartsStep/progress/mind/MindProgress';
import SoulProgress from './steps/bodyPartsStep/progress/soul/SoulProgress';

export default function PurificationProgressScreen() {
  const { formatMessage } = useMessage();
  const navigation = useNavigation<PurificationStackNavigationProp>();
  const purification = useStoreState((state) => state.purification.item);
  const reset = useStoreActions((state) => state.purification.reset);

  function handleAdd(route: keyof PurificationParamList) {
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
        <Text variant="h5">D</Text>
        <Button title="Reset" onPress={() => reset()} />
      </HStack>
      <BodyPartsProgress items={purification.bodyParts} onAdd={handleAdd} />
      <MindProgress items={purification.mind} onAdd={handleAdd} />
      <SoulProgress items={purification.soul} onAdd={handleAdd} />
    </Flex>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingTop: 15,
    marginHorizontal: 10,
  },
});
