import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
  Mind: undefined;
  Soul: undefined;
};

export type SunnahsParamList = {
  Sunnahs: undefined;
  Habits: undefined;
  Practice: undefined;
  SpiritTravels: undefined;
};

export type PresentationStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PresentationParamList, 'Presentation'>,
  BottomTabNavigationProp<TabParamList>
>;

export type PurificationStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PurificationParamList, 'Purification'>,
  BottomTabNavigationProp<TabParamList>
>;

export type SunnahsStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SunnahsParamList, 'Sunnahs'>,
  BottomTabNavigationProp<TabParamList>
>;
