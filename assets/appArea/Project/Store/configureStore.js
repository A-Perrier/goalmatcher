import { createStore } from 'redux'
import { manageProject } from '../Reducers/projectReducer'

export default createStore(manageProject)