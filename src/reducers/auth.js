import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT, REGISTER_REQUEST, LOGIN_REQUEST, GET_USERS_REQUEST, GET_USERS_FAILURE, GET_USERS_SUCCESS } from '../actions/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initalState = {
    token: AsyncStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null,
    register: false,
    users: [],
    userLoading: false,
}

export default function (state = initalState, action) {
    const { type, payload } = action
    switch (type) {
        case USER_LOADED:
            AsyncStorage.setItem('user', JSON.stringify(payload))
            return {
                ...state,
                ...payload,
                loading: false,
                isAuthenticated: true,
                user: payload,
                followers: payload.followers,
                following: payload.following
            }
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            AsyncStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT:
            AsyncStorage.removeItem('token')
            AsyncStorage.removeItem('user')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                loading: false,
                register: false
            }
        case GET_USERS_REQUEST:
            return {
                ...state,
                userLoading: true
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                userLoading: false,
                users: payload
            }
        case GET_USERS_FAILURE:
            return {
                ...state,
                userLoading: false,
                users: []
            }
        default:
            return state
    }
}