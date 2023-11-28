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
              <Text>{formatMessage(selectedItem?.key)}</Text>
              {/* <Text>Nombre: {repeatCount + 1}</Text> */}

              {repeatCount > 0 ? (
                <Animated.Text
                  style={{
                    fontSize: 10,
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
            <Button title="Suivant" onPress={nextItem} />
            <Button title="Fermer" onPress={closeModal} />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'lightyellow',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  button: {
    margin: 20,
    padding: 20,
    backgroundColor: 'red', // Ajoutez cette ligne pour la couleur de fond du bouton
    borderRadius: 18, // Ajoutez cette ligne pour arrondir les coins du bouton
  },
});

{
  /* <TouchableRipple
  style={{
    elevation: 5,
    backgroundColor: count > 0 ? 'white' : '#d9e7df',
    borderRadius: 20,
    padding: 15,
  }}
  onPress={handlePress}
>
  <VStack spacing={25}>
    <Text variant="titleLarge" style={{ fontSize: 14, textAlign: 'justify', fontWeight: '500' }}>
      {summary}
    </Text>
    <View style={{ flexDirection: 'row' }}>
      <Text
        style={{
          fontSize: 10,
          position: 'absolute',
          right: 0,
          bottom: 0,
          backgroundColor: '#fff5ee',
          borderRadius: 100,
          paddingHorizontal: 5,
          opacity: 0.6,
        }}
      >{`${index}/${total}`}</Text>
      {count > 0 ? (
        <Animated.Text
          style={{
            fontSize: 10,
            position: 'absolute',
            left: 0,
            bottom: 0,
            backgroundColor: '#92b8df',
            borderRadius: 100,
            paddingHorizontal: 10,
            opacity: 0.6,
          }}
        >
          {formatMessage(count > 1 ? TKeys.TIMES_COUNT_PLURAL : TKeys.TIMES_COUNT, { times: count })}
        </Animated.Text>
      ) : (
        <Icon name="check-all" color="green" size={20} />
      )}
    </View>
  </VStack>
</TouchableRipple>; */
}
