import { removeFromArray } from "../../../helpers/functions"

const initialState = {
  projectId: null,
  project: {},
  isCreator: false,
  refresh: 0
}

export const PROJECT_INITIALIZATION = 'PROJECT_INITIALIZATION'
export const SECTION_CREATE = 'SECTION_CREATE'
export const SECTION_REMOVE = 'SECTION_REMOVE'

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

  

    case SECTION_CREATE:
      // SE SOUVENIR DE CREER UNE COPIE POUR TOUTES LES SUBRESOURCES SINON CA NE RE-RENDER PAS MÊME SI LE STATE EST MIS A JOUR
      project = { ... state.project }
      let sections = project.sections.slice()
      sections.push(action.value)
      project.sections = sections
      
      nextState = {
        ... state,
        project
      }

      return nextState || state
      break;

    

    case SECTION_REMOVE:
      project = { ... state.project }
      sections = removeFromArray(project.sections, action.value)
      project.sections = sections
      
      nextState = {
        ... state,
        project
      }


      return nextState || state
    default:
      return state
      break;
  }

}