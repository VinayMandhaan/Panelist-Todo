import api from "../utils/api";
import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, LOGIN_REQUEST, GET_USERS_REQUEST, GET_USERS_SUCCESS } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showToast } from "../utils/customToast";



export const loadUser = () => async dispatch => {
    try {
        var userData = await AsyncStorage.getItem('token')
        await api({
            method: 'GET',
            url: '/auth',
            headers: {
                'x-auth-token': userData
            }
        }).then((res) => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => Toast.show({
                type: 'error',
                text1: 'Login',
                text2: `${error.msg}`
            }))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}


export const login = (email, password) => async dispatch => {
    try {
        dispatch({
            type: LOGIN_REQUEST,
        })
        await api({
            method: 'POST',
            url: '/auth/login',
            data: {
                email: email,
                password: password
            }
        }).then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            // registerForPushNotificationsAsync(res.data.token)
        })
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors
        console.log(errors)
        if (errors) {
            errors.forEach(error => showToast('error', 'Login', error.msg))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const register = (email, password, firstName, lastName, username) => async dispatch => {
    try {
        dispatch({
            type: REGISTER_REQUEST,
        })
        await api({
            method: 'POST',
            url: '/auth/register',
            data: {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                username: username
            }
        }).then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            // registerForPushNotificationsAsync(res.data.token)
        })
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => showToast('error', 'Register', error.msg))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}




export const logout = () => async dispatch => {
    try {
        dispatch({
            type: LOGOUT
        })
    } catch (err) {
        console.log(err)
    }
}

export const getUsers = () => async dispatch => {
    try {
        dispatch({
            type: GET_USERS_REQUEST
        })
        await api({
            method: 'GET',
            url: '/auth/users',
        }).then((res) => {
            dispatch({
                type: GET_USERS_SUCCESS,
                payload: res.data
            })
        })
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => Toast.show({
                type: 'error',
                text1: 'Login',
                text2: `${error.msg}`
            }))
        }
        dispatch({
            type: GET_USERS_FAILURE
        })
    }
}
