import api from "../utils/api";
import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE } from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showToast } from "../utils/customToast";

const initalState = {
    loading:false,
    users:[],
    shared:[]
}

export default function (state = initalState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_USERS_REQUEST:
            return {
                ...state,
                loading:true
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users:payload,
                loading:false
            }
        case GET_USERS_FAILURE:
            return {
                ...state,
                users:[],
                loading:false
            }
        default:
            return state
    }
}
