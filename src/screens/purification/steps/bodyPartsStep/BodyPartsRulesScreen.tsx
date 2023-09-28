import { useRoute } from '@react-navigation/native';
import { BodyPartsRulesScreenRouteProp } from '../../../../navigation/types';
import BodyPartsRules from './common/BodyPartsRules';

export default function BodyPartsRulesScreen() {
  const { params } = useRoute<BodyPartsRulesScreenRouteProp>();

  return <BodyPartsRules part={params.type} mode={params.mode} />;
}
