import { useMemo, useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Text from '../../../components/Text';
import { useMessage } from '../../../hooks/use-message';
import Step1Screen from './steps/Step1Screen';
import Step2Screen from './steps/Step2Screen';
import Step3Screen from './steps/Step3Screen';

export default function PurificationInvocationsScreen() {
  const { formatMessage } = useMessage();
  const [index, setIndex] = useState(0);

  const routes = useMemo(
    () => [
      { key: 'step1', title: 'phase1', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
      { key: 'step2', title: 'phase2', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
      { key: 'step3', title: 'phase3', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    ],
    [],
  );

  const renderScene = BottomNavigation.SceneMap({
    step1: () => <Step1Screen />,
    step2: () => <Step2Screen />,
    step3: () => <Step3Screen />,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      renderScene={renderScene}
      activeColor="#ff6347"
      barStyle={{
        backgroundColor: '#f3ead0',
        borderTopWidth: 2,
        borderColor: '#f5e1a5',
      }}
      renderLabel={({ route, color }) => (
        <Text
          variant="caption"
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            fontWeight: '900',
            color,
          }}
        >
          {formatMessage(route.title ? route.title : '')}
        </Text>
      )}
      onIndexChange={setIndex}
    />
  );
}
