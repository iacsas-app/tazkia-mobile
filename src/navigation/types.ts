import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type TabParamList = {
  Home: undefined;
  Tazkia: undefined;
  Sunan: undefined;
  Dikr: undefined;
};

export type TazkiaParamList = {
  TazkiaHome: undefined;
  Part1: undefined;
  Part2: undefined;
  Part3: undefined;
};

export type TazkiaStackNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<TazkiaParamList, 'TazkiaHome'>,
  BottomTabNavigationProp<TabParamList>
>;
