import api from "../utils/api";
import { CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESS, GET_TASK_FAILURE } from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showToast } from "../utils/customToast";


const initalState = {
    loading:false,
    tasks:[],
}

export default function (state = initalState, action) {
    const { type, payload } = action
    switch (type) {
        case CREATE_TASK_REQUEST:
            return {
                ...state,
                loading:true
            }
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                loading:false
            }
        case CREATE_TASK_FAILURE:
            return {
                ...state,
                loading:false
            }
        case GET_TASK_REQUEST:
            return {
                ...state,
                loading:true
            }
        case GET_TASK_SUCCESS:
            return {
                ...state,
                tasks:payload
            }
        case GET_TASK_FAILURE:
            return {
                ...state,
                tasks:[]
            }
        default:
            return state
    }
}