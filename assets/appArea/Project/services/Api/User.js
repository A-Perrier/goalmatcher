import Axios from 'axios';
import { USER_ENDPOINT } from '../../../../config'
import { debugDDResponse } from '../../../../helpers/Debug';
import { dangerToast, successToast } from '../../../../helpers/Toast';

export const findFilePath = async (id) => {
  return Axios
    .get(`${USER_ENDPOINT}/${id}?resource=filepath`)
    .then(
      ({ data }) => {
        return data
      }
    )
}

export const findAllByUsernamePattern = async (str) => {
  return Axios
    .get(`${USER_ENDPOINT}?pattern=${str}`)
    .then(
      ({ data }) => {
        return data
      }
    )
}