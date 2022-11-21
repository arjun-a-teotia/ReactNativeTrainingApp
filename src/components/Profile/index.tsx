import React from 'react';

import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';

import styles from './index.styles';

type ProfileProps = {
  readonly onLogout?: () => void;
  readonly heading?: string;
  readonly navBtnTitle?: string;
};

const Profile: React.FC<ProfileProps> = ({onLogout = undefined, heading}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{heading}</Text>
      {onLogout ? (
        <>
          <QRCode value="Thanks for logging in!" />
          <TouchableOpacity
            style={styles.logoutBtnContainer}
            onPress={onLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
    </SafeAreaView>
  );
};

export {Profile};
