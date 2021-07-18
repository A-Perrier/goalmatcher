const initialState = {
  projectId: null,
  project: {}
}

export const PROJECT_INITIALIZATION = 'PROJECT_INITIALIZATION'

export function manageProject (state = initialState, action) {
  let nextState
  let project

  switch (action.type) {
    case PROJECT_INITIALIZATION:
      project = action.value
      nextState = {
        ... state,
        projectId: project.id,
        project
      }

      return nextState || state
      break;
  
    default:
      return state
      break;
  }

}