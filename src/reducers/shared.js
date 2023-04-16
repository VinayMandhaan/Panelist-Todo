import { GET_SHARED_REQUEST, GET_SHARED_FAILURE, GET_SHARED_SUCCESS, GET_USER_SHARED_REQUEST, GET_USER_SHARED_SUCCESS, GET_USER_SHARED_FAILURE } from '../actions/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initalState = {
    loading: false,
    myShared: [],
    userShared: []
}

export default function (state = initalState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_SHARED_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_SHARED_SUCCESS:
            return {
                ...state,
                loading: false,
                myShared: payload
            }
        case GET_SHARED_FAILURE:
            return {
                ...state,
                loading: false,
                myShared: []
            }
        case GET_USER_SHARED_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_USER_SHARED_SUCCESS:
            return {
                ...state,
                loading: false,
                userShared: payload
            }
        case GET_USER_SHARED_FAILURE:
            return {
                ...state,
                loading: false,
                userShared: []
            }
        default:
            return state
    }
}