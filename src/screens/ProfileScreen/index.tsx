import React, {ReactElement} from 'react';

import {useNavigation} from '@react-navigation/native';

import {TouchableOpacity, SafeAreaView, Text, Platform} from 'react-native';

import {RootStackNavigation} from '../../navigation';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import QRCode from 'react-native-qrcode-svg';

const ProfileScreen = (): ReactElement => {
  const navigation = useNavigation<RootStackNavigation>();

  const onLogout = async () => {
    await analytics().logEvent(
      'TrainingApp_Profile_logout_btn_click_' + Platform.OS,
    );
    auth()
      .signOut()
      .then(() => navigation.dispatch(StackActions.replace('LoginScreen')));
  };

  return (
    <SafeAreaView
      style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text>Welcome {auth().currentUser?.displayName || 'User'}</Text>

      <QRCode value="Thanks for logging in!" />

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
