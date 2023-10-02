import { useRoute } from '@react-navigation/native';
import { BodyPartsRulesScreenRouteProp } from '../../../../../navigation/types';
import BodyPartsRules from './BodyPartRules';

export default function BodyPartsRulesScreen() {
  const { params } = useRoute<BodyPartsRulesScreenRouteProp>();

  return <BodyPartsRules part={params.part} step={params.step} />;
}
