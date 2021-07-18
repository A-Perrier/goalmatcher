import { createStore } from 'redux'
import { manageProject } from '../Reducers/projectReducer'

export default createStore(
  manageProject,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)