import React, {ReactElement} from 'react';

import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {User} from 'src/models';

import styles from './index.styles';

type LoginProps = {
  readonly onAction?: (user: User) => void;
  readonly onNavigation?: () => void;
  readonly mainBtnTitle?: string;
  readonly navBtnTitle?: string;
};

const Profile = ({
  onAction = undefined,
  onNavigation,
  mainBtnTitle,
  navBtnTitle,
}: LoginProps): ReactElement => {
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Email"
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Enter Password"
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={() => onAction?.({email, password})}>
          <Text style={styles.btnText}>{mainBtnTitle}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.regTextContainer} onPress={onNavigation}>
        <Text style={styles.regText}>{navBtnTitle}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export {Profile};
