import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Checkbox, Divider, TouchableRipple } from 'react-native-paper';
import Text from '../../../../../../components/Text';
import HStack from '../../../../../../components/stack/HStack';
import { SCREEN_WIDTH } from '../../../../../../constants/Screen';
import { useApplication } from '../../../../../../hooks/use-application';
import GlobalStyles from '../../../../../../styles/GlobalStyles';
import { ShowingMode } from './RulesDialog';

type Props = {
  mode: ShowingMode;
  id: number;
  item: string;
  isLast?: boolean;
  onClick(id: number, checked: boolean): void;
};
export default function Rule({ mode, id, item, ...props }: Props) {
  const { arabic } = useApplication();
  const [checked, setChecked] = useState<boolean>(false);
  const isEvaluateMode = mode === 'evaluate';

  function handlePress() {
    const value = !checked;
    setChecked(value);
    props.onClick(id, value);
  }

  return (
    <TouchableRipple
      onPress={handlePress}
      disabled={!isEvaluateMode}
      style={{ backgroundColor: checked ? '#efb6b05c' : 'transparent' }}
    >
      <View>
        <View style={styles.row}>
          <HStack spacing={10} style={GlobalStyles.center}>
            <Avatar.Text
              label={id.toString()}
              size={18}
              labelStyle={{ color: 'white' }}
              style={{ backgroundColor: checked ? '#c54235' : 'seagreen' }}
            />
            <Text
              variant="bodySmall"
              style={{
                fontSize: arabic ? 14 : 12,
                width: SCREEN_WIDTH - (isEvaluateMode ? 135 : 110),
                paddingTop: 2,
                fontWeight: '600',
              }}
            >
              {item}
            </Text>
          </HStack>
          {isEvaluateMode && (
            <View pointerEvents="none">
              <Checkbox status={checked ? 'checked' : 'unchecked'} color="orangered" />
            </View>
          )}
        </View>
        {!props.isLast && (
          <Divider style={{ marginTop: isEvaluateMode ? 0 : 5, marginHorizontal: isEvaluateMode ? 0 : 28 }} />
        )}
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});
