import api from "../utils/api";
import { CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESS, GET_TASK_FAILURE, SORT_TASK, DISPLAY_COMPLETED, DISPLAY_NOT_COMPLETED, DISPLAY_ALL, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE, GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, GET_PROJECT_FAILURE } from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showToast } from "../utils/customToast";


const initalState = {
    loading:false,
    projects:[],
    completeProjects:[]
}

export default function (state = initalState, action) {
    const { type, payload } = action
    switch (type) {
        case CREATE_PROJECT_REQUEST:
            return {
                ...state,
                loading:true
            }
        case CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                loading:false
            }
        case CREATE_PROJECT_FAILURE:
            return {
                ...state,
                loading:false
            }
        case GET_PROJECT_REQUEST:
            return {
                ...state,
                loading:true
            }
        case GET_PROJECT_SUCCESS:
            return {
                ...state,
                projects:payload,
                completeProjects:payload,
                loading:false
            }
        case GET_PROJECT_FAILURE:
            return {
                ...state,
                projects:[],
                loading:false
            }
        default:
            return state
    }
}