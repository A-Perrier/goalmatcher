import Axios from 'axios';
import { TASKLIST_ENDPOINT } from '../../../../config'
import { debugDDResponse } from '../../../../helpers/Debug';
import { dangerToast, successToast } from '../../../../helpers/Toast';

const axios = Axios.create()
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'


export const create = (data) => {
  return axios
    .post(TASKLIST_ENDPOINT, data)
    .then(
      async ({ data }) => {
        const tasklist = await data
        successToast("La liste a correctement été créée !")
        return JSON.parse(tasklist)
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
    .put(`${TASKLIST_ENDPOINT}/${id}`, data)
    .then(
      async (response) => {
        const tasklist = await response.data
        successToast("La liste a correctement été modifiée !")
        return { updTasklist: JSON.parse(tasklist), status: response.status }
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
    .delete(`${TASKLIST_ENDPOINT}/${id}`)
    .then(
      async ({ status }) => {
        successToast("La liste a correctement été supprimée !")
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