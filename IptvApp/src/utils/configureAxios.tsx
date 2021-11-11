import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { configure } from 'axios-hooks';
import AppJson from '../../app.json';

export const ConfigureAxios = () => {
    console.log('applied for update')
    try {
        const axios = Axios.create({
            baseURL: AppJson.baseUrl
        });

        axios.interceptors.request.use(async (config) => {
            // UPDATE config => Add token if exists
            config.headers = await getHeaders(config.headers);
            return config;
        })

        axios.interceptors.response.use((res) => {
            if (res.data) {
                // const customResponseBody = {
                //     items: res.data,
                //     status: res.status,
                //     extra: res.statusText
                // }
                // res.data = customResponseBody;
            }
            return res;
        }, async (error) => {
            // error status 401, 400, 500 etc...
            if (error && error.response.status === 401) {
                await AsyncStorage.removeItem('@token');
            }

            return Promise.reject(error);
        })

        const getHeaders = async (reqHeaders: any = {}) => {
            const token = await AsyncStorage.getItem('@token');
            let headers: any = {
                ...reqHeaders
            }

            if (token) {
                headers["Authorization"] = `bearer ${token}`;
            }

            return headers;
        }

        configure({
            axios: axios
        });
    } catch (err) {
        console.warn('error ', err)
    }
}