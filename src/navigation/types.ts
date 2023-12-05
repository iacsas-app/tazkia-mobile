import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BodyPart, { BodyPartType, PurificationStage } from '../domains/purification/BodyPart';
import { ImmunizationPeriod } from '../screens/invocations/immunization/data';

export type TabParamList = {
  HomeTab: undefined;
  PurificationTab: undefined;
  InvocationsTab: undefined;
};

export type PresentationParamList = {
  Presentation: undefined;
  Center: undefined;
  Cheikh: undefined;
  Approach: undefined;
  Books: undefined;
};

export type PurificationParamList = {
  Purification: undefined;
  BodyParts: undefined;
  BodyPartsRules: { part: BodyPartType; step: PurificationStage };
  BodyPartProgress: { value: BodyPart };
  Mind: undefined;
  Soul: undefined;
};

export type SunnahsParamList = {
  Sunnahs: { rule: string | undefined };
  Habits: undefined;
  Worship: undefined;
  Truths: undefined;
};

export type InvocationsParamList = {
  Invocations: undefined;
  Immunization: { period: ImmunizationPeriod };
  Jewels: undefined;
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

export type BodyPartsRulesNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PurificationParamList, 'BodyPartsRules'>,
  BottomTabNavigationProp<TabParamList>
>;

export type BodyPartProgressNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PurificationParamList, 'BodyPartProgress'>,
  BottomTabNavigationProp<TabParamList>
>;

export type SunnahsStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SunnahsParamList, 'Sunnahs'>,
  BottomTabNavigationProp<TabParamList>
>;

// Route props
export type BodyPartsRulesScreenRouteProp = RouteProp<PurificationParamList, 'BodyPartsRules'>;
export type BodyPartProgressScreenRouteProp = RouteProp<PurificationParamList, 'BodyPartProgress'>;
export type SunnahsScreenRouteProp = RouteProp<SunnahsParamList, 'Sunnahs'>;
export type InvocationsScreenRouteProp = RouteProp<InvocationsParamList, 'Immunization'>;
