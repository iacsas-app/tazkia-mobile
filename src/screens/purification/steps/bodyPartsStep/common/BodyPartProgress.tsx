import { ListItem, Text, VStack } from '@react-native-material/core';
import { StyleSheet, View } from 'react-native';
import ProgressLine from '../../../../../domains/common/ProgressLine';

interface BodyPartProgressProps {
  lines: ProgressLine[];
}
export default function BodyPartProgress({ lines }: BodyPartProgressProps) {
  return (
    <View style={styles.container}>
      <Text variant="h6" style={styles.title}>
        Vous avez déjà démarré cette étape
      </Text>
      <VStack spacing={10} style={{ width: 300 }}>
        {lines.map((line: ProgressLine, index: number) => (
          <ListItem key={index} title={line.day.toString()} disabled />
        ))}
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 100 },
  title: { marginBottom: 15, color: 'green' },
});
