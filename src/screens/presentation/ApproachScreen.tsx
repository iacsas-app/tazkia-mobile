import { TKeys } from '../../locales/constants';

import PresentationLayout from './common/PresentationLayout';

/**
 * Manhaj
 * @returns
 */
export default function ApproachScreen() {
  return <PresentationLayout title={TKeys.PRESENTATION_APPROACH_TITLE} description={TKeys.PRESENTATION_APPROACH} />;
}
