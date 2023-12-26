import { useMemo } from 'react';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import { useMessage } from '../../../hooks/use-message';
import { ImmunizationPeriod, immunizationData } from './data';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { TKeys } from '../../../locales/constants';

// interface Props {
//   period: ImmunizationPeriod;
// }

// export default function Immunization({ period }: Props) {
//   const { formatMessage } = useMessage();
//   const data: InvocationRepeat[] = useMemo(() => immunizationData[period], []);
//   const size = useMemo(() => data.length, []);
//   return (
//     <VStack spacing={12}>
//       {data.map((item: InvocationRepeat, index) => (
//         <Box key={index}>
//           <InvocationItem index={index + 1} summary={formatMessage(item.key)} total={size} {...item} />
//         </Box>
//       ))}
//     </VStack>
//   );
// }

interface ImmunizationProps {
  period: ImmunizationPeriod;
}

export default function Immunization({ period }: ImmunizationProps) {
  const { formatMessage } = useMessage();
  const data: InvocationRepeat[] = useMemo(() => immunizationData[period], []);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [repeatCount, setRepeatCount] = useState(data[selectedItemIndex]?.repeat);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (selectedItemIndex >= data.length) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
      setRepeatCount(data[selectedItemIndex]?.repeat);
    }
  }, [selectedItemIndex, data]);

  const selectedItem = data[selectedItemIndex];

  const nextItem = () => {
    if (repeatCount > 0) {
      setRepeatCount((prevCount) => prevCount - 1);
    } else {
      setSelectedItemIndex((prevIndex) => prevIndex + 1);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  function handlePress() {
    setRepeatCount(repeatCount - 1);
  }
  return (
    <TouchableRipple onPress={handlePress}>
      <View style={styles.container}>
        {/* Contenu de la page en arrière-plan */}

        {/* Votre contenu de page ici */}
        {/* ... */}

        {/* Popup */}
        <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.text}>{formatMessage(selectedItem?.key)}</Text>
              {/* <Text>Nombre: {repeatCount + 1}</Text> */}

              {repeatCount > 0 ? (
                <Animated.Text
                  style={{
                    // fontSize: 20,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    backgroundColor: '#92b8df',
                    borderRadius: 100,
                    paddingHorizontal: 10,
                    opacity: 0.6,
                  }}
                >
                  {formatMessage(repeatCount > 1 ? TKeys.TIMES_COUNT_PLURAL : TKeys.TIMES_COUNT, {
                    times: repeatCount,
                  })}
                </Animated.Text>
              ) : (
                <Icon name="check-all" color="green" size={20} />
              )}
            </View>
            <Button title="Suivant" onPress={nextItem} color="darkseagreen" />
            <Button title="Fermer" onPress={closeModal} color="darkseagreen" />
          </View>
        </Modal>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    fontSize: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'honeydew',
    borderWidth: 10,
    borderColor: 'darkseagreen',
    padding: 20,
    borderRadius: 10,
    elevation: 50,
  },
  text: {
    fontSize: 20,
    // marginTop: 22,
    fontWeight: '500',
    textAlign: 'justify',
  },
});
