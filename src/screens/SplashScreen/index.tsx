import React, {ReactElement, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {RootStackNavigation} from '../../navigation';
import {StackActions} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import {Profile} from '../../components';

const SplashScreen = (): ReactElement => {
  const navigation = useNavigation<RootStackNavigation>();

  useEffect(() => {
    logSplashScreen();
    setTimeout(() => {
      /* istanbul ignore next */
      if (auth().currentUser) {
        navigation.dispatch(StackActions.replace('ProfileScreen'));
      } else {
        navigation.dispatch(StackActions.replace('LoginScreen'));
      }
    }, 1000);
  }, [navigation]);
  const logSplashScreen = async () => {
    await analytics().logEvent('TrainingApp_Splash_by_');
  };

  return <Profile heading={'Welcome to IW Training App'} />;
};

export {SplashScreen};
