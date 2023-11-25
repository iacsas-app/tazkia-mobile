import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import Text from '../../../components/Text';
import HStack from '../../../components/stack/HStack';
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
  const { formatMessage, formatNumber } = useMessage();

  return (
    <List.Accordion
      id={props.id}
      title={formatMessage(props.titleKey)}
      left={() => <Avatar.Text size={28} label={formatNumber(props.id)} color="#191970" style={styles.id} />}
      right={({ isExpanded }) => (
        <HStack style={{ ...GlobalStyles.center, marginRight: -15 }} spacing={5}>
          <Text variant="labelMedium" style={{ fontWeight: isExpanded ? '900' : '700', fontSize: 13 }} color="#2da77c">
            {formatMessage(props.duration <= 10 ? TKeys.DURATION2 : TKeys.DURATION, {
              value: formatNumber(props.duration),
            })}
          </Text>
          <Icon name={`chevron-${isExpanded ? 'up' : 'down'}`} size={25} color="black" />
        </HStack>
      )}
      titleStyle={styles.titleStyle}
      style={{ width: SCREEN_WIDTH, elevation: 1, backgroundColor: '#f1fffa', marginBottom: 2 }}
    >
      <List.Section style={styles.section}>{props.children}</List.Section>
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  id: { left: 10, position: 'absolute', backgroundColor: '#64e7b8', alignSelf: 'center' },
  titleStyle: {
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 45,
  },
  section: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    paddingVertical: 15,
    marginTop: -2,
    ...GlobalStyles.center,
  },
});
