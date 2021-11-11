import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CustomTextInput from '../../containers/customTextInput';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a191f',
        paddingTop: 50,
    },
    header: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 30
    },
    backBtn: {
        color: '#fff'
    }
})

const ForgetPassword = () => {
    const navigator = useNavigation();

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => {
                    // navigate to login page
                    navigator.goBack();
                }}>
                    <Text style={styles.backBtn}>Back</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.header}>Forgot password ?</Text>
            <CustomTextInput
                placeholder={'Email ...'}
                onchange={() => { }}
            />
        </View>
    )
}

export default ForgetPassword
