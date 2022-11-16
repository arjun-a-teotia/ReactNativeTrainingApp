import React, {ReactElement, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator, SafeAreaView, Text} from 'react-native';
import {RootStackNavigation} from '../../navigation';
import { StackActions } from '@react-navigation/native';


const SplashScreen = (): ReactElement => {
  const navigation = useNavigation<RootStackNavigation>();

  useEffect(() => {
    setTimeout(() => {
      if (auth().currentUser) {
        navigation.dispatch(
          StackActions.replace('ProfileScreen')
        );
      } else {
        navigation.dispatch(
          StackActions.replace('LoginScreen')
        );
      }
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text>Welcome to IW Training App</Text>
      <ActivityIndicator size={'large'} />
    </SafeAreaView>
  );
};

export {SplashScreen};
