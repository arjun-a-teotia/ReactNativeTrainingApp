import React, {ReactElement} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigation} from '../../navigation';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import {Profile} from '../../components';

const ProfileScreen = (): ReactElement => {
  const navigation = useNavigation<RootStackNavigation>();

  const onLogout = async () => {
    await analytics().logEvent(
      'TrainingApp_Profile_logout_btn_click_' + Platform.OS,
    );
    auth()
      .signOut()
      .then(() => {
        /* istanbul ignore next */
        navigation.dispatch(StackActions.replace('LoginScreen'));
      });
  };

  return (
    <Profile
      heading={'Welcome' + auth().currentUser?.email}
      onLogout={onLogout}
      isProfileScreen={true}
    />
  );
};

export {ProfileScreen};
