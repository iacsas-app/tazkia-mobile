import { Avatar, Box, HStack, Pressable, Surface, Text } from '@react-native-material/core';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

interface BodyPartItemProps {
  name: string;
}
export default function BodyPartItem({ name }: BodyPartItemProps) {
  const [showActions, setShowActions] = useState<boolean>(false);

  function handlePointerEnter() {
    console.log('pointerEnter');
    setShowActions(true);
  }

  return (
    <Surface elevation={6} category="medium" style={styles.container}>
      <Box h={80} w={170} style={{ backgroundColor: '#e0ffff', justifyContent: 'center', alignItems: 'center' }}>
        <Avatar
          size={50}
          style={{ marginTop: -18 }}
          image={require('./../../../../../assets/img/body-parts/private-parts.png')}
        />
        <Text variant="h6" style={{ fontWeight: 'bold', marginTop: 5 }}>
          {name}
        </Text>
      </Box>
      <Box h={50} w={170} style={{ backgroundColor: '#fffafa', justifyContent: 'center', alignItems: 'center' }}>
        <HStack spacing={5}>
          <Surface elevation={2} category="small" style={{ backgroundColor: '#f5fffa' }}>
            <Pressable style={{ padding: 5 }}>
              <Text variant="caption">Illumination</Text>
            </Pressable>
          </Surface>
          <Surface elevation={2} category="small" style={{ backgroundColor: '#f5fffa' }}>
            <Pressable style={{ padding: 5 }}>
              <Text variant="caption">Purification</Text>
            </Pressable>
          </Surface>
        </HStack>
      </Box>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: { width: 170, height: 130, justifyContent: 'center', alignItems: 'center' },
});
