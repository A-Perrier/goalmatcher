import Axios from 'axios';
import { PROJECT_ENDPOINT } from '../../../../config'
import { debugDDResponse } from '../../../../helpers/Debug';
import { removeLoader } from '../../../../helpers/functions';
import { dangerToast, successToast } from '../../../../helpers/Toast';

const axios = Axios.create()
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'


export const find = async (id) => {
  return axios
    .get(`${PROJECT_ENDPOINT}/${id}`)
    .then(
      ({ data }) => {
        const parsedData = JSON.parse(data)
        const project = JSON.parse(parsedData[0])
        const isCreator = parsedData[1]
       return { project, isCreator }
      }
    )
}


export const create = (data) => {
  return axios
    .post(PROJECT_ENDPOINT, data)
    .then(
      async ({ data }) => {
        const project = await data
        return project
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
    .put(`${PROJECT_ENDPOINT}/${id}`, data)
    .then(
      async ({ data }) => {
        const project = await data
        return project
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
    .delete(`${PROJECT_ENDPOINT}/${id}`)
    .then(
      async ({ status }) => {
        successToast("Le projet a correctement été supprimé")
        return status
      }
    )
    .catch(
      ( { response } ) => {
        const { data } = response
        dangerToast("Ressource non autorisée")
      }
    )
}