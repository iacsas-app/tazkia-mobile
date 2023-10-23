import { useNavigation } from '@react-navigation/native';
import ScrollViewLayout from '../../components/layout/ScrollViewLayout';
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

  return (
    <ScrollViewLayout>
      <BodyPartsProgress items={purification.bodyParts} onAdd={handleAdd} />
      <MindProgress items={purification.mind} onAdd={handleAdd} />
      <SoulProgress items={purification.soul} onAdd={handleAdd} />
    </ScrollViewLayout>
  );
}
