import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import Text from '../../../components/Text';
import HStack from '../../../components/stack/HStack';
import { Font } from '../../../constants/Font';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { useMessage } from '../../../hooks/use-message';
import { TKeys } from '../../../locales/constants';
import GlobalStyles from '../../../styles/GlobalStyles';

type Props = {
  id: number;
  titleKey: TKeys;
  children: ReactNode;
  duration: number;
};

export default function InvocationAccordion(props: Props) {
  const { formatMessage } = useMessage();

  return (
    <List.Accordion
      id={props.id}
      title={
        <Text variant="bodySmall" style={{ fontSize: Font.size(13), fontWeight: '800', color: 'teal' }}>
          {formatMessage(props.titleKey)}
        </Text>
      }
      left={() => <Avatar.Text size={20} label={props.id.toString()} color="white" style={styles.id} />}
      right={({ isExpanded }) => (
        <HStack style={{ ...GlobalStyles.center, marginRight: -15 }} spacing={5}>
          <Text
            variant="labelMedium"
            style={{ fontWeight: isExpanded ? '900' : '700', fontSize: Font.size(10), color: 'black' }}
          >
            {formatMessage(props.duration <= 10 ? TKeys.DURATION2 : TKeys.DURATION, {
              value: props.duration,
            })}
          </Text>
          <Icon name={`chevron-${isExpanded ? 'up' : 'down'}`} size={25} color="black" />
        </HStack>
      )}
      titleStyle={styles.titleStyle}
      style={{
        width: SCREEN_WIDTH,
        elevation: 1,
        backgroundColor: '#f1fffa',
        marginBottom: 2,
        paddingVertical: 2,
      }}
    >
      <List.Section style={styles.section}>{props.children}</List.Section>
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  id: { left: 10, position: 'absolute', backgroundColor: 'teal', alignSelf: 'center' },
  titleStyle: {
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 45,
  },
  section: {
    backgroundColor: '#fffafa',
    paddingVertical: 15,
    marginTop: -2,
    paddingEnd: 20,
  },
});
