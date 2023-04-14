import { combineReducers } from 'redux'
import auth from './auth'
import task from './task'
import project from './project'

export default combineReducers({
    auth,
    task,
    project
})