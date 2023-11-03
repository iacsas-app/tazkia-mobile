import { Box, Stack, VStack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Text from '../../components/Text';
import { useMessage } from '../../hooks/use-message';
import { TKeys } from '../../locales/constants';
import GlobalStyles from '../../styles/GlobalStyles';
import BasePresentationLayout from '../presentation/common/BasePresentationLayout';

export default function InvocationsScreen() {
  const { formatMessage } = useMessage();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const [showModal, setShowModal] = useState(false);

  const parts = useMemo(
    () => [
      {
        route: 'Purification',
        name: TKeys.INVOCATION_PURIFICATION_TITLE,
      },
      {
        route: 'Immunization',
        name: TKeys.INVOCATION_IMMUNIZATION_TITLE,
      },
      {
        route: 'Jewels',
        name: TKeys.INVOCATION_JEWELS_TITLE,
      },
    ],
    [],
  );

  function handlePress(route: string) {
    navigation.navigate(route);
  }

  return (
    <BasePresentationLayout>
      <VStack spacing={2} style={{ alignItems: 'center' }}>
        <VStack>
          <Text
            style={{
              paddingVertical: 10,
              fontSize: 15,
              fontWeight: '900',
              textAlign: 'justify',
            }}
          >
            {formatMessage(TKeys.BASMALAH)}
          </Text>
        </VStack>
        <Stack style={GlobalStyles.container} items="center" spacing={15} mt={13}>
          {parts.map((item, index: number) => (
            <Box
              key={index}
              style={{ ...styles.part, width: width - 120 }}
              onTouchStart={() => handlePress(item.route)}
            >
              <Text variant="body1" style={{ fontSize: 18, fontWeight: '800' }}>
                {formatMessage(item.name)}
              </Text>
            </Box>
          ))}
        </Stack>
      </VStack>
    </BasePresentationLayout>
  );
}

const styles = StyleSheet.create({
  part: {
    backgroundColor: '#f3ead0',
    elevation: 6,
    borderRadius: 45,
    paddingVertical: 10,
    minHeight: 90,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'justify',
    alignItems: 'center',
  },
});
