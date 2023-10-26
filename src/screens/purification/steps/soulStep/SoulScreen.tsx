import { useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { List } from 'react-native-paper';
import Text from '../../../../components/Text';
import ScrollViewLayout from '../../../../components/layout/ScrollViewLayout';
import { useMessage } from '../../../../hooks/use-message';
import { TKeys } from '../../../../locales/constants';
import PurificationPrezLayout from '../../common/PurificationPrezLayout';
import { soulRules } from './data';

type State = string | number | undefined;

export default function SoulScreen() {
  const { formatMessage } = useMessage();
  const { width } = useWindowDimensions();
  const [expandedId, setExpandedId] = useState<State>(undefined);
  const items: [string, TKeys[]][] = useMemo(() => Object.entries(soulRules), []);

  const _onAccordionPress = (newExpandedId: string | number) =>
    expandedId === newExpandedId ? setExpandedId(undefined) : setExpandedId(newExpandedId);

  return (
    <ScrollViewLayout>
      <PurificationPrezLayout summary={TKeys.PURIFICATION_SOUL_SUMMARY} body={TKeys.PURIFICATION_SOUL_INTRODUCTION} />

      {items.map(([part, levels]) => (
        <List.AccordionGroup key={part} expandedId={expandedId} onAccordionPress={_onAccordionPress}>
          <List.Section
            title={formatMessage(`purification.soul.${part}.title`)}
            style={{ width: width }}
            titleStyle={{ fontSize: 20, fontWeight: '900', color: 'blue' }}
          >
            {levels.map((level, index) => (
              <List.Accordion
                key={`${part}_${index}`}
                title={formatMessage(TKeys.LEVEL, { value: index + 1 })}
                titleStyle={{ fontWeight: '700', fontSize: 17 }}
                id={part}
              >
                <List.Section title={''} style={{ width: width - 10, paddingHorizontal: 15 }}>
                  <Text style={{ textAlign: 'justify', fontSize: 17 }}>{formatMessage(level)}</Text>
                </List.Section>
              </List.Accordion>
            ))}
          </List.Section>
        </List.AccordionGroup>
      ))}
    </ScrollViewLayout>
  );
}
