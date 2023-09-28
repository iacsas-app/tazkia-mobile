import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Box, HStack, IconButton, Surface, Text } from '@react-native-material/core';
import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { useApplication } from '../../hooks/use-application';
import GlobalStyles from '../../styles/GlobalStyles';

interface ProgressContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onAdd: () => void;
}
export default function ProgressContainer({ title, subtitle, children, onAdd }: ProgressContainerProps) {
  const { arabicOrientation } = useApplication();

  return (
    <Surface elevation={4} style={styles.container}>
      <Box h={45} style={styles.titleBox}>
        <HStack justify="between" reverse={arabicOrientation}>
          <Box>
            <Text variant="body1" style={styles.title}>
              {title}
            </Text>
            <Text variant="caption" style={styles.subtitle}>
              {subtitle}
            </Text>
          </Box>
          <Box>
            <IconButton
              style={styles.plusButton}
              icon={() => <Icon name="plus-circle" size={32} color="#ff6347" />}
              onPressIn={onAdd}
            />
          </Box>
        </HStack>
      </Box>
      <Box style={styles.content}>{children}</Box>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
    marginHorizontal: 10,
  },
  titleBox: {
    paddingHorizontal: 15,
    paddingVertical: 3,
    backgroundColor: '#ffdead',
    borderBottomWidth: 6,
    borderBottomColor: '#ffe4e1',
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: -3,
  },
  plusButton: { marginTop: -6, marginHorizontal: -10 },
  content: { ...GlobalStyles.center, backgroundColor: '#fff5ee', paddingHorizontal: 10, paddingVertical: 10 },
});
