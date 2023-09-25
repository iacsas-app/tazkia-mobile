import { Avatar, Pressable, Stack, Text } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { useMessage } from '../../hooks/use-message';
import { TazkiaParamList, TazkiaStackNavigationProp } from '../../navigation/types';

export interface Part {
  name: string;
  route: keyof TazkiaParamList;
  description: string;
  imageSource: ImageSourcePropType;
}

interface Props {
  item: Part;
}
export default function PressablePart({ item }: Props) {
  const { formatMessage } = useMessage();
  const navigation = useNavigation<TazkiaStackNavigationProp>();

  function handlePress() {
    navigation.navigate(item.route);
  }

  return (
    <Pressable onPress={handlePress}>
      <Stack style={styles.container}>
        <Avatar image={item.imageSource} imageStyle={styles.img} size={120} />
        <Text variant="h6" style={{ fontWeight: 'bold' }}>
          {formatMessage(item.name)}
        </Text>
        <Text>{formatMessage(item.description)}</Text>
      </Stack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 70,
    backgroundColor: '#e7fbe8',
  },
  img: {
    width: 120,
    height: 120,
  },
});
