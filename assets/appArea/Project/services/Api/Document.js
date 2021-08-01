import Axios from 'axios';
import { DOCUMENT_ENDPOINT } from '../../../../config'
import { debugDDResponse } from '../../../../helpers/Debug';
import { dangerToast, successToast } from '../../../../helpers/Toast';

const axios = Axios.create()
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'



export const upload = (data, taskId) => {
  const formData = new FormData();
  formData.append("file", data);

  return axios
    .post(`${DOCUMENT_ENDPOINT}/${taskId}`, formData)
    .then(
      async ( response ) => {
        const document = await response.data
        successToast("Le document a correctement relié à votre tâche !")
        return { document, status: response.status }
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
    .delete(`${DOCUMENT_ENDPOINT}/${id}`)
    .then(
      async ({ status, data }) => {
        successToast("Le document a correctement été supprimé !")
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