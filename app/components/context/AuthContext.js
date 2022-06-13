import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import  {server_url} from '../server_info'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [user_ID, setUser_ID] = useState('');

    const register = async(user_name, user_email, user_password) => {
        setIsLoading(true);
        let response = await fetch(server_url + '/register', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: user_name,
              email: user_email,
              password: user_password
            })
        })
        let json = await response.json()
        Alert.alert('',json)
        setIsLoading(false);
    }

    const login = async(user_email, user_password) => {
        setIsLoading(true);
        let response = await fetch(server_url + '/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: user_email,
              password: user_password
            })
        })
        let res = await response.json()
        if (typeof res !== "object"){
            Alert.alert('', res);
        }
        else{
            setUserToken(res['token']);
            AsyncStorage.setItem('userToken', res['token']);
            setIsLoading(false);
        }
    }

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken')
        setIsLoading(false);
    }

    const isLoggedIn = async() => {
        try{
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            setIsLoading(false);
        }
        catch(e){
            console.log("error" + e);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{register, login, logout, isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    );
}