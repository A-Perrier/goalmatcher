import { editFromArray, removeFromArray } from "../../../helpers/functions"

const initialState = {
  projectId: null,
  project: {},
  isCreator: false
}

export const PROJECT_INITIALIZATION = 'PROJECT_INITIALIZATION'
export const SECTION_CREATE = 'SECTION_CREATE'
export const SECTION_EDIT = 'SECTION_EDIT'
export const SECTION_REMOVE = 'SECTION_REMOVE'
export const TASKLIST_CREATE = 'TASKLIST_CREATE'

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
      
      nextState = { ... state, project }

      return nextState || state
      break;



    case SECTION_EDIT:
      project = { ... state.project }
      sections = editFromArray(project.sections, action.value.updSection, action.value.oldSection)
      project.sections = sections

      nextState = { ... state, project }

      return nextState || state
      break;
    


    case SECTION_REMOVE:
      project = { ... state.project }
      sections = removeFromArray(project.sections, action.value)
      project.sections = sections
      
      nextState = { ... state, project }

      return nextState || state
      break;



    case TASKLIST_CREATE:
      // Copie du projet
      project = { ... state.project }
      // Index de la section dans laquelle ajouter la liste
      let index = project.sections.indexOf(action.value.section)

      let copiedSections = []
      project.sections.map(section => {
        // Slice de l'entité recherchée en cours (ici Tasklist) inutile
        section = {... section }
        copiedSections.push(section)
      })

      let sectionToPush = copiedSections[index]
      sectionToPush.tasklists.push(action.value.tasklist)
      project.sections = copiedSections
      
      nextState = { ... state, project }

      return nextState || state
      break;


    default:
      return state
      break;
  }

}