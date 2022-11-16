import React, {ReactElement, useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

import {ActivityIndicator, Alert, Text} from 'react-native';

import {Login} from '../../components';
import {User} from '../../models';
import {RootStackNavigation} from '../../navigation';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';


const RegisterScreen = (): ReactElement => {
  const [user, setUser] = useState<readonly User[]>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigation = useNavigation<RootStackNavigation>();

  useEffect(() => {}, []);

  const onRegisterPress = (user: User) => {
    auth()
      .createUserWithEmailAndPassword(user.email.toLowerCase(), user.password)
      .then(user => {
        console.log('User account created & signed in!', user.uid);
        analytics().logEvent('TrainingApp', {
          id: 3745092,
          item: 'New user created',
          description: JSON.stringify(user),
        })
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'ProfileScreen' }
            ],
          })
        );
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        } else if (error.code === 'auth/weak-password') {
          Alert.alert('Please try with strong password!');
        } else {
          Alert.alert('Could not register, please try again!');
        }
        console.log(error);
      });
  };

  const onLoginPress = () => {
    navigation.navigate('LoginScreen', null);
  };

  if (errorMessage) {
    return <Text>{errorMessage}</Text>;
  }

  if (user) {
    return <ActivityIndicator testID="activity-indicator" />;
  }

  return (
    <Login
      mainBtnTitle="Sign Up"
      navBtnTitle="Login"
      onNavigation={onLoginPress}
      onAction={onRegisterPress}
    />
  );
};

export {RegisterScreen};
