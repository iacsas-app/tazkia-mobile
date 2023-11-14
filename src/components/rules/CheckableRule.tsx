import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, HStack, Pressable } from '@react-native-material/core';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useApplication } from '../../hooks/use-application';
import Text from '../Text';
import { RuleStyles } from './Styles';
import { RuleBaseProps } from './types';

interface RuleProps extends RuleBaseProps {
  onSelect: (id: number) => void;
  onUnselect: (id: number) => void;
}

export default function CheckableRule({ id, item, ...props }: RuleProps) {
  const [checked, setChecked] = useState(false);
  const { arabic } = useApplication();
  const { width } = useWindowDimensions();

  const paddingRight = arabic ? 50 : 15;
  const paddingLeft = arabic ? 15 : 50;

  function handlePress() {
    checked ? props.onUnselect(id) : props.onSelect(id);
    setChecked(!checked);
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{
        ...RuleStyles.pressable,
        backgroundColor: checked ? '#ffb6c1' : 'white',
      }}
    >
      <HStack spacing={10} style={{ ...RuleStyles.stack, paddingLeft, paddingRight }}>
        <Avatar
          label={
            checked ? undefined : (
              <Text variant="titleLarge" color="white">
                {id}
              </Text>
            )
          }
          size={25}
          color={checked ? 'error' : '#228b22'}
          tintColor="white"
          icon={(props) => <Icon name="check-bold" {...props} />}
        />
        <Text variant="bodyLarge" style={{ ...RuleStyles.text, fontSize: arabic ? 13 : 12 }}>
          {item}
        </Text>
      </HStack>
    </Pressable>
  );
}
