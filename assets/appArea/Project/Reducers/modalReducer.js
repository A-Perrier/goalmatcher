const initialState = { 
  isModalVisible: false,
  data: null,
  component: null
 }


export const MODAL_SHOW = 'MODAL_SHOW'
export const MODAL_CLOSE = 'MODAL_CLOSE'

// Modals are triggered in components/Project.js

export const manageModal = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_SHOW:
      return { 
        ... state,
        isModalVisible: true,
        data: action.value.data,
        component: action.value.component
      }
      break;

    case MODAL_CLOSE:
      return { 
        ... state,
        isModalVisible: false,
        content: null,
        component: null
      }
      break;

    default:
      return state
      break;
  }
}