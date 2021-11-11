import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import AuthContext from './authContext';

const AuthContextProvider = (props: any) => {

    const decodeToken = (token: string) => {
        // return decoded token
        console.log('Token is ', token)
    }

    const getToken = async () => {
        const token = await AsyncStorage.getItem('@token');
        console.log('Saved token is ', token)
        return token;
    }

    const getUserRole = () => {
        // return user roles
        console.log('roles is [\'user\']')
    }

    return (
        <AuthContext.Provider value={{
            decodeToken,
            getToken,
            getUserRole
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;