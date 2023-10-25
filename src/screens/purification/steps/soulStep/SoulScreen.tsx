import { useState } from 'react';
import { List } from 'react-native-paper';
import ScrollViewLayout from '../../../../components/layout/ScrollViewLayout';
import { TKeys } from '../../../../locales/constants';
import PurificationPrezLayout from '../../common/PurificationPrezLayout';

type State = string | number | undefined;

export default function SoulScreen() {
  const [expandedId, setExpandedId] = useState<State>(undefined);

  const _onAccordionPress = (newExpandedId: string | number) =>
    expandedId === newExpandedId ? setExpandedId(undefined) : setExpandedId(newExpandedId);

  return (
    <ScrollViewLayout>
      <PurificationPrezLayout summary={TKeys.PURIFICATION_SOUL_SUMMARY} body={TKeys.PURIFICATION_SOUL_INTRODUCTION} />
      <List.AccordionGroup expandedId={expandedId} onAccordionPress={_onAccordionPress}>
        <List.Section title="التحقق من مقام التوبة">
          <List.Accordion left={(props) => <List.Icon {...props} icon="folder" />} title="المستوى 1" id="1">
            <List.Item title="List item 1" />
          </List.Accordion>
          <List.Accordion left={(props) => <List.Icon {...props} icon="folder" />} title="المستوى 2" id="2">
            <List.Item title="List item 2" />
          </List.Accordion>
          <List.Accordion left={(props) => <List.Icon {...props} icon="folder" />} title="المستوى 3" id="3">
            <List.Item title="List item" />
          </List.Accordion>
        </List.Section>
      </List.AccordionGroup>
    </ScrollViewLayout>
  );
}
