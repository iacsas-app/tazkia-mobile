import { HStack, Text, VStack } from '@react-native-material/core';
import { useMemo, useState } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { useApplication } from '../../../../hooks/use-application';
import { useMessage } from '../../../../hooks/use-message';
import { TKeys } from '../../../../locales/constants';
import { groupBy } from '../../../../services/Helpers';
import BodyPartItem from './common/BodyPartItem';
import BodyPartsDialog from './common/BodyPartsDialog';

export type PartItem = {
  partId: number;
  line: number;
  nameKey: string;
  imageSource: ImageSourcePropType;
};

const parts: PartItem[] = [
  {
    partId: 1,
    line: 1,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_EYES,
    imageSource: require('./../../../../../assets/img/purification/body-parts/eyes.jpg'),
  },
  {
    partId: 2,
    line: 1,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_HANDS,
    imageSource: require('./../../../../../assets/img/purification/body-parts/hands.jpg'),
  },
  {
    partId: 3,
    line: 2,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_TONGUE,
    imageSource: require('./../../../../../assets/img/purification/body-parts/tongue.jpg'),
  },
  {
    partId: 4,
    line: 2,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_EAR,
    imageSource: require('./../../../../../assets/img/purification/body-parts/ears.jpg'),
  },
  {
    partId: 5,
    line: 3,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_BELLY,
    imageSource: require('./../../../../../assets/img/purification/body-parts/belly.png'),
  },
  {
    partId: 6,
    line: 3,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_FEET,
    imageSource: require('./../../../../../assets/img/purification/body-parts/feet.jpg'),
  },
  {
    partId: 7,
    line: 4,
    nameKey: TKeys.PURIFICATION_BODY_PARTS_PRIVATE_PARTS,
    imageSource: require('./../../../../../assets/img/purification/body-parts/private-parts.png'),
  },
];

export type PurificationMode = 'purification' | 'illumination';

interface State {
  showDetails: boolean;
  bodyPartId: number;
  mode: PurificationMode;
}

export default function BodyPartsPurificationScreen() {
  const { arabicOrientation } = useApplication();
  const { formatMessage } = useMessage();

  const initialState: State = { showDetails: false, bodyPartId: 0, mode: 'purification' };
  const [state, setState] = useState<State>(initialState);
  const partsByLine = useMemo(() => groupBy(parts, 'line'), []);

  function handleDetailsOpen(partId: number, mode: PurificationMode) {
    setState({ showDetails: true, bodyPartId: partId, mode: mode });
  }
  function handleDetailsClose() {
    setState(initialState);
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="body2" style={{ marginTop: 15, marginBottom: 25, paddingHorizontal: 18 }}>
        {formatMessage(TKeys.PURIFICATION_BODYPART_DESCRIPTION)}
      </Text>
      <VStack spacing={20} style={{ justifyContent: 'center', alignItems: 'center' }}>
        {Object.keys(partsByLine).map((key: string) => (
          <HStack spacing={15} key={key} reverse={arabicOrientation}>
            {partsByLine[key].map(({ line, ...props }: PartItem, index: number) => (
              <View key={`${key}_${index}_${line}`}>
                <BodyPartItem {...props} onDetailsOpen={handleDetailsOpen} />
              </View>
            ))}
          </HStack>
        ))}
      </VStack>
      <BodyPartsDialog
        open={state.showDetails}
        partId={state.bodyPartId}
        mode={state.mode}
        onClose={handleDetailsClose}
      />
    </View>
  );
}
