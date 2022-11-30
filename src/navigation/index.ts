import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Pokemon, User} from '../models';

type UserDetailParams = {
  readonly user: User;
};
type PokemonDetailScreenParams = {
  readonly pokemon: Pokemon;
};

type RootStackParamList = {
  readonly SplashScreen: undefined;
  readonly LoginScreen: undefined;
  readonly RegisterScreen: undefined;
  readonly ProfileScreen: undefined;
  readonly UserDetail: UserDetailParams;
  readonly PokemonDetailScreen: PokemonDetailScreenParams;
};

type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

type UserDetailRoute = RouteProp<RootStackParamList, 'UserDetail'>;
type PokemonDetailRoute = RouteProp<RootStackParamList, 'PokemonDetailScreen'>;

export type {
  RootStackParamList,
  RootStackNavigation,
  UserDetailRoute,
  PokemonDetailRoute,
};
