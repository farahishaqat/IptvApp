import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PublicNavigator, { PrivateNavigation } from './navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { IptvReducerState } from './redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from './redux/reducers/userReducer';
import ThemeContext from './context/themeContext';
import AuthContextProvider from './context/authContext/authContextProvider';
import SplashScreen from 'react-native-splash-screen';

const themesStyle = {
    light: {
        backgroundColor: '#ffffff'
    },
    black: {
        backgroundColor: '#101010'
    }
}

const Layout = () => {
    const user = useSelector((state: IptvReducerState) => state.userReducer.user);
    const disptach = useDispatch();

    useEffect(() => {
        (async () => {
            await checkAuthState();
        })()
    }, [])

    const checkAuthState = async () => {
        const token = await AsyncStorage.getItem('@token');
        if (token) {
            // update user
            console.log('Updating user with dispatch')
            disptach(loginSuccess({
                email: 'demo@demo.com',
                username: 'demoUser'
            }));
            // user = decoded token
        }
        SplashScreen.hide();
    }

    return (
        <NavigationContainer>

            <ThemeContext.Provider value={themesStyle.light}>
                <AuthContextProvider>
                    {
                        user && user.email ?
                            <PrivateNavigation />
                            :
                            <PublicNavigator />
                    }

                </AuthContextProvider>
            </ThemeContext.Provider>
        </NavigationContainer>
    );
}

export default Layout;