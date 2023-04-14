import api from "../utils/api";
import { CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESS, GET_TASK_FAILURE, SORT_TASK, DISPLAY_COMPLETED, DISPLAY_NOT_COMPLETED, DISPLAY_ALL } from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showToast } from "../utils/customToast";


const initalState = {
    loading:false,
    tasks:[],
    completeData:[]
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
                tasks:payload,
                completeData:payload,
                loading:false
            }
        case GET_TASK_FAILURE:
            return {
                ...state,
                tasks:[],
                loading:false
            }
        case SORT_TASK:
            const dateArray = [...payload]
            dateArray?.sort((a, b) => new Date(a?.dueDate) - new Date(b?.dueDate));
            return {
                ...state,
                tasks:dateArray,
                loading:false
            }
        case DISPLAY_COMPLETED:
            const completedArray = [...state.completeData]
            var checkRecords = completedArray?.filter(x => x?.status == true)
            return {
                ...state,
                tasks:checkRecords,
                loading:false
            }
        case DISPLAY_NOT_COMPLETED:
            const notCompletedArray = [...state.completeData]
            var checkRecords = notCompletedArray?.filter(x => x?.status == false)
            return {
                ...state,
                tasks:checkRecords,
                loading:false
            }
        case DISPLAY_ALL:
            return {
                ...state,
                tasks:state.completeData,
                loading:false
            }
        default:
            return state
    }
}