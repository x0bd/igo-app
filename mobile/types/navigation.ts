/**
 * Navigation types for Expo Router
 */

import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  '(tabs)': NavigatorScreenParams<TabParamList>;
};

export type TabParamList = {
  index: undefined;
  scan: undefined;
  stats: undefined;
  profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

