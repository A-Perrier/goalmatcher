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
      async ({ data }) => {
        debugDDResponse(data)
        const task = await data
        successToast("Le document a correctement relié à votre tâche !")
        return JSON.parse(task)
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