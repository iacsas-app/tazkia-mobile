import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type TabParamList = {
  Home: undefined;
  Purification: undefined;
  Sunnahs: undefined;
  Invocations: undefined;
};

export type PurificationParamList = {
  PurificationHome: undefined;
  BodyPartsStep: undefined;
  MindStep: undefined;
  SoulStep: undefined;
};

export type PresentationParamList = {
  Center: undefined;
  Cheikh: undefined;
  Manhaj: { name: string };
};

export type PresentationStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PresentationParamList, 'Center'>,
  BottomTabNavigationProp<TabParamList>
>;

export type TazkiaStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<PurificationParamList, 'PurificationHome'>,
  BottomTabNavigationProp<TabParamList>
>;
