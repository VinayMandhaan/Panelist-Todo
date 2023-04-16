import api from "../utils/api";
import {  SHARE_TASK_REQUEST, SHARE_TASK_FAILURE, SHARE_TASK_SUCCESS, GET_SHARED_REQUEST, GET_SHARED_SUCCESS, GET_SHARED_FAILURE, GET_USER_SHARED_REQUEST, GET_USER_SHARED_SUCCESS, GET_USER_SHARED_FAILURE } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showToast } from "../utils/customToast";


export const createShared = (data, bottomSheet) => async dispatch => {
    var userData = await AsyncStorage.getItem('token')
    try {
        dispatch({
            type: SHARE_TASK_REQUEST
        })
        await api({
            method: 'POST',
            url: '/shared',
            data: data,
            headers: {
                "x-auth-token": userData
            }
        }).then((res) => {
            dispatch({
                type: SHARE_TASK_SUCCESS,
                payload: res.data
            })
            dispatch(getMyShared())
            dispatch(getUserShared())
            bottomSheet.current.close()

        })
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors
        console.log(errors)
        if (errors) {
            errors.forEach(error => showToast('error', 'Post', error.msg))
        }
        dispatch({
            type: SHARE_TASK_FAILURE
        })
    }
}

export const getMyShared = () => async dispatch => {
    var userData = await AsyncStorage.getItem('token')
    try{
        dispatch({
            type: GET_SHARED_REQUEST,
        })
        await api({
            method: 'GET',
            url: '/shared/my',
            headers: {
                "x-auth-token":userData
            }
        }).then((res) => {
            dispatch({
                type: GET_SHARED_SUCCESS,
                payload: res.data?.sharedTask
            })
        })
    }catch(err) {
        console.log(err)
        const errors = err.response.data.errors
        console.log(errors)
        if (errors) {
            errors.forEach(error => showToast('error','Post',error.msg))
        }
        dispatch({
            type: GET_SHARED_FAILURE
        })
    }
}

export const getUserShared = () => async dispatch => {
    var userData = await AsyncStorage.getItem('token')
    try{
        dispatch({
            type: GET_USER_SHARED_REQUEST,
        })
        await api({
            method: 'GET',
            url: '/shared/user',
            headers: {
                "x-auth-token":userData
            }
        }).then((res) => {
            dispatch({
                type: GET_USER_SHARED_SUCCESS,
                payload: res.data?.sharedTask
            })
        })
    }catch(err) {
        console.log(err)
        const errors = err.response.data.errors
        console.log(errors)
        if (errors) {
            errors.forEach(error => showToast('error','Post',error.msg))
        }
        dispatch({
            type: GET_USER_SHARED_FAILURE
        })
    }
}