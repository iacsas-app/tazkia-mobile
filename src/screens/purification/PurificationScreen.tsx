import { Box, Stack } from '@react-native-material/core';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import PressableStep, { Part } from '../../components/PressableStep';
import { useApplication } from '../../hooks/use-application';
import GlobalStyles from '../../styles/GlobalStyles';
import PurificationProgressScreen from './PurificationProgressScreen';
import { purificationStages } from './common/Helper';

export default function PurificationScreen() {
  const { hasPurificationProgress } = useApplication();
  const parts: Part[] = useMemo(() => purificationStages, []);

  if (hasPurificationProgress) {
    return <PurificationProgressScreen />;
  }

  return (
    <Stack style={styles.container} items="center" spacing={25}>
      {parts.map((item: Part, index: number) => (
        <Box key={index} style={styles.part}>
          <PressableStep item={item} />
        </Box>
      ))}
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: { ...GlobalStyles.container },
  part: {
    width: 250,
    paddingVertical: 10,
    backgroundColor: '#cde7f7',
    borderRadius: 25,
    elevation: 6,
  },
});
