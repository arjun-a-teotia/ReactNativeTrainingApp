import React, { ReactElement, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { ActivityIndicator, Text } from 'react-native';

import { Login } from '../../components';
import { User } from '../../models';
import { RootStackNavigation } from '../../navigation';

const LoginScreen = (): ReactElement => {
    const [user, setUser] = useState<readonly User[]>();
    const [errorMessage, setErrorMessage] = useState<string>();

    const navigation = useNavigation<RootStackNavigation>();

    const onLoginPress = (user: User) => {
        console.log("user", user);
    };

    if (errorMessage) {
        return <Text>{errorMessage}</Text>;
    }

    if (user) {
        return <ActivityIndicator testID="activity-indicator" />;
    }

    return <Login onLoginPress={onLoginPress} />;
};

export { LoginScreen };
