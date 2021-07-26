import Axios from 'axios';
import { USER_ENDPOINT } from '../../../../config'
import { debugDDResponse } from '../../../../helpers/Debug';
import { dangerToast, successToast } from '../../../../helpers/Toast';

export const findFilePath = async (id) => {
  return Axios
    .get(`${USER_ENDPOINT}/${id}?resource=filepath`)
    .then(
      ({ data }) => {
        if (typeof data === 'string') return data
        const parsedData = JSON.parse(data)
        const project = JSON.parse(parsedData[0])
        const isCreator = parsedData[1]
        return parsedData
      }
    )
}