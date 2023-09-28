import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BodyPartType } from '../domains/purification/BodyPart';
import { PurificationType } from '../screens/purification/steps/bodyPartsStep/BodyPartsScreen';

export type TabParamList = {
  HomeTab: undefined;
  PurificationTab: undefined;
  SunnahsTab: undefined;
  InvocationsTab: undefined;
};

export type PresentationParamList = {
  Presentation: undefined;
  Center: undefined;
  Cheikh: undefined;
  Approach: undefined;
};

export type PurificationParamList = {
  Purification: undefined;
  BodyParts: undefined;
  BodyPartsRules: { type: BodyPartType; mode: PurificationType };
  PurificationProgress: undefined;
  Mind: undefined;
  Soul: undefined;
};

export type SunnahsParamList = {
  Sunnahs: undefined;
  Habits: undefined;
  Practice: undefined;
  SpiritTravels: undefined;
};

// Navigation props
export type PresentationStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PresentationParamList, 'Presentation'>,
  BottomTabNavigationProp<TabParamList>
>;

export type PurificationStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PurificationParamList, 'Purification'>,
  BottomTabNavigationProp<TabParamList>
>;

export type BodyPartsRulesStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PurificationParamList, 'BodyPartsRules'>,
  BottomTabNavigationProp<TabParamList>
>;

export type SunnahsStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SunnahsParamList, 'Sunnahs'>,
  BottomTabNavigationProp<TabParamList>
>;

// Route props
export type BodyPartsRulesScreenRouteProp = RouteProp<PurificationParamList, 'BodyPartsRules'>;
