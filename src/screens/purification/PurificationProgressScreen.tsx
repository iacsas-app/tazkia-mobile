import { Flex } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { PurificationParamList, PurificationStackNavigationProp } from '../../navigation/types';
import { useStoreState } from '../../stores/hooks';
import BodyPartsProgress from './steps/bodyPartsStep/progress/BodyPartsProgress';
import MindProgress from './steps/mindStep/progress/MindProgress';
import SoulProgress from './steps/soulStep/progress/SoulProgress';

export default function PurificationProgressScreen() {
  const navigation = useNavigation<PurificationStackNavigationProp>();
  const purification = useStoreState((state) => state.purification.item);

  function handleAdd(route: keyof PurificationParamList) {
    navigation.navigate(route as any);
  }

  if (!purification) {
    return <></>;
  }

  purification.mind = [];
  purification.soul = [];

  return (
    <Flex fill style={styles.container}>
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
