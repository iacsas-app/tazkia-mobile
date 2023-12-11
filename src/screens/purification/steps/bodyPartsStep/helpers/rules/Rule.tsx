import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Checkbox, Divider, TouchableRipple } from 'react-native-paper';
import Text from '../../../../../../components/Text';
import HStack from '../../../../../../components/stack/HStack';
import { Color } from '../../../../../../constants/Color';
import { SCREEN_WIDTH } from '../../../../../../constants/Screen';
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
  const [checked, setChecked] = useState<boolean>(false);
  const isEvaluateMode = mode === 'evaluate';
  const space = isEvaluateMode ? 1 : 4;

  function handlePress() {
    const value = !checked;
    setChecked(value);
    props.onClick(id, value);
  }

  return (
    <TouchableRipple
      onPress={handlePress}
      disabled={!isEvaluateMode}
      style={{ backgroundColor: checked ? '#efb6b05c' : Color.backgroundColor }}
    >
      <View style={{ ...styles.touchable, paddingVertical: space }}>
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
                width: SCREEN_WIDTH - (isEvaluateMode ? 135 : 110),
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
        {!props.isLast && <Divider style={{ marginTop: space }} />}
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  touchable: { alignContent: 'flex-start' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
});
