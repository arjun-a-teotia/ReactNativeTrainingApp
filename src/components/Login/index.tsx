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
    <SafeAreaView>
      <TextInput
        style={{fontSize: 42, color: 'steelblue'}}
        placeholder="Enter Username"
      />

      <TextInput
        style={{fontSize: 42, color: 'steelblue'}}
        placeholder="Enter Password"
      />
      <TouchableOpacity>
        <Text style={{fontSize: 42, color: 'steelblue'}}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export {Login};
