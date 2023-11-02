import { Box } from '@react-native-material/core';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { useApplication } from '../../hooks/use-application';
import GlobalStyles from '../../styles/GlobalStyles';
import Text from '../Text';
import ScrollViewLayout from '../layout/ScrollViewLayout';

type StyleVariant = 'orange' | 'blue' | 'green';

interface Props {
  title: string;
  children: ReactNode;
  subtitle?: string;
  variant?: StyleVariant;
  disableAdd?: boolean;
  fabLeft?: boolean;
  onAdd: () => void;
}
export default function ProgressContainer({ title, subtitle, variant, children, ...props }: Props) {
  const { arabic } = useApplication();
  const bgColor =
    variant === 'orange' ? styles.orange_content : variant === 'blue' ? styles.blue_content : styles.green_content;

  return (
    <View style={{ ...GlobalStyles.center, ...bgColor }}>
      <Box style={{ paddingBottom: 60 }}>
        <ScrollViewLayout>
          <Text variant="body1" style={{ ...styles.title, color: variant, fontSize: arabic ? 25 : 20 }}>
            {title}
          </Text>
          {children}
        </ScrollViewLayout>
      </Box>
      {!props.disableAdd && (
        <FAB
          icon="playlist-plus"
          style={{ ...styles.fab, backgroundColor: variant }}
          variant="tertiary"
          color="white"
          animated
          onPress={props.onAdd}
        />
      )}
    </View>
  );
}

ProgressContainer.defaultProps = {
  variant: 'orange',
  collapse: false,
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },

  content: {
    ...GlobalStyles.center,
    paddingVertical: 10,
    elevation: 1,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    borderBottomWidth: 0.1,
  },
  fab: {
    position: 'absolute',
    bottom: 10,
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
