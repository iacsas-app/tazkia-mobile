import { Avatar, Pressable, Stack, Text } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { useMessage } from '../../hooks/use-message';
import { PurificationParamList, PurificationStackNavigationProp } from '../../navigation/types';

export interface Part {
  name: string;
  route: keyof PurificationParamList;
  description: string;
  imageSource: ImageSourcePropType;
}

interface Props {
  item: Part;
}
export default function PressableStep({ item }: Props) {
  const { formatMessage } = useMessage();
  const navigation = useNavigation<PurificationStackNavigationProp>();

  function handlePress() {
    navigation.navigate(item.route as any);
  }

  return (
    <Pressable onPress={handlePress}>
      <Stack spacing={1} style={styles.container}>
        <Avatar image={item.imageSource} imageStyle={styles.img} size={90} />
        <Text variant="body1">{formatMessage(item.name)}</Text>
        <Text variant="h6" style={{ fontWeight: 'bold' }}>
          {formatMessage(item.description)}
        </Text>
      </Stack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  img: {
    width: 90,
    height: 90,
  },
});
