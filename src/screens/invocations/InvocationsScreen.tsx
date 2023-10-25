import { useMemo, useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { Part } from '../../components/PressableStep';
import Text from '../../components/Text';
import { useMessage } from '../../hooks/use-message';
import { purificationStages } from '../purification/common/Helper';
import Step1Screen from './steps/Step1Screen';
import Step2Screen from './steps/Step2Screen';
import Step3Screen from './steps/Step3Screen';

export default function InvocationsScreen() {
  const { formatMessage } = useMessage();
  const [index, setIndex] = useState(0);

  const parts: Part[] = useMemo(() => purificationStages, []);

  function image(key: string) {
    const part = parts.find((stage) => stage.route.toLowerCase() === key.toLowerCase());
    return part ? part.imageSource : undefined;
  }

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
      activeColor="orange"
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
