import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BodyPartType, PurificationStage } from '../domains/purification/BodyPart';
import { ImmunizationPeriod } from '../screens/invocations/immunization/data';

export type TabParamList = {
  HomeTab: undefined;
  PurificationTab: undefined;
  InvocationsTab: undefined;
};

export type PresentationParamList = {
  Home: undefined;
  Center: undefined;
  Cheikh: undefined;
  Approach: undefined;
  Books: undefined;
};

export type PurificationParamList = {
  Home: undefined;
  BodyParts: undefined;
  BodyPartsRules: { part: BodyPartType; step: PurificationStage };
  Mind: undefined;
  Soul: undefined;
};

export type InvocationsParamList = {
  Invocations: undefined;
  Immunization: { period: ImmunizationPeriod };
  Jewels: undefined;
};

// Navigation props
export type PresentationStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PresentationParamList, 'Home'>,
  BottomTabNavigationProp<TabParamList>
>;

export type PurificationStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PurificationParamList, 'Home'>,
  BottomTabNavigationProp<TabParamList>
>;

// Route props
export type InvocationsScreenRouteProp = RouteProp<InvocationsParamList, 'Immunization'>;
