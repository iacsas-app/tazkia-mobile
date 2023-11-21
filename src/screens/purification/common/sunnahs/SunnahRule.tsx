import VStack from '../../../../components/stack/VStack';
import { TKeys } from '../../../../locales/constants';
import SunnahRuleTypes from './SunnahRuleTypes';

interface Props {
  verbals: string[];
  actionals: string[];
  hasProgress: boolean;
}
export default function SunnahRule({ verbals, actionals, ...props }: Props) {
  return (
    <VStack spacing={15}>
      <SunnahRuleTypes type={TKeys.SUNNAHS_TYPE_VERBAL} items={verbals} showType={actionals.length > 0} {...props} />
      <SunnahRuleTypes type={TKeys.SUNNAHS_TYPE_ACTIONAL} items={actionals} showType={verbals.length > 0} {...props} />
    </VStack>
  );
}
