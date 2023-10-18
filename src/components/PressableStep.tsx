import { Avatar, Pressable, Stack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { useApplication } from '../hooks/use-application';
import { useMessage } from '../hooks/use-message';
import { PurificationParamList, SunnahsParamList } from '../navigation/types';
import Text from './Text';

export interface Part {
  name: string;
  route: keyof PurificationParamList | keyof SunnahsParamList;
  description: string;
  imageSource: ImageSourcePropType;
}

interface Props {
  item: Part;
}
export default function PressableStep({ item }: Props) {
  const { formatMessage } = useMessage();
  const { arabic } = useApplication();
  const navigation = useNavigation<any>();

  function handlePress() {
    navigation.navigate(item.route as any);
  }

  return (
    <Pressable onPress={handlePress}>
      <Stack spacing={1} style={styles.container}>
        <Avatar image={item.imageSource} imageStyle={styles.img} size={90} />
        <Text variant="body1" style={{ fontSize: arabic ? 17 : 13 }}>
          {formatMessage(item.name)}
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: arabic ? 19 : 14, justifyContent: 'center', textAlign: 'center' }}>
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
