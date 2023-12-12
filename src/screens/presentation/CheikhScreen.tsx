import { TKeys } from '../../locales/constants';

import React from 'react';

import PresentationLayout from './common/PresentationLayout';

export default function CheikhScreen() {
  return (
    <PresentationLayout
      source={require('./../../../assets/img/presentation/cheikh.jpg')}
      title={TKeys.PRESENTATION_CHEIKH_TITLE}
      description={TKeys.PRESENTATION_CHEIKH}
    />
  );
}
