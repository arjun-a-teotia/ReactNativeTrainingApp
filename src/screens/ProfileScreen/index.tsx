import React, {ReactElement, useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';

import {TouchableOpacity, SafeAreaView, Text} from 'react-native';

import {User} from '../../models';
import {RootStackNavigation} from '../../navigation';
import auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

const ProfileScreen = (): ReactElement => {
  const [user, setUser] = useState<readonly User[]>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigation = useNavigation<RootStackNavigation>();

  useEffect(() => {}, []);

  const onLogout = async() => {
    analytics().setAnalyticsCollectionEnabled(true);
    const a = await analytics().logEvent(`Page_1`, {})
    console.log("arjun", a);
    return
    auth()
      .signOut()
      .then(() => 
      navigation.dispatch(
        StackActions.replace('LoginScreen')
      ));
  };

  return (
    <SafeAreaView
      style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text>Welcome {auth().currentUser?.displayName || 'User'}</Text>

      <TouchableOpacity
        style={{
          alignItems: 'flex-end',
        }}
        onPress={onLogout}>
        <Text
          style={{
            fontSize: 18,
            marginTop: 150,
            color: 'steelblue',
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export {ProfileScreen};
