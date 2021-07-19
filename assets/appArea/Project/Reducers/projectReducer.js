const initialState = {
  projectId: null,
  project: {},
  isCreator: false
}

export const PROJECT_INITIALIZATION = 'PROJECT_INITIALIZATION'

export function manageProject (state = initialState, action) {
  let nextState
  let project
  let isCreator

  switch (action.type) {
    case PROJECT_INITIALIZATION:
      project = action.value.project
      isCreator = action.value.isCreator

      nextState = {
        ... state,
        projectId: project.id,
        project,
        isCreator
      }

      return nextState || state
      break;
  
    default:
      return state
      break;
  }

}