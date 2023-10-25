import { TKeys } from '../../locales/constants';
import PresentationLayout from './common/PresentationLayout';

export default function CenterScreen() {
  return (
    <PresentationLayout
      source={require('./../../../assets/img/presentation/center.jpg')}
      title={TKeys.PRESENTATION_CENTER_TITLE}
      description={TKeys.PRESENTATION_CENTER}
    />
  );
}
