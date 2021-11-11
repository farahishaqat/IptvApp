import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomTextInput from '../../containers/customTextInput';

const Register = ({ route }: any) => {
    console.log(route)
    const navigator = useNavigation<any>();
    return (
        <>
            <Text>Register page</Text>

            <CustomTextInput
                placeholder={route.params.email}
                onchange={() => { }}
            />
            <CustomTextInput
                placeholder={'First Name ..'}
                onchange={() => { }}
            />
            <CustomTextInput
                placeholder={'Last Name ..'}
                onchange={() => { }}
            />

            <TouchableOpacity onPress={() => {
                navigator.navigate('Login')
            }}>
                <Text>Login</Text>
            </TouchableOpacity>
        </>
    )
}

export default Register
