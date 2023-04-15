import api from "../utils/api";
import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showToast } from "../utils/customToast";


export const getUsers = () => async dispatch => {
    var userData = await AsyncStorage.getItem('token')
    try{
        dispatch({
            type: GET_USERS_REQUEST,
        })
        await api({
            method: 'GET',
            url: '/auth/users',
            headers: {
                "x-auth-token":userData
            }
        }).then((res) => {
            dispatch({
                type: GET_USERS_SUCCESS,
                payload: res.data
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
            type: GET_USERS_FAILURE
        })
    }
}