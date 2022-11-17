import React, {ReactElement, useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

import {ActivityIndicator, Alert, Platform, Text} from 'react-native';

import {Login} from '../../components';
import {User} from '../../models';
import {RootStackNavigation} from '../../navigation';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';


const LoginScreen = (): ReactElement => {
  const [user, setUser] = useState<readonly User[]>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigation = useNavigation<RootStackNavigation>();

  useEffect(() => {}, []);

  const onRegisterPress = () => {
    navigation.navigate('RegisterScreen', {});
  };

  const onLoginPress = (user: User) => {
    auth()
      .signInWithEmailAndPassword(user.email?.toLowerCase(), user.password)
      .then(user => {
        console.log('User signed in!', user);
        analytics().logEvent('TrainingApp_Profile_login_by_' + Platform.OS);

        navigation.dispatch(StackActions.replace('ProfileScreen'));
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        } else {
          Alert.alert('Invalid credentials!');
        }
        console.log(error);
      });
  };

  if (errorMessage) {
    return <Text>{errorMessage}</Text>;
  }

  if (user) {
    return <ActivityIndicator testID="activity-indicator" />;
  }

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
