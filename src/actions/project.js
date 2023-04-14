import api from "../utils/api";
import {  UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILURE, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE, CREATE_PROJECT_REQUEST, CREATE_PROJECT_FAILURE, GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, GET_PROJECT_FAILURE, CREATE_PROJECT_SUCCESS } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showToast } from "../utils/customToast";

export const createProject = (data) => async dispatch => {
    var userData = await AsyncStorage.getItem('token')
    try {
        dispatch({
            type: CREATE_PROJECT_REQUEST
        })
        await api({
            method: 'POST',
            url: '/project',
            data: data,
            headers: {
                "x-auth-token": userData
            }
        }).then((res) => {
            dispatch(getProject())
            dispatch({
                type: CREATE_PROJECT_SUCCESS,
                payload: res.data
            })

        })
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors
        console.log(errors)
        if (errors) {
            errors.forEach(error => showToast('error', 'Post', error.msg))
        }
        dispatch({
            type: CREATE_PROJECT_FAILURE
        })
    }
}

export const getProject = () => async dispatch => {
    var userData = await AsyncStorage.getItem('token')
    try{
        dispatch({
            type: GET_PROJECT_REQUEST,
        })
        await api({
            method: 'GET',
            url: '/project/user',
            headers: {
                "x-auth-token":userData
            }
        }).then((res) => {
            dispatch({
                type: GET_PROJECT_SUCCESS,
                payload: res.data?.project
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
            type: GET_PROJECT_FAILURE
        })
    }
}

export const updateTask = (taskId) => async dispatch => {
    var userData = await AsyncStorage.getItem('token')
    try {
        dispatch({
            type: UPDATE_TASK_REQUEST
        })
        await api({
            method: 'POST',
            url: `/task/update/${taskId}`,
            data: {
                status:true
            },
            headers: {
                "x-auth-token": userData
            }
        }).then((res) => {
            console.log(res.data,'YPDATE')
            dispatch(getTasks())
            dispatch({
                type: UPDATE_TASK_SUCCESS,
                payload: res.data
            })

        })
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors
        console.log(errors)
        if (errors) {
            errors.forEach(error => showToast('error', 'Post', error.msg))
        }
        dispatch({
            type: UPDATE_TASK_FAILURE
        })
    }
}


export const deleteTask = (taskId) => async dispatch => {
    var userData = await AsyncStorage.getItem('token')
    try {
        dispatch({
            type: DELETE_TASK_REQUEST
        })
        await api({
            method: 'DELETE',
            url: `/task/${taskId}`,
            headers: {
                "x-auth-token": userData
            }
        }).then((res) => {
            dispatch(getTasks())
            dispatch({
                type: DELETE_TASK_SUCCESS,
                payload: res.data
            })

        })
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors
        console.log(errors)
        if (errors) {
            errors.forEach(error => showToast('error', 'Post', error.msg))
        }
        dispatch({
            type: DELETE_TASK_FAILURE
        })
    }
}