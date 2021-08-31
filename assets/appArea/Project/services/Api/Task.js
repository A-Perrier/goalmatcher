import Axios from 'axios';
import { TASK_ENDPOINT } from '../../../../config'
import { debugDDResponse } from '../../../../helpers/Debug';
import { dangerToast, successToast } from '../../../../helpers/Toast';

const axios = Axios.create()
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'


export const create = (data) => {
  return axios
    .post(TASK_ENDPOINT, data)
    .then(
      async ({ data }) => {
        const task = await data
        successToast("La tâche a correctement été créée !")
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



export const edit = (data, id) => {
  return axios
    .put(`${TASK_ENDPOINT}/${id}`, data)
    .then(
      async (response) => {
        let task = await response.data
        task = JSON.parse(task)
        // task contient pour assignee {1:{id, pseudo,...}} au lieu de [0:{}], je n'ai pas trouvé pourquoi ça ne parse pas
        // comme pour le project, obligé de passer par cette ligne pour que le reste de l'app se mette à jour correctement
        task.assignee = Object.values(task.assignee)
        successToast("La tâche a correctement été modifiée !")
        return { updTask: task, status: response.status }
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
    .delete(`${TASK_ENDPOINT}/${id}`)
    .then(
      async ({ status }) => {
        successToast("La tâche a correctement été supprimée !")
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