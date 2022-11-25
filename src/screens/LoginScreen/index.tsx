import React, {ReactElement} from 'react';

import {useNavigation} from '@react-navigation/native';

import {Alert, Platform} from 'react-native';

import {Login} from '../../components';
import {User} from '../../models';
import {RootStackNavigation} from '../../navigation';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

const LoginScreen = (): ReactElement => {
  const navigation = useNavigation<RootStackNavigation>();
  const onRegisterPress = () => {
    navigation.navigate('RegisterScreen');
  };

  const onLoginPress = (user: User) => {
    auth()
      .signInWithEmailAndPassword(user.email?.toLowerCase(), user.password)
      .then(() => {
        analytics().logEvent('TrainingApp_Profile_login_by_' + Platform.OS);
        navigation.dispatch(StackActions.replace('ProfileScreen'));
      })
      .catch(() => {
        /* istanbul ignore next */
        Alert.alert('Invalid credentials!');
      });
  };

  return (
    <Login
      mainBtnTitle="Login"
      navBtnTitle="Register"
      onAction={onLoginPress}
      onNavigation={onRegisterPress}
    />
  );
};

export {LoginScreen};
