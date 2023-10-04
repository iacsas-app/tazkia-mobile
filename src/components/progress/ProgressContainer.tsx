import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import OctIcon from '@expo/vector-icons/Octicons';

import { Box, HStack, IconButton, Text } from '@react-native-material/core';
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
  const { arabic } = useApplication();
  const [collapse, setCollapse] = useState(props.collapse);
  const color = variant === 'orange' ? styles.orange : variant === 'blue' ? styles.blue : styles.green;
  const bgColor =
    variant === 'orange' ? styles.orange_content : variant === 'blue' ? styles.blue_content : styles.green_content;

  function handleCollapse() {
    setCollapse(!collapse);
  }

  return (
    <Box style={styles.container}>
      <Box h={50} style={{ ...styles.titleBox, ...color }}>
        <HStack justify="between" reverse={arabic}>
          <Box>
            <Text variant="body1" style={styles.title}>
              {title}
            </Text>
            <Text variant="caption" style={styles.subtitle}>
              {subtitle}
            </Text>
          </Box>
          <HStack reverse={arabic}>
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
      {!collapse && <Box style={{ ...styles.content, ...bgColor }}>{children}</Box>}
    </Box>
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
    elevation: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    marginTop: -3,
  },
  plusButton: { marginTop: -6, marginHorizontal: -10 },
  content: {
    ...GlobalStyles.center,
    paddingVertical: 10,
    elevation: 1,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    borderBottomWidth: 0.1,
  },
  orange: {
    backgroundColor: '#ffe4e1',
    borderBottomColor: '#f4a460',
  },
  orange_content: {
    backgroundColor: '#fdf6e778',
  },
  blue: {
    backgroundColor: '#87ceeb',
    borderBottomColor: '#4682b4',
  },
  blue_content: {
    backgroundColor: '#d5ecf37a',
  },
  green: {
    backgroundColor: '#98fb98',
    borderBottomColor: '#3cb371',
  },
  green_content: {
    backgroundColor: '#d5f3e378',
  },
});
