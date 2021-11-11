import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../../i18n';
import { logoutSuccess } from '../../redux/reducers/userReducer';
import { IptvReducerState } from '../../redux/store';

const styles = StyleSheet.create({
    userSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    loginButton: {
        borderWidth: 1,
        borderColor: '#d32f2f',
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 25,
        backgroundColor: '#d32f2f',
    },
    loginText: {
        color: '#fff',
        marginVertical: 10,
        alignSelf: 'center'
    }
})

const Settings = () => {
    const user = useSelector((state: IptvReducerState) => state.userReducer.user);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const logout = () => {
        dispatch(logoutSuccess(null))
    }

    const handleChangeLanguage = async () => {
        const lang = await AsyncStorage.getItem('@language');
        changeLanguage(lang === 'en' ? 'ar' : 'en');
    }

    return (
        <View style={styles.userSection}>
            <View>
                <Text>{user.username}</Text>
            </View>
            <View>
                <Text>{user.email}</Text>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleChangeLanguage}>
                <Text style={styles.loginText}>{t('general.language')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={logout}>
                <Text style={styles.loginText}>{t('settings.logout')}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Settings
