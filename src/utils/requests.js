import axios from "axios";
import { BASE_URL } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const marketOrder = async (url, data) => {

    try {
        const userId = await AsyncStorage.getItem("userId");

        const response = await axios.post(`${BASE_URL}${url}`, { ...data, userId });

        console.log('RESPONSE: ', response.data);

    } catch (error) {
        console.log(error);
    }
}

export const postData = async (url, data) => {

    try {
        const userId = await AsyncStorage.getItem("userId");

        const response = await axios.post(`${BASE_URL}${url}`, { ...data, userId });

        console.log('RESPONSE: ', response.data);

    } catch (error) {
        console.log(error.message);
    }
}

export const getWalletData = async (url) => {
    let data = null;
    try {
        const userId = await AsyncStorage.getItem("userId");

        const response = await axios.post(`${BASE_URL}${url}`, {
            userId: userId
        })

        console.log('RESPONSE wallet: ', response.data);
        data = response.data;

    } catch (error) {
        console.log(error);
    }
    return data;
}

export const getBuyAndSellData = async (url, ticker) => {
    let data = null;
    try {
        const userId = await AsyncStorage.getItem("userId");

        const response = await axios.post(`${BASE_URL}${url}`, {
            userId: userId,
            coinTicker: ticker
        })

        console.log('RESPONSE buysell: ', response.data);
        data = response.data;

    } catch (error) {
        console.log(error);
    }
    return data;
}

export const getTradeHistoryData = async (url) => {
    let data = null;
    try {
        const userId = await AsyncStorage.getItem("userId");

        const response = await axios.post(`${BASE_URL}${url}`, {
            userId: userId,
        })

        console.log('RESPONSE trade: ', response.data);
        data = response.data;


    } catch (error) {
        console.log(error);
    }
    return data;
}

export const getTrendingCoinsData = async (url) => {
    let data = null;

    try {
        const response = await axios.get(`${BASE_URL}${url}`)
        data = response.data;

    } catch (error) {
        console.log(error);
    }
    return data;
}
export const getOrderHistoryData = async (url) => {
    try {
        const userId = await AsyncStorage.getItem(`userId`);
        const response = await axios.post(`${BASE_URL}${url}`, {
            userId: userId
        })
        const data = response.data
        console.log('RESPONSE History Order', response.data);
        return data;
    } catch (e) {
        connsole.log(`testHistory: ${e}`)
    }
}
export const getActiveOrderHistoryData = async (url) => {
    try {
        const userId = await AsyncStorage.getItem(`userId`);
        const response = await axios.post(`http://192.168.1.76:8080/api/crypto/order/active`, {
            userId: userId
        })
        const data = response.data
        console.log('RESPONSE Active Order', response.data);
        return data;
    } catch (e) {
        connsole.log(e)
    }
}