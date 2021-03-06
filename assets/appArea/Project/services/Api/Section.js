import Axios from 'axios';
import { SECTION_ENDPOINT } from '../../../../config'
import { debugDDResponse } from '../../../../helpers/Debug';
import { dangerToast, successToast } from '../../../../helpers/Toast';

const axios = Axios.create()
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'


export const create = (data) => {
  return axios
    .post(SECTION_ENDPOINT, data)
    .then(
      async ({ data }) => {
        const section = await data
        successToast("La section a correctement été créée !")
        return JSON.parse(section)
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
    .put(`${SECTION_ENDPOINT}/${id}`, data)
    .then(
      async (response) => {
        const section = await response.data
        successToast("La section a correctement été modifiée !")
        return { updSection: JSON.parse(section), status: response.status }
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
    .delete(`${SECTION_ENDPOINT}/${id}`)
    .then(
      async ({ status }) => {
        successToast("La section a correctement été supprimée !")
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