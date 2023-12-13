import { Image, StyleSheet } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Screen';
import { TKeys } from '../../locales/constants';
import PresentationLayout from './common/PresentationLayout';

/**
 * Manhaj
 * @returns
 */
export default function ApproachScreen() {
  return (
    <PresentationLayout
      source={require('./../../../assets/img/presentation/manhaj2.jpg')}
      title={TKeys.PRESENTATION_APPROACH_TITLE}
      description={TKeys.PRESENTATION_APPROACH}
    >
      <Image source={require('./../../../assets/img/presentation/manhajTargets.jpg')} style={styles.manhaj} />
    </PresentationLayout>
  );
}

const styles = StyleSheet.create({
  manhaj: { width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 260, marginTop: 10 },
});
