import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BodyPart, { BodyPartType } from '../domains/purification/BodyPart';
import { PurificationStage } from '../screens/purification/steps/bodyPartsStep/BodyPartsScreen';

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
  BodyPartsRules: { part: BodyPartType; step: PurificationStage };
  BodyPartProgress: { value: BodyPart };
  BodyPartEvaluation: { part: BodyPartType; step: PurificationStage };
  PurificationProgress: undefined;
  Mind: undefined;
  Soul: undefined;
};

export type SunnahsParamList = {
  Sunnahs: undefined;
  Habits: undefined;
  Worship: undefined;
  Truths: undefined;
  SunnahsProgress: undefined;
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

export type BodyPartEvaluationNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PurificationParamList, 'BodyPartEvaluation'>,
  BottomTabNavigationProp<TabParamList>
>;

export type SunnahsStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SunnahsParamList, 'Sunnahs'>,
  BottomTabNavigationProp<TabParamList>
>;

// Route props
export type BodyPartsRulesScreenRouteProp = RouteProp<PurificationParamList, 'BodyPartsRules'>;
export type BodyPartProgressScreenRouteProp = RouteProp<PurificationParamList, 'BodyPartProgress'>;
export type BodyPartEvaluationScreenRouteProp = RouteProp<PurificationParamList, 'BodyPartEvaluation'>;
