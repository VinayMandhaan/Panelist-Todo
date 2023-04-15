import { combineReducers } from 'redux'
import auth from './auth'
import task from './task'
import project from './project'
import users from './users'

export default combineReducers({
    auth,
    task,
    project,
    users
})