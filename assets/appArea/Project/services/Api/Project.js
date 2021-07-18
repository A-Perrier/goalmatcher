import Axios from 'axios';
import { PROJECT_ENDPOINT } from '../../../../config'
import { debugDDResponse } from '../../../../helpers/Debug';
import { dangerToast } from '../../../../helpers/Toast';

const axios = Axios.create()
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export const find = async (id, name) => {
  return axios
    .get(`${PROJECT_ENDPOINT}/${id}`)
    .then(
      ({ data }) => {
        const project = JSON.parse(data)
        return project
      }
    )
}