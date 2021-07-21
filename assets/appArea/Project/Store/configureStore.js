import { createStore, combineReducers } from 'redux'
import { manageProject } from '../Reducers/projectReducer'
import { manageModal } from '../Reducers/modalReducer'

export default createStore(
  combineReducers(
    {
      manageProject, 
      manageModal
    }
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)