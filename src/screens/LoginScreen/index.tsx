import React, {ReactElement, useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

import {ActivityIndicator, Text} from 'react-native';

import {Login} from '../../components';
import {User} from '../../models';
import {RootStackNavigation} from '../../navigation';
import auth from '@react-native-firebase/auth';

const LoginScreen = (): ReactElement => {
  const [user, setUser] = useState<readonly User[]>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigation = useNavigation<RootStackNavigation>();

  useEffect(() => {
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe22@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }, []);

  const onLoginPress = (user: User) => {
    console.log('user', user);
  };

  if (errorMessage) {
    return <Text>{errorMessage}</Text>;
  }

  if (user) {
    return <ActivityIndicator testID="activity-indicator" />;
  }

  return <Login onLoginPress={onLoginPress} />;
};

export {LoginScreen};
