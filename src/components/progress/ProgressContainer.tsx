import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import OctIcon from '@expo/vector-icons/Octicons';

import { Box, HStack, IconButton, Surface, Text } from '@react-native-material/core';
import { ReactNode, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useApplication } from '../../hooks/use-application';
import GlobalStyles from '../../styles/GlobalStyles';

type StyleVariant = 'orange' | 'blue' | 'green';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  disabled?: boolean;
  collapse?: boolean;
  variant?: StyleVariant;
  onAdd: () => void;
}
export default function ProgressContainer({ title, subtitle, variant, children, disabled, ...props }: Props) {
  const { arabicOrientation } = useApplication();
  const [collapse, setCollapse] = useState(props.collapse);
  const color = variant === 'orange' ? styles.orange : variant === 'blue' ? styles.blue : styles.green;

  function handleCollapse() {
    setCollapse(!collapse);
  }

  return (
    <Surface elevation={4} style={styles.container}>
      <Box h={50} style={{ ...styles.titleBox, ...color }}>
        <HStack justify="between" reverse={arabicOrientation}>
          <Box>
            <Text variant="body1" style={styles.title}>
              {title}
            </Text>
            <Text variant="caption" style={styles.subtitle}>
              {subtitle}
            </Text>
          </Box>
          <HStack reverse={arabicOrientation}>
            {!disabled && (
              <IconButton
                style={styles.plusButton}
                icon={(_, ...props) => <Icon name="playlist-plus" size={28} {...props} />}
                onPressIn={props.onAdd}
              />
            )}
            <IconButton
              style={styles.plusButton}
              icon={(_, ...props) => <OctIcon name={collapse ? 'chevron-down' : 'chevron-up'} size={25} {...props} />}
              onPressIn={handleCollapse}
            />
          </HStack>
        </HStack>
      </Box>
      {!collapse && <Box style={styles.content}>{children}</Box>}
    </Surface>
  );
}

ProgressContainer.defaultProps = {
  variant: 'orange',
  collapse: false,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 13,
  },
  titleBox: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    marginTop: -3,
  },
  plusButton: { marginTop: -6, marginHorizontal: -10 },
  content: { ...GlobalStyles.center, paddingVertical: 10 },
  orange: {
    backgroundColor: '#ffe4e1',
    borderBottomColor: '#f4a460',
  },
  blue: {
    backgroundColor: '#87ceeb',
    borderBottomColor: '#4682b4',
  },
  green: {
    backgroundColor: '#98fb98',
    borderBottomColor: '#3cb371',
  },
});
