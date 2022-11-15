import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { User } from 'src/models';

type UserDetailParams = {
    readonly user: User;
};

type RootStackParamList = {
    readonly AuthorityDetail: UserDetailParams;
};

type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

type UserDetailRoute = RouteProp<RootStackParamList, 'UserDetail'>;

export type { RootStackParamList, RootStackNavigation, UserDetailRoute };
