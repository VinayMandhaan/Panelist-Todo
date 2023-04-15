import api from "../utils/api";
import { CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESS, GET_TASK_FAILURE, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILURE, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showToast } from "../utils/customToast";
import * as Notifications from 'expo-notifications';


export const createTask = (data) => async dispatch => {
    var userData = await AsyncStorage.getItem('token')
    try {
        dispatch({
            type: CREATE_TASK_REQUEST
        })
        await api({
            method: 'POST',
            url: '/task',
            data: data,
            headers: {
                "x-auth-token": userData
            }
        }).then((res) => {
            dispatch(getTasks())
            dispatch({
                type: CREATE_TASK_SUCCESS,
                payload: res.data
            })        
            scheduleNotificationAsync(data?.dueDate)   
        })
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors
        console.log(errors)
        if (errors) {
            errors.forEach(error => showToast('error', 'Post', error.msg))
        }
        dispatch({
            type: CREATE_TASK_FAILURE
        })
    }
}

export const getTasks = () => async dispatch => {
    var userData = await AsyncStorage.getItem('token')
    try{
        dispatch({
            type: GET_TASK_REQUEST,
        })
        await api({
            method: 'GET',
            url: '/task/user',
            headers: {
                "x-auth-token":userData
            }
        }).then((res) => {
            dispatch({
                type: GET_TASK_SUCCESS,
                payload: res.data?.task
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
            type: GET_TASK_FAILURE
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

async function scheduleNotificationAsync(value) {
    const dueDate = new Date(value);
    const minutesBefore = 60;
    const trigger = new Date(dueDate.getTime() - minutesBefore * 60 * 1000);
    const content = {
      title: 'Reminder',
      body: 'Your deadline is approaching. Complete your task before the due date.',
      sound: true,
    };
    await Notifications.scheduleNotificationAsync({ content, trigger });
}   