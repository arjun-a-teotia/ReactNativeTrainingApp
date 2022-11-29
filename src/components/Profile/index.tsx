import React from 'react';

import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from './index.styles';

type ProfileProps = {
  readonly onLogout?: () => void;
  readonly heading?: string;
  readonly navBtnTitle?: string;
  readonly isProfileScreen?: boolean;
};

const Profile: React.FC<ProfileProps> = ({
  onLogout = undefined,
  heading,
  isProfileScreen = false,
}) => {
  return (
    <SafeAreaView style={isProfileScreen ? styles.container: styles.fullContainer}>
      <Text>{heading}</Text>
      {isProfileScreen ? (
        <>
          <TouchableOpacity
            testID="logout"
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
