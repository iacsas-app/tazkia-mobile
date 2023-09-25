import { Text, VStack } from '@react-native-material/core';
import { useMessage } from '../hooks/use-message';
import { TKeys } from '../locales/constants';

export default function Center() {
  const { formatMessage } = useMessage();

  return (
    <VStack spacing={20} style={{ padding: 20 }}>
      <Text variant="h5" style={{ fontWeight: 'bold' }}>
        {formatMessage(TKeys.PRESENTATION_CENTER)}
      </Text>
      <Text variant="body1" style={{ marginTop: 25 }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam quis eligendi commodi eaque fugiat fuga. Non
        voluptates doloribus repudiandae qui velit ipsam mollitia ex nam magni illum? Sit, dolores inventore. Lorem,
        ipsum dolor sit amet consectetur adipisicing elit.
      </Text>
      <Text variant="body1">
        Voluptatem at incidunt facilis fugit neque quis totam dolore cumque, deleniti, molestias dolores atque
        voluptatibus esse, provident et similique. Veniam, maxime natus.
      </Text>
      <Text variant="body1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt et neque officiis praesentium dignissimos
        error cupiditate ut provident quidem aperiam. Assumenda quasi tempore cupiditate numquam reprehenderit cumque
        quas unde blanditiis.
      </Text>
    </VStack>
  );
}
