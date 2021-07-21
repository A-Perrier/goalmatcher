import { getModal } from "../../../helpers/functions"

const initialState = { isVisible: false }


export const MODAL_SHOW = 'MODAL_SHOW'
export const MODAL_CLOSE = 'MODAL_CLOSE'


export const manageModal = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_SHOW:
      getModal(action.value)
      return { 
        isVisible: true
      }

    case MODAL_CLOSE:
      return { 
        isVisible: false
      }

    default:
      return state
      break;
  }
}