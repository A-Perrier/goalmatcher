const urlParameters = window.location.pathname
const urlParts = urlParameters.split('/')
export const location = { 'section' : urlParts[1], 'slug': urlParts[2], 'id': urlParts[3] }

/**
 * @param {String} status 
 */
export function getTranslatedStatus(status) {
  return (
    status === 'ongoing' ? 'En cours' :
    status === 'abandoned' ? 'Abandonné' :
    status === 'completed' ?? 'Terminé'
  ) 
}


export function dateTimeToString(datetime) {
  if (datetime === null) return 'Inconnue'

  const date = new Date(datetime)
  const day = ('0' + date.getDate()).slice(-2)
  const month = ('0' + (date.getMonth()+1)).slice(-2)
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}


/**
 * Clones an array, remove the chosen element then returns the copy without it
 */
export function removeFromArray(array, item) {
  const copy = array.slice()
  const index = copy.indexOf(item)
  index !== -1 && copy.splice(index, 1)
  return copy
}



/**
 * Clones an array, edit the chosen element then returns the copy modified
 */
export function editFromArray(array, itemUpdated, itemToUpdate) {
  const copy = array.slice()
  const index = copy.indexOf(itemToUpdate)
  index !== -1 && copy.splice(index, 1, itemUpdated)
  console.log(copy)
  return copy
}