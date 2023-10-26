import { Avatar } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { Part } from '../../components/PressableStep';
import Text from '../../components/Text';
import { useMessage } from '../../hooks/use-message';
import { PurificationParamList, PurificationStackNavigationProp } from '../../navigation/types';
import { capitalize } from '../../services/Helpers';
import { useStoreState } from '../../stores/hooks';
import { purificationStages } from './common/Helper';
import BodyPartsProgress from './steps/bodyPartsStep/progress/BodyPartsProgress';
import MindProgress from './steps/mindStep/progress/MindProgress';
import SoulProgress from './steps/soulStep/progress/SoulProgress';

export default function PurificationProgressScreen() {
  const { formatMessage } = useMessage();
  const [index, setIndex] = useState(0);
  const navigation = useNavigation<PurificationStackNavigationProp>();
  const purification = useStoreState((state) => state.purification.item);

  const parts: Part[] = useMemo(() => purificationStages, []);

  function handleAdd(route: keyof PurificationParamList) {
    navigation.navigate(capitalize(route) as any);
  }

  function image(key: string) {
    const part = parts.find((stage) => stage.route.toLowerCase() === key.toLowerCase());
    return part ? part.imageSource : undefined;
  }

  if (!purification) {
    return <></>;
  }

  const routes = useMemo(() => parts.map((item) => ({ key: item.route, title: item.name })), []);

  const renderScene = BottomNavigation.SceneMap({
    BodyParts: () => <BodyPartsProgress items={purification.bodyParts} onAdd={handleAdd} />,
    Mind: () => <MindProgress items={purification.mind} onAdd={handleAdd} />,
    Soul: () => <SoulProgress items={purification.soul} onAdd={handleAdd} />,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      renderScene={renderScene}
      activeColor="blue"
      barStyle={{
        backgroundColor: '#c5d6f1',
        borderTopWidth: 2,
        borderColor: '#97bcf5',
      }}
      renderLabel={({ route, color }) => (
        <Text
          variant="caption"
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            fontWeight: '900',
            paddingTop: 2,
            bottom: -10,
            color,
          }}
        >
          {formatMessage(route.title ? route.title : '')}
        </Text>
      )}
      renderIcon={({ route }) => <Avatar image={image(route.key)} size={50} style={{ marginTop: -10 }} />}
      onIndexChange={setIndex}
    />
  );
}
