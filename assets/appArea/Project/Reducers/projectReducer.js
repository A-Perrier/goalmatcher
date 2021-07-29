import { editFromArray, removeFromArray } from "../../../helpers/functions"

const initialState = {
  projectId: null,
  project: {},
  isCreator: false,
  contributors: [],
  itemTransported: {}
}

export const PROJECT_INITIALIZATION = 'PROJECT_INITIALIZATION'
export const SECTION_CREATE = 'SECTION_CREATE'
export const SECTION_EDIT = 'SECTION_EDIT'
export const SECTION_REMOVE = 'SECTION_REMOVE'
export const TASKLIST_CREATE = 'TASKLIST_CREATE'
export const TASKLIST_EDIT = 'TASKLIST_EDIT'
export const TASKLIST_REMOVE = 'TASKLIST_REMOVE'

export const TRANSPORT_DATA = 'TRANSPORT_DATA'

export function manageProject (state = initialState, action) {
  let nextState
  let project
  let isCreator
  let contributors

  switch (action.type) {
    case PROJECT_INITIALIZATION:
      project = action.value.project
      isCreator = action.value.isCreator
      contributors = [project.creator, ... project.contributors]

      nextState = {
        ... state,
        projectId: project.id,
        project,
        isCreator,
        contributors
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
        section = { ... section }
        copiedSections.push(section)
      })

      let sectionToPush = copiedSections[index]
      sectionToPush.tasklists.push(action.value.tasklist)
      project.sections = copiedSections
      
      nextState = { ... state, project }

      return nextState || state
      break;



    case TASKLIST_EDIT:
      project = { ... state.project }
      index = project.sections.indexOf(action.value.section)
      
      copiedSections = []
      project.sections.map(section => {
        section = { ... section }
        copiedSections.push(section)
      })

      let sectionToUpdate = copiedSections[index]
      let tasklists = editFromArray(sectionToUpdate.tasklists, action.value.updTasklist, action.value.oldTasklist)
      sectionToUpdate.tasklists = tasklists

      project.sections = copiedSections

      nextState = { ... state, project }

      return nextState || state
      break;




    case TASKLIST_REMOVE:
      project = { ... state.project }
      index = project.sections.indexOf(action.value.section)
      
      copiedSections = []
      project.sections.map(section => {
        section = { ... section }
        copiedSections.push(section)
      })

      sectionToUpdate = copiedSections[index]
      tasklists = removeFromArray(sectionToUpdate.tasklists, action.value.tasklist)
      sectionToUpdate.tasklists = tasklists

      project.sections = copiedSections

      nextState = { ... state, project }

      return nextState || state
      break;



    case TRANSPORT_DATA:
      return { ... state, 
        itemTransported: { 
          type: action.value.type, 
          data: action.value.data 
        }} || state
      break;



    default:
      return state
      break;
  }

}

