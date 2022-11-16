import React, {ReactElement} from 'react';

import {
  FlatList,
  ListRenderItem,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {User} from 'src/models';

import styles from './index.styles';

const Login = () => {
  return (
    <SafeAreaView
      style={{alignItems: 'center', justifyContent: 'center', paddingTop: 100, paddingHorizontal: 30}}>
      <TextInput
        style={{fontSize: 32}}
        placeholder="Enter Username"
      />

      <TextInput
        style={{fontSize: 32, marginTop: 20}}
        placeholder="Enter Password"
      />
      <TouchableOpacity>
        <Text style={{fontSize: 42, color: 'steelblue', marginTop: 50}}>
          Login
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export {Login};
