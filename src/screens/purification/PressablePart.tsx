import { Avatar, Pressable, Stack, Text } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { useMessage } from '../../hooks/use-message';
import { PurificationParamList, TazkiaStackNavigationProp } from '../../navigation/types';

export interface Part {
  name: string;
  route: keyof PurificationParamList;
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
        <Text variant="body1">{formatMessage(item.description)}</Text>
      </Stack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f5fffa',
  },
  img: {
    width: 120,
    height: 120,
  },
});
