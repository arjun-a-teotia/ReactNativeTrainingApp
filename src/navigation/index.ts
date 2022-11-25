import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {User} from '../models';

type UserDetailParams = {
  readonly user: User;
};

type RootStackParamList = {
  readonly SplashScreen: undefined;
  readonly LoginScreen: undefined;
  readonly RegisterScreen: undefined;
  readonly ProfileScreen: undefined;
  readonly UserDetail: UserDetailParams;
};

type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

type UserDetailRoute = RouteProp<RootStackParamList, 'UserDetail'>;

export type {RootStackParamList, RootStackNavigation, UserDetailRoute};
