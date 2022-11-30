import React from 'react';

import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';

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
    <View style={isProfileScreen ? styles.container : styles.fullContainer}>
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
    </View>
  );
};

export {Profile};
