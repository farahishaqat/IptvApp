import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../views/private/home';
import Login from '../views/public/login';
import Settings from '../views/private/settings';
import { createStackNavigator } from '@react-navigation/stack';
import ForgetPassword from '../views/public/forgetPassword';
import Register from '../views/public/register';
import PostDetails from '../views/private/postDetails';
import AddPost from '../views/private/addPost';
import UpdatePost from '../views/private/updatePost';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={'Home'}>
            <Stack.Screen
                name={'Home'}
                component={Home}
            />
            <Stack.Screen
                name={'PostDetails'}
                component={PostDetails}
            />
            <Stack.Screen
                name={'AddPost'}
                component={AddPost}
            />
            <Stack.Screen
                name={'UpdatePost'}
                component={UpdatePost}
            />
        </Stack.Navigator>
    )
}

export const PrivateNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeRoutes"
        >
            <Tab.Screen
                options={{
                    tabBarLabel: 'Home Screen',
                    title: 'Home page'
                }}
                name={'HomeRoutes'}
                component={HomeNavigator}
            ></Tab.Screen>
            <Tab.Screen
                name={'Settings'}
                component={Settings}
            ></Tab.Screen>
        </Tab.Navigator>
    );
}

const PublicNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={"Login"}
        >
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="ForgetPassword"
                component={ForgetPassword}
            />
            <Stack.Screen
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    )
}

export default PublicNavigator;