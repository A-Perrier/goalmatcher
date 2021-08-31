import Axios from 'axios';
import { SUBTASK_ENDPOINT } from '../../../../config'
import { debugDDResponse } from '../../../../helpers/Debug';
import { dangerToast, successToast } from '../../../../helpers/Toast';

const axios = Axios.create()
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'


export const create = (data) => {
  return axios
    .post(SUBTASK_ENDPOINT, data)
    .then(
      async (response) => {
        const subtask = await response.data
        successToast("L'objectif a correctement été créé !")
        return { subtask, status: response.status }
      }
    )
    .catch(
      ({ response }) => {
        const { data } = response
        for (const [errorField, message] of Object.entries(data)) {
          dangerToast(message)
        }
        return response.data
      }
    )
}



export const check = (data, id) => {
  return axios
    .put(`${SUBTASK_ENDPOINT}/${id}?property=check`, data)
    .then(
      async (response) => {
        const subtask = await response.data
        return { updSubtask: subtask, status: response.status }
      }
    )
    .catch(
      ({ response }) => {
        const { data } = response
        for (const [errorField, message] of Object.entries(data)) {
          dangerToast(message)
        }
        return response.data
      }
    )
}



export const edit = (data, id) => {
  return axios
    .put(`${SUBTASK_ENDPOINT}/${id}`, data)
    .then(
      async (response) => {
        debugDDResponse(response.data)
        const subtask = await response.data
        successToast("L'objectif a correctement été modifié !")
        return { updSubtask: subtask, status: response.status }
      }
    )
    .catch(
      ({ response }) => {
        const { data } = response
        for (const [errorField, message] of Object.entries(data)) {
          dangerToast(message)
        }
        return response.data
      }
    )
}



export const remove = (id) => {
  return axios
    .delete(`${SUBTASK_ENDPOINT}/${id}`)
    .then(
      async ({ status }) => {
        successToast("L'objectif a correctement été supprimé !")
        return status
      }
    )
    .catch(
      ({ response }) => {
        const { data } = response
        dangerToast("Ressource non autorisée")
      }
    )
}